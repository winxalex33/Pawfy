import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { PdpState } from '../services/pdp-state';
import { PlanOption, PRODUCT_CONFIG } from '../models/pdp.model';
import { optimizeShopifyImage } from '../utils/image';

@Component({
  selector: 'app-atf',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="product-atf" class="row product-atf v2 scroll-mt-[120px] bg-white pt-4 lg:pt-8 pb-8">
      <div class="max-w-[1440px] mx-auto !block lg:!flex xl:!w-full lg:!flex-row px-[16px] lg:px-[30px]">
        <!-- Mobile Title (above gallery) -->
        <h1 class="font-[500] !text-[22px] lg:text-[40px] xl:text-[40px] text-[#000948] leading-[115%] font-recoleta lg:hidden mb-[15px]">
          Metabolic Complex – Natural GLP-1 Chews For Overweight Dogs
        </h1>

        <!-- LEFT COLUMN: Gallery Slider + 3 Value Props Bar underneath -->
        <div class="lg:w-[58%] xl:w-[57%] flex-shrink-0 lg:pr-8">
          <div class="flex flex-row-reverse lg:flex-row items-start justify-between gap-[10px] xl:gap-4 max-w-full">
            <!-- 1. Vertical Thumbnails Column -->
            <ul class="flex flex-wrap flex-col flex-[0_0_60px] md:flex-[0_0_73px] lg:flex-[0_0_71px] xl:flex-[0_0_96px] m-0 p-0 gap-[8px] lg:gap-[10px] max-h-[460px] lg:max-h-[520px] xl:max-h-[610px] overflow-y-auto scrollbar-none list-none z-10">
              @for (src of galleryImages; track $index) {
                <li class="aspect-square">
                  <button
                    type="button"
                    (click)="state.setGallerySlide($index)"
                    class="w-full h-full rounded-[10px] border overflow-hidden transition-all cursor-pointer aspect-square bg-[#F7F6F2] block p-0"
                    [class.border-[#000948]]="state.activeGallerySlide() === $index"
                    [class.ring-2]="state.activeGallerySlide() === $index"
                    [class.ring-[#000948]]="state.activeGallerySlide() === $index"
                    [class.border-[#DFE0E9]]="state.activeGallerySlide() !== $index"
                    [attr.aria-label]="'Select gallery slide ' + ($index + 1)"
                  >
                    <img
                      [alt]="'Thumbnail ' + ($index + 1)"
                      [src]="getThumbnail(src)"
                      width="96"
                      height="96"
                      loading="lazy"
                      class="w-[60px] md:w-[73px] lg:w-[71px] xl:w-[96px] h-[60px] md:h-[73px] xl:h-[96px] object-cover rounded-[10px]"
                    />
                  </button>
                </li>
              }
            </ul>

            <!-- 2. Main Hero Image Frame with Prev/Next Navigation -->
            <div class="relative flex-1 bg-[#FBF9F5] rounded-[12px] border border-[#000948]/10 overflow-hidden shadow-xs">
              <img
                [alt]="'Pawfy Metabolic Complex - Image ' + (state.activeGallerySlide() + 1)"
                [src]="getMainHero(galleryImages[state.activeGallerySlide()])"
                [srcset]="getMainHeroSrcset(galleryImages[state.activeGallerySlide()])"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 480px, 581px"
                width="581"
                height="581"
                [attr.fetchpriority]="state.activeGallerySlide() === 0 ? 'high' : 'auto'"
                [attr.loading]="state.activeGallerySlide() === 0 ? 'eager' : 'lazy'"
                decoding="async"
                class="w-full h-auto object-cover max-h-[610px] rounded-[12px]"
              />

              <!-- Prev Arrow Button -->
              <button
                type="button"
                (click)="prevSlide()"
                class="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[#000948] flex items-center justify-center shadow-md cursor-pointer border border-[#000948]/10 transition-transform active:scale-95"
                aria-label="Previous slide"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>

              <!-- Next Arrow Button -->
              <button
                type="button"
                (click)="nextSlide()"
                class="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[#000948] flex items-center justify-center shadow-md cursor-pointer border border-[#000948]/10 transition-transform active:scale-95"
                aria-label="Next slide"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>

          <!-- 3 Value Props Bar Under Gallery (Exact Live Site Match) -->
          <ul class="grid grid-cols-3 list-none p-0 m-0 w-full rounded-[10px] border border-[#00094840] bg-[#FFF7F3] justify-evenly mt-[14px] lg:mt-5">
            <li class="text-center border-[#00094840] border-r p-[8px] lg:p-[18px] flex flex-col items-center justify-center">
              <div class="flex justify-center mb-[6px]">
                <img
                  alt="For Less Begging, a Leaner Body & More Energy"
                  loading="lazy"
                  width="48"
                  height="48"
                  class="h-[32px] w-auto lg:h-[45px] object-contain"
                  src="https://cdn.shopify.com/s/files/1/0506/0424/5166/files/dog_standing_1_2.png?v=1784396535&width=96"
                />
              </div>
              <p class="font-[400] text-[10px] lg:text-[13px] text-[#000948] leading-[120%] text-center">
                For Less Begging, a Leaner Body &amp; More Energy
              </p>
            </li>
            <li class="text-center border-[#00094840] border-r p-[8px] lg:p-[18px] flex flex-col items-center justify-center">
              <div class="flex justify-center mb-[6px]">
                <img
                  alt="Made in the USA"
                  loading="lazy"
                  width="48"
                  height="48"
                  class="h-[32px] w-auto lg:h-[45px] object-contain"
                  src="https://cdn.shopify.com/s/files/1/0506/0424/5166/files/Frame_1598821_1.png?v=1784396535&width=96"
                />
              </div>
              <p class="font-[400] text-[10px] lg:text-[13px] text-[#000948] leading-[120%] text-center">
                Made in the USA
              </p>
            </li>
            <li class="text-center p-[8px] lg:p-[18px] flex flex-col items-center justify-center">
              <div class="flex justify-center mb-[6px]">
                <img
                  alt="90-day money-back guarantee"
                  loading="lazy"
                  width="48"
                  height="48"
                  class="h-[32px] w-auto lg:h-[45px] object-contain"
                  src="https://cdn.shopify.com/s/files/1/0506/0424/5166/files/Frame_1598822_1.png?v=1784396535&width=96"
                />
              </div>
              <p class="font-[400] text-[10px] lg:text-[13px] text-[#000948] leading-[120%] text-center">
                90-day money-back guarantee
              </p>
            </li>
          </ul>
        </div>

        <!-- RIGHT COLUMN: Headlines, Pricing, Radios, CTA, Tabs -->
        <div class="lg:w-[42%] xl:w-[43%] mt-[25px] lg:mt-0">
          <!-- Desktop Headline -->
          <h1 class="font-[500] text-[26px] lg:text-[36px] xl:text-[40px] text-[#000948] leading-[110%] font-recoleta hidden lg:block">
            Metabolic Complex – Natural GLP-1 Chews For Overweight Dogs
          </h1>

          <!-- Stars & Social Proof -->
          <div class="flex items-center text-[11px] lg:text-[13px] text-[#00094880] leading-[120%] my-[12px]">
            <svg xmlns="http://www.w3.org/2000/svg" width="90" height="18" viewBox="0 0 100 20" fill="none" class="w-[85px] lg:w-[100px] mr-2">
              @for (offset of [0, 20, 40, 60, 80]; track $index) {
                <path
                  [attr.d]="'M' + (9.5 + offset) + ' 0.5L' + (11.8 + offset) + ' 6.8H' + (18.5 + offset) + 'L' + (13.2 + offset) + ' 11.2L' + (15.1 + offset) + ' 17.6L' + (9.5 + offset) + ' 13.9L' + (3.9 + offset) + ' 17.6L' + (5.8 + offset) + ' 11.2L' + (0.5 + offset) + ' 7.1H' + (7.2 + offset) + 'Z'"
                  fill="#009055"
                  stroke="#009055"
                />
              }
            </svg>
            <span class="font-[500] text-[#000948]">Trusted by 1M+ Happy Dogs &amp; Their Humans</span>
          </div>

          <p class="font-[400] text-[14px] lg:text-[15px] leading-[140%] text-[#000948] mb-[15px]">
            These weight management chews curb your dog’s hunger between meals, reduce begging, and help them manage their weight more comfortably.
          </p>

          <!-- 3 Checkmark Bullets -->
          <ul class="flex flex-col gap-[6px] mb-5">
            <li class="flex gap-[6px] items-center text-[14px] lg:text-[15px]">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 21 21" fill="none" class="shrink-0">
                <path d="M17.5 5.25L7.875 14.875L3.5 10.5" stroke="#000948" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <span class="font-[500] text-[#009055]">Made in the USA</span>
            </li>
            <li class="flex gap-[6px] items-center text-[14px] lg:text-[15px]">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 21 21" fill="none" class="shrink-0">
                <path d="M17.5 5.25L7.875 14.875L3.5 10.5" stroke="#000948" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <span class="font-[500] text-[#009055]">GMO, Hormone &amp; Antibiotic-free</span>
            </li>
            <li class="flex gap-[6px] items-center text-[14px] lg:text-[15px]">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 21 21" fill="none" class="shrink-0">
                <path d="M17.5 5.25L7.875 14.875L3.5 10.5" stroke="#000948" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <span class="font-[500] text-[#009055]">3rd Party Lab Tested</span>
            </li>
          </ul>

          <!-- Subscription Selection -->
          <div class="pt-1">
            <p class="font-[500] text-[18px] lg:text-[21px] leading-[130%] text-[#000948] font-recoleta mb-[15px]">
              Select your subscription:
            </p>

            <fieldset class="space-y-[11px] mb-3">
              <!-- Option 1: 90-Day Plan (3 Tubs) -->
              <label
                class="block relative p-[13px] lg:p-[16px] border rounded-[10px] cursor-pointer transition-all"
                [class.bg-[#E2F8E6]]="selectedQty() === '3'"
                [class.border-[#000948]]="selectedQty() === '3'"
                [class.bg-[#FFF7F3]]="selectedQty() !== '3'"
                [class.border-[#000948]/25]="selectedQty() !== '3'"
              >
                <!-- Top Vet-Formulated Banner -->
                <div class="mx-[-14px] lg:mx-[-17px] mt-[-14px] lg:mt-[-17px] mb-[16px] rounded-t-[7px] bg-[#000948] px-[16px] py-[8px] text-center text-[12px] font-[500] uppercase tracking-[0.04em] text-white">
                  VET-FORMULATED
                </div>

                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <input
                      type="radio"
                      name="qty"
                      [checked]="selectedQty() === '3'"
                      (change)="selectQty('3')"
                      class="accent-[#000948] w-4 h-4 cursor-pointer"
                    />
                    <span class="ml-[8px] lg:ml-[10px] text-[16px] lg:text-[18px] text-[#000948] leading-[130%] font-[500]">
                      90-Day Plan (3 Tubs)
                    </span>
                  </div>
                  <span class="text-[11px] lg:text-[13px] font-[500] text-[#000948] text-right">
                    $0.75 / day
                  </span>
                </div>

                <!-- Expanded Breakdown for 90-Day Plan -->
                @if (selectedQty() === '3') {
                  <div class="pt-[12px] mt-[12px]">
                    <div class="relative mb-[16px] pt-[2px]">
                      <div class="border-t border-[#000948]"></div>
                      <span class="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0E9F6E] px-[14px] py-[5px] text-center text-[11px] lg:text-[12px] font-[500] uppercase text-white shadow-xs whitespace-nowrap">
                        SAVE 35% + FREE GIFT
                      </span>
                    </div>

                    <div class="text-[15px] lg:text-[17px] text-[#000948] leading-[130%] font-[500] mb-[10px]">
                      Includes:
                    </div>

                    <ul class="flex flex-col gap-[5px] text-[12px] lg:text-[14px] text-[#000948]">
                      <li class="flex items-start justify-between gap-[10px]">
                        <span class="flex items-center gap-[7px]">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 21 21" fill="none" class="shrink-0">
                            <path d="M17.5 5.25L7.875 14.875L3.5 10.5" stroke="#000948" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                          </svg>
                          <span>90 Days of Metabolic Complex</span>
                        </span>
                        <span class="shrink-0 text-right">
                          <span class="text-[rgba(0,9,72,0.45)] line-through mr-[6px]">$105.00</span>
                          <span class="text-[#000948] font-[700]">$68.40</span>
                        </span>
                      </li>
                      <li class="flex items-start justify-between gap-[10px]">
                        <span class="flex items-center gap-[7px]">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 21 21" fill="none" class="shrink-0">
                            <path d="M17.5 5.25L7.875 14.875L3.5 10.5" stroke="#000948" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                          </svg>
                          <span>FREE Dental Wash</span>
                        </span>
                        <span class="shrink-0 text-right">
                          <span class="text-[rgba(0,9,72,0.45)] line-through mr-[6px]">$25.00</span>
                          <span class="text-[#000948] font-[700]">Free</span>
                        </span>
                      </li>
                      <li class="flex items-start justify-between gap-[10px]">
                        <span class="flex items-center gap-[7px]">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 21 21" fill="none" class="shrink-0">
                            <path d="M17.5 5.25L7.875 14.875L3.5 10.5" stroke="#000948" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                          </svg>
                          <span>Fast Shipping</span>
                        </span>
                        <span class="shrink-0 text-right">
                          <span class="text-[rgba(0,9,72,0.45)] line-through mr-[6px]">$4.99</span>
                          <span class="text-[#000948] font-[700]">Free</span>
                        </span>
                      </li>
                      <li class="flex items-start justify-between gap-[10px]">
                        <span class="flex items-center gap-[7px]">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 21 21" fill="none" class="shrink-0">
                            <path d="M17.5 5.25L7.875 14.875L3.5 10.5" stroke="#000948" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                          </svg>
                          <span>90-Day Money Back Guarantee</span>
                        </span>
                      </li>
                    </ul>

                    <div class="mt-[10px] flex items-center justify-between text-[11px] lg:text-[13px] text-[#000948] border-t border-[#000948]/15 pt-[10px]">
                      <span class="underline underline-offset-[3px]">✓ No commitment</span>
                      <span class="underline underline-offset-[3px]">&gt; Skip or cancel anytime</span>
                    </div>
                  </div>
                }
              </label>

              <!-- Option 2: 30-Day Plan (1 Tub) -->
              <label
                class="block relative p-[13px] lg:p-[16px] border rounded-[10px] cursor-pointer transition-all"
                [class.bg-[#E2F8E6]]="selectedQty() === '1'"
                [class.border-[#000948]]="selectedQty() === '1'"
                [class.bg-[#FFF7F3]]="selectedQty() !== '1'"
                [class.border-[#000948]/25]="selectedQty() !== '1'"
              >
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <input
                      type="radio"
                      name="qty"
                      [checked]="selectedQty() === '1'"
                      (change)="selectQty('1')"
                      class="accent-[#000948] w-4 h-4 cursor-pointer"
                    />
                    <span class="ml-[8px] lg:ml-[10px] text-[16px] lg:text-[18px] text-[#000948] leading-[130%] font-[500]">
                      30-Day Plan (1 Tub)
                    </span>
                  </div>
                  <div class="text-right">
                    <span class="text-[rgba(0,9,72,0.45)] line-through text-[12px] mr-[6px]">$35.00</span>
                    <span class="font-[700] text-[15px] lg:text-[16px] text-[#000948]">$22.80</span>
                  </div>
                </div>
                <div class="text-[11px] lg:text-[13px] text-[#000948]/70 mt-1 pl-[24px]">
                  $0.75 / day
                </div>
              </label>
            </fieldset>

            <!-- Big Pill CTA Button -->
            <button
              type="button"
              (click)="onCtaClick()"
              class="cursor-pointer w-full rounded-[100px] bg-[#1f244b] hover:bg-[#151a3a] px-4 py-[1.35rem] text-center text-white font-[500] text-[16px] lg:text-[18px] my-3 leading-snug transition-all duration-100 ease-linear shadow-sm"
            >
              TRY RISK FREE | {{ selectedQty() === '3' ? '$68.40' : '$22.80' }}
            </button>

            <!-- In Stock Shipping Text -->
            <div class="my-[10px] mt-[15px] text-center">
              <p class="font-[400] text-[13px] text-[#009055] leading-[145%]">
                ✓ In stock. Shipping by: <strong class="text-[#2D887D] pl-[2px]">6 Oct - 8 Oct</strong>
              </p>
            </div>

            <!-- 90-Day Guarantee Box with Circular Seal -->
            <div class="mt-[12px] flex items-center gap-[20px] rounded-[10px] lg:rounded-[15px] border border-[rgba(0,9,72,0.2)] bg-white p-[16px]">
              <div class="w-[50px] h-[50px] shrink-0 flex items-center justify-center text-[#000948]">
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 56 61" fill="none">
                  <circle cx="28" cy="30" r="26" stroke="#000948" stroke-width="2" stroke-dasharray="3 3" />
                  <text x="28" y="27" text-anchor="middle" font-size="11" font-weight="bold" fill="#000948">90</text>
                  <text x="28" y="38" text-anchor="middle" font-size="9" font-weight="bold" fill="#000948">DAY</text>
                </svg>
              </div>
              <p class="m-0 text-[13px] lg:text-[14px] leading-[140%] text-[#000948]">
                Improvements often show in the first weeks, but best results can take up to 3+ months, which is why we offer a <strong class="font-[600]">90-Day Money-Back Guarantee.</strong>
              </p>
            </div>

            <!-- Buy Once Option Link -->
            <button
              type="button"
              (click)="onBuyOnce()"
              class="w-full text-center mt-[15px] cursor-pointer bg-transparent border-0"
            >
              <span class="underline mb-[7px] text-[#000948] text-[13px] lg:text-[14px] hover:text-[#009055] transition block">
                Buy Once for $35.00 + $4.99 shipping
              </span>
            </button>

            <!-- 4 Interactive Accordion Tabs: Tell me about it -->
            <section class="mt-6">
              <div class="text-[16px] leading-[22px] font-[600] text-[#000948] mb-[20px]">
                Tell me about it:
              </div>

              <!-- Tab Navigation -->
              <div class="grid grid-cols-4 border-[#000948] border-t rounded-t-[10px]">
                <button
                  type="button"
                  (click)="activeTab.set('vet')"
                  class="border-r first:border-l border-b px-2 lg:px-4 py-[6px] text-[12px] lg:text-[16px] leading-[22px] font-[600] transition-colors rounded-tl-[10px] cursor-pointer"
                  [class.bg-[#E2F8E6]]="activeTab() === 'vet'"
                  [class.bg-white]="activeTab() !== 'vet'"
                >
                  Vet Reviewed
                </button>
                <button
                  type="button"
                  (click)="activeTab.set('benefits')"
                  class="border-r first:border-l border-b px-2 lg:px-4 py-[6px] text-[12px] lg:text-[16px] leading-[22px] font-[600] transition-colors cursor-pointer"
                  [class.bg-[#E2F8E6]]="activeTab() === 'benefits'"
                  [class.bg-white]="activeTab() !== 'benefits'"
                >
                  Product Benefits
                </button>
                <button
                  type="button"
                  (click)="activeTab.set('ingredients')"
                  class="border-r first:border-l border-b px-2 lg:px-4 py-[6px] text-[12px] lg:text-[16px] leading-[22px] font-[600] transition-colors cursor-pointer"
                  [class.bg-[#E2F8E6]]="activeTab() === 'ingredients'"
                  [class.bg-white]="activeTab() !== 'ingredients'"
                >
                  Key Ingredients
                </button>
                <button
                  type="button"
                  (click)="activeTab.set('directions')"
                  class="border-r first:border-l border-b px-2 lg:px-4 py-[6px] text-[12px] lg:text-[16px] leading-[22px] font-[600] transition-colors rounded-tr-[10px] cursor-pointer"
                  [class.bg-[#E2F8E6]]="activeTab() === 'directions'"
                  [class.bg-white]="activeTab() !== 'directions'"
                >
                  Directions for Use
                </button>
              </div>

              <!-- Tab Content Box -->
              <div class="border-[#000948] border-l border-r border-b rounded-b-[10px] bg-white">
                @if (activeTab() === 'vet') {
                  <div class="p-[20px] lg:p-4">
                    <blockquote class="text-[14px] leading-[130%] italic font-[400] text-[#000948]">
                      &quot;A healthy weight is vital for limber joints, lasting energy, and long-term wellness. But it’s almost impossible to manage when your dog acts like they’re starving 24/7. Well, these all-natural soft chews fight fat by focusing on metabolism and quieting those cravings between meals — thanks to a targeted blend of probiotics, prebiotics, l-carnitine, and more.&quot;
                    </blockquote>
                    <div class="mt-5 flex items-center gap-4">
                      <img
                        src="https://cdn.shopify.com/s/files/1/0506/0424/5166/files/Frame_1598390.png?v=1782833707&width=100"
                        alt="Arthur the dog"
                        loading="lazy"
                        class="h-[47px] w-[47px] rounded-full object-cover border border-[#00905540]"
                      />
                      <div class="py-[4px] px-[8px] bg-[#E2F8E6] rounded-[6px] border border-[rgba(0,144,85,0.25)] flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M8.00065 1.33325C4.31875 1.33325 1.33398 4.31802 1.33398 7.99992C1.33398 11.6818 4.31875 14.6666 8.00065 14.6666C11.6825 14.6666 14.6673 11.6818 14.6673 7.99992C14.6673 4.31802 11.6825 1.33325 8.00065 1.33325ZM10.3876 6.64987C10.5625 6.43615 10.531 6.12114 10.3173 5.94627C10.1035 5.77141 9.78854 5.80291 9.61367 6.01663L6.96353 9.25569L6.02087 8.31303C5.82561 8.11777 5.50903 8.11777 5.31376 8.31303C5.1185 8.50829 5.1185 8.82488 5.31376 9.02014L6.6471 10.3535C6.74699 10.4534 6.88447 10.5063 7.02556 10.4993C7.16665 10.4923 7.29818 10.4259 7.38763 10.3165L10.3876 6.64987Z"
                            fill="#009055"
                          />
                        </svg>
                        <p class="pl-[7px] text-[9px] lg:text-[13px] font-[400] leading-[130%] text-[#42A754]">
                          Endorsed by Dr. Daisy May | DVM
                        </p>
                      </div>
                    </div>
                  </div>
                }

                @if (activeTab() === 'benefits') {
                  <div class="p-4">
                    <div class="grid gap-1">
                      @for (item of benefitsList; track $index) {
                        <div class="grid grid-cols-[37px_minmax(0,1fr)] items-center gap-[10px] py-2">
                          <img [src]="item.image" [alt]="item.copy" loading="lazy" class="h-[37px] w-[37px] object-contain" />
                          <p class="text-[16px] leading-[20px] lg:text-[18px] lg:leading-[24px] font-[500] text-[#000948]">
                            {{ item.copy }}
                          </p>
                        </div>
                      }
                    </div>
                  </div>
                }

                @if (activeTab() === 'ingredients') {
                  <div class="p-4 lg:p-[20px]">
                    <div class="grid gap-4">
                      @for (item of ingredientsList; track $index) {
                        <div class="grid grid-cols-[44px_minmax(0,1fr)] gap-4">
                          <img [src]="item.img" [alt]="item.title" loading="lazy" class="h-[44px] w-[44px] object-contain" />
                          <div>
                            <div class="font-[500] text-[16px] lg:text-[18px] leading-[125%] text-[#000948]">
                              {{ item.title }}
                            </div>
                            <p class="mt-1 text-[14px] leading-[145%] text-[#20254A]">
                              {{ item.copy }}
                            </p>
                          </div>
                        </div>
                      }
                    </div>
                  </div>
                }

                @if (activeTab() === 'directions') {
                  <div class="p-4">
                    <div class="grid gap-3">
                      @for (item of directionsList; track $index) {
                        <div class="grid gap-[15px] mb-[10px] pb-[10px] last:pb-0 last:mb-0 border-b border-[#E3EDF1] last:border-b-0 grid-cols-3 md:grid-cols-[60px_180px_minmax(0,1fr)] items-center">
                          <img [src]="item.image" [alt]="item.title" loading="lazy" class="w-[35px] lg:w-full max-w-max object-contain" />
                          <div class="font-[400] text-[14px] lg:text-[16px] leading-[125%] text-[#000948]">
                            {{ item.title }}
                          </div>
                          <p class="font-[400] text-[14px] lg:text-[16px] leading-[125%] text-[#000948] text-right">
                            {{ item.copy }}
                          </p>
                        </div>
                      }
                    </div>

                    <button
                      type="button"
                      (click)="state.showFeedingModal.set(true)"
                      class="mt-3 w-full py-2 bg-[#E2F8E6] text-[#009055] hover:bg-[#d4f2dc] font-bold text-xs uppercase tracking-wider rounded-lg transition cursor-pointer"
                    >
                      Open Full Veterinary Dosage Chart
                    </button>
                  </div>
                }
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class AtfSection {
  readonly state = inject(PdpState);

  readonly galleryImages = PRODUCT_CONFIG.galleryImages;
  readonly selectedQty = signal<'3' | '1'>('3');
  readonly activeTab = signal<'vet' | 'benefits' | 'ingredients' | 'directions'>('vet');

  readonly benefitsList = [
    {
      image: 'https://cdn.shopify.com/s/files/1/0506/0424/5166/files/Layer_1_3.png?v=1782323710&width=74',
      copy: 'Reduces hunger between meals',
    },
    {
      image: 'https://cdn.shopify.com/s/files/1/0506/0424/5166/files/Group_1.png?v=1782323710&width=74',
      copy: 'Supports a healthy metabolism',
    },
    {
      image: 'https://cdn.shopify.com/s/files/1/0506/0424/5166/files/Layer_1_4.png?v=1782323710&width=74',
      copy: 'Encourages less begging for food',
    },
    {
      image: 'https://cdn.shopify.com/s/files/1/0506/0424/5166/files/Layer_1_5.png?v=1782323710&width=74',
      copy: 'Boosts energy and lean muscle',
    },
  ];

  readonly ingredientsList = [
    {
      img: 'https://cdn.shopify.com/s/files/1/0506/0424/5166/files/Ellipse_50_1.png?v=1782422651&width=88',
      title: 'Probiotic Blend (4.5 Billion CFU)',
      copy: 'Fills your dog\'s gut with good bacteria that support a healthy metabolism and help their body burn calories instead of storing them',
    },
    {
      img: 'https://cdn.shopify.com/s/files/1/0506/0424/5166/files/Ellipse_50_7.png?v=1784652381&width=88',
      title: 'Prebiotic Blend (FOS, GOS & Inulin)',
      copy: 'Balances the hunger hormones that tell your dog they\'re full - so they finish a meal and don\'t beg for more',
    },
    {
      img: 'https://cdn.shopify.com/s/files/1/0506/0424/5166/files/Ellipse_50_8.png?v=1784652381&width=88',
      title: 'L-Carnitine',
      copy: 'Encourages the body to use fat as fuel, keeping your dog lean, strong, and ready for walks',
    },
    {
      img: 'https://cdn.shopify.com/s/files/1/0506/0424/5166/files/Ellipse_50_9.png?v=1784652381&width=88',
      title: 'Salmon Oil',
      copy: 'Supports a healthy metabolism and ideal body weight, with a shinier coat and stronger heart and joints as a bonus',
    },
    {
      img: 'https://cdn.shopify.com/s/files/1/0506/0424/5166/files/Ellipse_50_8.png?v=1784652381&width=88',
      title: 'Apple Cider Vinegar',
      copy: 'Smooths digestion and cuts the hunger spikes that cause begging - so your dog eats, settles, and stays settled',
    },
  ];

  readonly directionsList = [
    {
      image: 'https://cdn.shopify.com/s/files/1/0506/0424/5166/files/dog.png?v=1782423270&width=70',
      title: 'SMALL – Up to 30 lbs',
      copy: '1 soft chew',
    },
    {
      image: 'https://cdn.shopify.com/s/files/1/0506/0424/5166/files/Vector_1.png?v=1782423270&width=70',
      title: 'MEDIUM – 31 to 60 lbs',
      copy: '2 soft chews',
    },
    {
      image: 'https://cdn.shopify.com/s/files/1/0506/0424/5166/files/dog_2.png?v=1782423270&width=70',
      title: 'LARGE – 61 to 90 lbs',
      copy: '3 soft chews',
    },
    {
      image: 'https://cdn.shopify.com/s/files/1/0506/0424/5166/files/Frame_1598570.png?v=1782423270&width=70',
      title: 'EXTRA LARGE – 91 lbs & over',
      copy: '4 soft chews',
    },
  ];

  getThumbnail(src: string): string {
    return optimizeShopifyImage(src, 96);
  }

  getMainHero(src: string): string {
    return optimizeShopifyImage(src, 581);
  }

  getMainHeroSrcset(src: string): string {
    return `${optimizeShopifyImage(src, 360)} 360w, ${optimizeShopifyImage(src, 480)} 480w, ${optimizeShopifyImage(src, 540)} 540w, ${optimizeShopifyImage(src, 640)} 640w`;
  }

  prevSlide() {
    const cur = this.state.activeGallerySlide();
    this.state.setGallerySlide(cur > 0 ? cur - 1 : this.galleryImages.length - 1);
  }

  nextSlide() {
    const cur = this.state.activeGallerySlide();
    this.state.setGallerySlide(cur < this.galleryImages.length - 1 ? cur + 1 : 0);
  }

  selectQty(qty: '3' | '1') {
    this.selectedQty.set(qty);
    const plan = PRODUCT_CONFIG.plans.find((p) => p.quantity === (qty === '3' ? 3 : 1));
    if (plan) {
      this.state.selectPlan(plan);
    }
  }

  onCtaClick() {
    const plan = PRODUCT_CONFIG.plans.find((p) => p.quantity === (this.selectedQty() === '3' ? 3 : 1));
    this.state.addToCart(plan);
  }

  onBuyOnce() {
    const oneTimePlan: PlanOption = {
      id: 'plan-1-tub-onetime',
      quantity: 1,
      title: '1 Tub (One-time Purchase)',
      subtitle: 'Single order without recurring auto-delivery',
      regularPrice: 35.0,
      discountedPrice: 35.0,
      perDayPrice: 1.16,
      billedText: 'One-time charge of $35.00 + $4.99 shipping',
      savingsPercentage: 0,
      dollarSavings: 0,
      freeGift: false,
      freeGiftName: '',
      freeShipping: false,
      guaranteeDays: 60,
      items: ['1 Tub (30 Chews) Metabolic Complex', 'Standard Tracked Shipping'],
    };
    this.state.addToCart(oneTimePlan);
  }
}
