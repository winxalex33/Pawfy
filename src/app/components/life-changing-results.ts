import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-life-changing-results',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="py-[60px] lg:py-[90px] bg-white">
      <div class="max-w-[1440px] mx-auto px-[16px] lg:px-[30px]">
        <!-- Title -->
        <h2 class="font-[500] text-[#000948] text-[28px] sm:text-[38px] lg:text-[48px] leading-[115%] font-recoleta text-center mb-8 lg:mb-12">
          Life-Changing Results, For Dogs &amp; Their Parents
        </h2>
        <!-- 5 Customer Photos Grid -->
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 max-w-[1300px] mx-auto">
          @for (t of testimonials; track t.name) {
            <div class="rounded-[16px] overflow-hidden shadow-xs border border-[#000948]/10 bg-[#F7F6F2] flex flex-col">
              <img
                [src]="t.image"
                [alt]="t.name"
                width={260}
                height={320}
                loading="lazy"
                class="w-full h-[220px] sm:h-[260px] lg:h-[280px] object-cover"
              />
              <div class="p-3 text-center bg-white border-t border-[#000948]/5">
                <span class="font-[600] text-[13px] text-[#000948]">{{ t.name }}</span>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class LifeChangingResults {
  readonly testimonials = [
    {
      name: 'Tami, Dog Parent',
      image: 'https://cdn.shopify.com/s/files/1/0506/0424/5166/files/Frame_1598768.png?v=1784565698&width=300',
    },
    {
      name: 'Nicole, Dog Parent',
      image: 'https://cdn.shopify.com/s/files/1/0506/0424/5166/files/Copy_of_IMG_9114_1.png?v=1784565698&width=300',
    },
    {
      name: 'Dr. Whitney, DVM',
      image: 'https://cdn.shopify.com/s/files/1/0506/0424/5166/files/IMG_7540_1.png?v=1784565698&width=300',
    },
    {
      name: 'Dr. Daisy, DVM',
      image: 'https://cdn.shopify.com/s/files/1/0506/0424/5166/files/IMG_7776_1.png?v=1784565698&width=300',
    },
    {
      name: 'Donna, Dog Parent',
      image: 'https://cdn.shopify.com/s/files/1/0506/0424/5166/files/IMG_1429_1.png?v=1784565698&width=300',
    },
  ];
}
