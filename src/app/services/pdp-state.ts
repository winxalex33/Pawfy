import { Injectable, computed, signal } from '@angular/core';
import {
  AnalyticsEvent,
  PlanOption,
  PRODUCT_CONFIG,
  SplitTestStats,
  VariantType,
} from '../models/pdp.model';

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

const defaultStats: SplitTestStats = {
  control: {
    impressions: 1240,
    planClicks: 520,
    atcClicks: 88,
    conversions: 42,
    revenue: 2872.8,
  },
  challenger: {
    impressions: 1265,
    planClicks: 782,
    atcClicks: 174,
    conversions: 89,
    revenue: 6087.6,
  },
};

@Injectable({
  providedIn: 'root',
})
export class PdpState {
  readonly activeVariant = signal<VariantType>('challenger');
  readonly selectedPlan = signal<PlanOption>(PRODUCT_CONFIG.plans[0]);
  readonly isSubscription = signal<boolean>(true);
  readonly activeGallerySlide = signal<number>(0);

  // Modals state
  readonly isPayloadModalOpen = signal<boolean>(false);
  readonly isAnalyticsOpen = signal<boolean>(false);
  readonly isPerformanceReportOpen = signal<boolean>(false);
  readonly isDevToolbarOpen = signal<boolean>(false);
  readonly showFeedingModal = signal<boolean>(false);

  // Split-testing & Stats
  readonly splitRatio = signal<number>(50); // % allocated to challenger
  readonly splitStats = signal<SplitTestStats>(defaultStats);

  // Analytics event stream
  readonly analyticsLogs = signal<AnalyticsEvent[]>([]);

  // Dosage Calculator state
  readonly dogWeightLbs = signal<number>(25);

  readonly dosageInfo = computed(() => {
    const weight = this.dogWeightLbs();
    if (weight <= 30) {
      return {
        chewsPerDay: 1,
        rangeText: 'Up to 30 lbs (Small Dogs)',
        threeTubDuration: '90 days (Full 3 Months)',
        dailyCost: '$0.76/day',
        sampleBreeds: 'French Bulldog, Beagle, Dachshund, Pug',
      };
    } else if (weight <= 60) {
      return {
        chewsPerDay: 2,
        rangeText: '31 – 60 lbs (Medium Dogs)',
        threeTubDuration: '45 days (6+ Weeks)',
        dailyCost: '$1.52/day',
        sampleBreeds: 'Australian Shepherd, Border Collie, Bulldog',
      };
    } else if (weight <= 90) {
      return {
        chewsPerDay: 3,
        rangeText: '61 – 90 lbs (Large Dogs)',
        threeTubDuration: '30 days (1 Month)',
        dailyCost: '$2.28/day',
        sampleBreeds: 'Golden Retriever, German Shepherd, Labrador',
      };
    } else {
      return {
        chewsPerDay: 4,
        rangeText: '91+ lbs (Giant Breeds)',
        threeTubDuration: '22 days',
        dailyCost: '$3.04/day',
        sampleBreeds: 'Great Dane, Mastiff, Newfoundland, Bernese',
      };
    }
  });

  constructor() {
    if (typeof window !== 'undefined') {
      // Check query param override
      const params = new URLSearchParams(window.location.search);
      const urlVariant = params.get('variant') as VariantType | null;
      if (urlVariant === 'challenger' || urlVariant === 'control') {
        this.activeVariant.set(urlVariant);
      }

      // Initial page view event
      this.trackEvent('page_view', {
        variant: this.activeVariant(),
        product: 'metabolic-complex',
        url: window.location.href,
      });

      this.recordImpression();
    }
  }

  setVariant(v: VariantType) {
    this.activeVariant.set(v);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('variant', v);
      window.history.replaceState({}, '', url.toString());
    }
    this.trackEvent('variant_switched_manually', { variant: v });
  }

  setSplitRatio(val: number) {
    this.splitRatio.set(val);
    this.trackEvent('split_ratio_updated', { ratio: val });
  }

  selectPlan(plan: PlanOption) {
    this.selectedPlan.set(plan);
    this.trackEvent('select_plan', {
      plan_id: plan.id,
      quantity: plan.quantity,
      price: plan.discountedPrice,
      savings: plan.dollarSavings,
    });
    const current = this.activeVariant();
    this.splitStats.update((prev) => ({
      ...prev,
      [current]: {
        ...prev[current],
        planClicks: prev[current].planClicks + 1,
      },
    }));
  }

  setGallerySlide(idx: number) {
    this.activeGallerySlide.set(idx);
    this.trackEvent('gallery_interaction', { slide_index: idx });
  }

  setDogWeight(weight: number) {
    this.dogWeightLbs.set(weight);
    this.trackEvent('dosage_calculator_used', { dog_weight_lbs: weight });
  }

  addToCart(overridePlan?: PlanOption) {
    const target = overridePlan || this.selectedPlan();
    this.selectedPlan.set(target);
    this.isPayloadModalOpen.set(true);

    const variant = this.activeVariant();
    this.trackEvent('add_to_cart', {
      plan_id: target.id,
      quantity: target.quantity,
      price: target.discountedPrice,
      variant,
      free_gift: target.freeGift,
    });

    this.splitStats.update((prev) => ({
      ...prev,
      [variant]: {
        ...prev[variant],
        atcClicks: prev[variant].atcClicks + 1,
      },
    }));
  }

  recordImpression() {
    const variant = this.activeVariant();
    this.splitStats.update((prev) => ({
      ...prev,
      [variant]: {
        ...prev[variant],
        impressions: prev[variant].impressions + 1,
      },
    }));
  }

  recordConversion(amount: number) {
    const variant = this.activeVariant();
    this.splitStats.update((prev) => ({
      ...prev,
      [variant]: {
        ...prev[variant],
        conversions: prev[variant].conversions + 1,
        revenue: Math.round((prev[variant].revenue + amount) * 100) / 100,
      },
    }));
  }

  trackEvent(eventName: string, properties: Record<string, unknown> = {}) {
    if (typeof window === 'undefined') return;

    if (!window.dataLayer) {
      window.dataLayer = [];
    }

    const eventObj: AnalyticsEvent = {
      id: 'evt_' + Math.random().toString(36).substring(2, 9),
      timestamp: new Date().toISOString(),
      event: eventName,
      properties: {
        ...properties,
        url: window.location.href,
        variant: this.activeVariant(),
        screen_width: window.innerWidth,
      },
    };

    window.dataLayer.push({
      event: eventObj.event,
      ...eventObj.properties,
    });

    this.analyticsLogs.update((logs) => [eventObj, ...logs].slice(0, 100));
  }

  clearAnalytics() {
    this.analyticsLogs.set([]);
  }
}
