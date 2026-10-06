import { Injectable, computed, signal } from '@angular/core';
import {
  AnalyticsEvent,
  PlanOption,
  PRODUCT_CONFIG,
} from '../models/pdp.model';

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

@Injectable({
  providedIn: 'root',
})
export class PdpState {
  readonly selectedPlan = signal<PlanOption>(PRODUCT_CONFIG.plans[0]);
  readonly isSubscription = signal<boolean>(true);
  readonly activeGallerySlide = signal<number>(0);

  // Modals state
  readonly isPayloadModalOpen = signal<boolean>(false);
  readonly isAnalyticsOpen = signal<boolean>(false);
  readonly isPerformanceReportOpen = signal<boolean>(false);
  readonly showFeedingModal = signal<boolean>(false);

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
      // Initial page view event
      this.trackEvent('page_view', {
        product: 'metabolic-complex',
        url: window.location.href,
      });
    }
  }

  selectPlan(plan: PlanOption) {
    this.selectedPlan.set(plan);
    this.trackEvent('select_plan', {
      plan_id: plan.id,
      quantity: plan.quantity,
      price: plan.discountedPrice,
      savings: plan.dollarSavings,
    });
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

    this.trackEvent('add_to_cart', {
      plan_id: target.id,
      quantity: target.quantity,
      price: target.discountedPrice,
      free_gift: target.freeGift,
    });
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
