import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-owner-reviews',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="owner-reviews" class="pt-[40px] lg:pt-[70px] pb-[50px] lg:pb-[80px] reviews overflow-hidden relative bg-[#FFF7F3] scroll-mt-[120px]">
      <div class="max-w-[1440px] mx-auto px-[16px] lg:px-[30px]">
        <!-- Header -->
        <div class="max-w-[1170px] mx-auto mb-[35px] text-center">
          <!-- 5 Green Squares with White Star inside -->
          <div class="flex justify-center gap-1.5 mb-[15px]">
            @for (item of [1, 2, 3, 4, 5]; track $index) {
              <span class="w-7 h-7 sm:w-8 sm:h-8 bg-[#009055] text-white flex items-center justify-center rounded-[4px] text-[16px] font-bold shadow-2xs">
                ★
              </span>
            }
          </div>
          <h2 class="font-[500] text-[#000948] leading-[110%] lg:leading-[120%] text-center text-[30px] sm:text-[40px] lg:text-[64px] font-recoleta">
            Over 1 Million Owners Trust Us For Their Dog’s Health
          </h2>
          <p class="mt-[12px] font-[400] text-[15px] lg:text-[18px] text-[#000948] leading-[150%] text-center mx-auto">
            4.8 average rating based on 1,637 reviews • 99% would recommend this product
          </p>
        </div>

        <!-- 3 Side-by-Side Review Cards Grid -->
        <div class="max-w-[1370px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          @for (r of reviews; track r.name) {
            <div class="p-5 lg:p-6 bg-white rounded-[22px] border border-[#DFE0E9] shadow-xs flex flex-col justify-between transition-all duration-300 hover:shadow-md hover:border-[#000948]/20">
              <div>
                <!-- Photo on top with fixed aspect height -->
                <div class="rounded-[15px] overflow-hidden mb-[18px] h-[175px] w-full bg-[#F7F6F2] flex items-center justify-center">
                  <img
                    [alt]="r.name"
                    [src]="r.image"
                    width="400"
                    height="175"
                    loading="lazy"
                    class="w-full h-full object-cover rounded-[10px]"
                  />
                </div>

                <!-- Verified Purchase + Date -->
                <div class="flex items-center justify-between gap-[16px] mb-[15px]">
                  <div class="flex items-center gap-[6px] bg-[#F4ECEA] rounded-[6px] py-[4px] px-[8px]">
                    <span class="flex h-[13px] w-[13px] shrink-0 items-center justify-center rounded-full text-[#009055]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 16 16" fill="none">
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M8 1.333C4.319 1.333 1.334 4.318 1.334 8s2.985 6.667 6.666 6.667 6.667-2.985 6.667-6.667-2.985-6.667-6.667-6.667zm2.388 5.317a.667.667 0 0 0-.962-.054L6.964 9.256l-.943-.943a.667.667 0 1 0-.943.943l1.333 1.334c.1.1.238.153.379.146a.668.668 0 0 0 .362-.183l3-3.666c.175-.214.144-.529-.072-.704z"
                          fill="#009055"
                        />
                      </svg>
                    </span>
                    <span class="text-[11px] font-[500] uppercase tracking-[0.06em] text-[#009055]">
                      Verified Purchase
                    </span>
                  </div>
                  <p class="text-[12px] uppercase tracking-[0.04em] text-[#6A647C] font-mono">
                    {{ r.date }}
                  </p>
                </div>

                <!-- Author Name & 5 Green Stars -->
                <div class="flex items-center mb-[14px] gap-[10px]">
                  <div class="font-[600] text-[16px] leading-[130%] text-[#000948]">
                    {{ r.name }}
                  </div>
                  <img
                    alt="5 stars"
                    src="https://cdn.shopify.com/s/files/1/0506/0424/5166/files/Group_1214_1.png?v=1782833476&width=110"
                    class="max-h-[18px] w-auto object-contain"
                    loading="lazy"
                  />
                </div>

                <!-- Review Text -->
                <p class="font-[400] text-[13px] lg:text-[14px] text-[#000948] leading-[150%]">
                  {{ r.text }}
                </p>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class OwnerReviews {
  readonly reviews = [
    {
      name: 'Carrie',
      date: '1/6/2026',
      image: 'https://cdn.shopify.com/s/files/1/0506/0424/5166/files/Frame_1598624.png?v=1784395713&width=450',
      text: '"Two weeks in and my dog has completely stopped circling the kitchen between meals. She eats, she settles. I didn\'t realise how much her begging was stressing me out until it stopped."',
    },
    {
      name: 'Annabelle',
      date: '1/6/2026',
      image: 'https://cdn.shopify.com/s/files/1/0506/0424/5166/files/Frame_1598624_1.png?v=1784395713&width=450',
      text: '"My lab has been carrying extra weight for years despite us cutting back his food. 3 months on these and she\'s visibly leaner and more energetic on walks. Actually excited to go out again."',
    },
    {
      name: 'Juliet',
      date: '1/6/2026',
      image: 'https://cdn.shopify.com/s/files/1/0506/0424/5166/files/Frame_1598624_2.png?v=1784395713&width=450',
      text: '"I was skeptical because we\'d tried everything. But something about these chews just works. Less begging, less panting, and he\'s dropped almost 2 pounds without us changing anything else."',
    },
  ];
}
