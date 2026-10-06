import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-consistency-matters',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="py-[60px] lg:py-[100px] bg-[#FAF7F2] border-t border-b border-[#000948]/10">
      <div class="max-w-[1440px] mx-auto px-[16px] lg:px-[30px]">
        <div class="flex flex-col lg:flex-row gap-10 lg:gap-14 max-w-[1250px] mx-auto">
          <!-- Left: Heading -->
          <div class="lg:w-[32%] text-left">
            <h2 class="font-[500] text-[#000948] text-[32px] sm:text-[42px] lg:text-[50px] leading-[115%] font-recoleta sticky top-[120px]">
              Why Consistency Matters
            </h2>
          </div>

          <!-- Right: Top 3 Items + Bottom 4 Feature Cards -->
          <div class="lg:w-[68%] flex flex-col gap-10">
            <!-- Top 3 Icon Blocks -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
              @for (item of topItems; track item.title) {
                <div class="flex flex-col items-start text-left">
                  <div class="w-12 h-12 mb-3 flex items-center justify-start">
                    <img [src]="item.img" [alt]="item.title" class="max-h-full max-w-full object-contain" />
                  </div>
                  <h3 class="font-[600] text-[15px] sm:text-[16px] text-[#000948] mb-1.5 leading-snug">
                    {{ item.title }}
                  </h3>
                  <p class="text-[12px] sm:text-[13px] text-[#000948]/75 leading-[140%]">
                    {{ item.copy }}
                  </p>
                </div>
              }
            </div>

            <!-- Bottom 4 Feature Cards -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
              @for (card of bottomItems; track card.title) {
                <div class="bg-white p-3.5 sm:p-4 rounded-[12px] border border-[#000948]/10 flex flex-col items-center text-center shadow-2xs">
                  <img [src]="card.img" [alt]="card.title" class="w-6 h-6 mb-2 object-contain" />
                  <h4 class="font-[600] text-[11px] sm:text-[12px] text-[#000948] leading-tight mb-1">
                    {{ card.title }}
                  </h4>
                  <p class="text-[10px] text-[#000948]/70 leading-snug">
                    {{ card.copy }}
                  </p>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class ConsistencyMatters {
  readonly topItems = [
    {
      img: 'https://cdn.shopify.com/s/files/1/0506/0424/5166/files/Layer_1_6.png?v=1784396763&width=96',
      title: 'Keep Hunger in Check Every Day',
      copy: "Support your dog's metabolism and gut health before hunger spikes become a habit.",
    },
    {
      img: 'https://cdn.shopify.com/s/files/1/0506/0424/5166/files/Frame_1598783.svg?v=1782410160',
      title: 'Best Results in 3+ Months',
      copy: 'Improvements often show in the first weeks, but best results can take up to 3+ months',
    },
    {
      img: 'https://cdn.shopify.com/s/files/1/0506/0424/5166/files/ear-scratch.svg?v=1782410160',
      title: 'Don’t Lose Progress',
      copy: 'Skipping days can slow results down',
    },
  ];

  readonly bottomItems = [
    {
      img: 'https://cdn.shopify.com/s/files/1/0506/0424/5166/files/Group_945.svg?v=1782410160',
      title: 'You’re in Control',
      copy: 'Cancel, pause or edit your subscription anytime',
    },
    {
      img: 'https://cdn.shopify.com/s/files/1/0506/0424/5166/files/Frame_1598782.svg?v=1782410160',
      title: 'Delivered Automatically',
      copy: 'Right when you need it, every time',
    },
    {
      img: 'https://cdn.shopify.com/s/files/1/0506/0424/5166/files/Group_945_1.svg?v=1782410160',
      title: 'Never Run Out',
      copy: 'Stay consistent without thinking about it',
    },
    {
      img: 'https://cdn.shopify.com/s/files/1/0506/0424/5166/files/Group_945_2.svg?v=1782410160',
      title: '90-Day Money Back Guarantee',
      copy: 'Not happy? Get a full refund, no questions asked.',
    },
  ];
}
