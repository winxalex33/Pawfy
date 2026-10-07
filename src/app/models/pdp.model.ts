export interface PlanItem {
  text: string;
  callout?: {
    comparePrice: string;
    price: string;
  };
}

export interface PlanOption {
  id: string;
  quantity: number;
  title: string;
  subtitle: string;
  tag?: string;
  tagClassName?: string;
  badge?: string;
  regularPrice: number;
  discountedPrice: number;
  perDayPrice: number;
  billedText: string;
  savingsPercentage: number;
  dollarSavings: number;
  freeGift: boolean;
  freeGiftName: string;
  freeShipping: boolean;
  guaranteeDays: number;
  items: (PlanItem | string)[];
}

export type ShopifyLineItemProperty = Record<string, string>;

export interface ShopifyCartItem {
  id: number;
  quantity: number;
  selling_plan?: number;
  properties?: ShopifyLineItemProperty;
}

export interface ShopifyAddPayload {
  items: ShopifyCartItem[];
}

export interface AnalyticsEvent {
  id: string;
  timestamp: string;
  event: string;
  properties: Record<string, unknown>;
}

export interface CustomerReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  verified: boolean;
  petName?: string;
  petBreed?: string;
  headline?: string;
  copy: string;
  helpfulCount: number;
}

export interface PerformanceMetricReport {
  metric: string;
  target: string;
  actual: string;
  status: 'PASS' | 'EXCELLENT' | 'NEEDS_OPTIMIZATION';
  notes: string;
}

export const PRODUCT_CONFIG = {
  id: 'pawfy-metabolic-complex',
  handle: 'metabolic-complex',
  title: 'Metabolic Complex',
  subtitle: 'Natural GLP-1 Weight Management Soft Chews for Dogs',
  sizeText: '4 OZ (113g) / 30 chews per tub',
  rating: 4.8,
  reviewCount: 1637,
  variantId: 47918395785390,
  giftVariantId: 45054690164910,
  giftProductName: 'Pawfy Dental Wash (8 fl oz)',
  discountCode: 'DZTVBXMTCVTZKH4',
  giftDiscountCode: 'P1X77SH3MTKG',
  flavor: 'Natural Savory Turkey',
  madeIn: 'Made in the USA from globally sourced ingredients',
  trustBadges: [
    'Veterinarian Formulated & Approved',
    'Non-GMO & Grain Free',
    'No Artificial Flavors or Preservatives',
    'Independent 3rd-Party Lab Tested',
    'NASC Certified Member'
  ],
  galleryImages: [
    'https://cdn.shopify.com/s/files/1/0506/0424/5166/files/V5.jpg?v=1790790518&width=308',
    'https://cdn.shopify.com/s/files/1/0506/0424/5166/files/Dental-Wash-Gift-Slide.jpg?v=1790790518&width=308',
    'https://cdn.shopify.com/s/files/1/0506/0424/5166/files/Slide_2_1.png?v=1785180017&width=308',
    'https://cdn.shopify.com/s/files/1/0506/0424/5166/files/Image_4_5_1.png?v=1784659753&width=308',
    'https://cdn.shopify.com/s/files/1/0506/0424/5166/files/Image_5_1.png?v=1784312125&width=308',
    'https://cdn.shopify.com/s/files/1/0506/0424/5166/files/Image_6_1.png?v=1784312125&width=308',
    'https://cdn.shopify.com/s/files/1/0506/0424/5166/files/Image_7_2_1.png?v=1784653125&width=308'
  ],
  plans: [
    {
      id: 'plan-3-tubs',
      quantity: 3,
      title: '90-Day Plan (3 Tubs)',
      subtitle: 'Full Transformation Cycle — Most Effective',
      tag: 'Best Value',
      tagClassName: 'best-value',
      badge: 'SAVE 35% + FREE GIFT',
      regularPrice: 105.00,
      discountedPrice: 68.40,
      perDayPrice: 0.76,
      billedText: 'Billed $68.40 USD every 12 weeks',
      savingsPercentage: 35,
      dollarSavings: 36.60,
      freeGift: true,
      freeGiftName: 'FREE Dental Wash ($25.00 Value)',
      freeShipping: true,
      guaranteeDays: 90,
      items: [
        { text: '90 Days of Metabolic Complex', callout: { comparePrice: '$105.00', price: '$68.40' } },
        { text: 'FREE Dental Wash', callout: { comparePrice: '$25.00', price: 'Free' } },
        { text: 'Fast Shipping', callout: { comparePrice: '$4.99', price: 'Free' } },
        { text: '90-Day Money Back Guarantee', callout: { comparePrice: '', price: 'Included' } }
      ]
    },
    {
      id: 'plan-1-tub',
      quantity: 1,
      title: '30-Day Starter (1 Tub)',
      subtitle: 'Ideal for testing taste & initial tolerance',
      tag: 'Starter',
      tagClassName: 'starter',
      badge: '',
      regularPrice: 35.00,
      discountedPrice: 22.80,
      perDayPrice: 0.76,
      billedText: 'Billed $22.80 USD every 4 weeks',
      savingsPercentage: 35,
      dollarSavings: 12.20,
      freeGift: false,
      freeGiftName: '',
      freeShipping: true,
      guaranteeDays: 90,
      items: [
        { text: '1 Tub (30 Days) Metabolic Complex', callout: { comparePrice: '$35.00', price: '$22.80' } },
        { text: 'Fast Priority Shipping', callout: { comparePrice: '$4.99', price: 'Free' } },
        { text: '90-Day Money-Back Guarantee', callout: { comparePrice: '', price: 'Included' } }
      ]
    }
  ]
};
