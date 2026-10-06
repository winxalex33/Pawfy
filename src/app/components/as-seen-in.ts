import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-as-seen-in',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="w-full bg-[#20254A] py-6 px-4">
      <div class="max-w-[1200px] mx-auto flex flex-wrap items-center justify-center gap-6 sm:gap-10 lg:gap-16">
        <span class="text-white/80 font-[500] text-[15px] sm:text-[17px] tracking-wide">
          As seen in:
        </span>
        <!-- Great Pet -->
        <div class="flex items-center brightness-0 invert opacity-90 hover:opacity-100 transition">
          <img
            src="https://cdn.shopify.com/s/files/1/0506/0424/5166/files/great-pet-navy-c9fa363095d969ac6c944571b9f7eba1_3.svg?v=1782337293"
            alt="Great Pet"
            class="h-[28px] sm:h-[34px] w-auto object-contain"
          />
        </div>
        <!-- Forbes -->
        <div class="text-white font-serif font-bold text-[22px] sm:text-[26px] tracking-wider opacity-90 hover:opacity-100 transition">
          Forbes
        </div>
        <!-- yahoo! -->
        <div class="text-white font-sans font-extrabold text-[20px] sm:text-[24px] tracking-tight opacity-90 hover:opacity-100 transition">
          yahoo!
        </div>
        <!-- BuzzFeed -->
        <div class="text-white font-sans font-black text-[20px] sm:text-[24px] tracking-tighter opacity-90 hover:opacity-100 transition flex items-center">
          <span class="text-[#EE3322] mr-0.5">●</span>BuzzFeed
        </div>
      </div>
    </section>
  `,
})
export class AsSeenIn {}
