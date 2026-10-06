import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { PdpState } from '../services/pdp-state';

@Component({
  selector: 'app-sticky-atc',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (isVisible()) {
      <div
        class="fixed bottom-3 sm:bottom-5 inset-x-0 z-40 px-4 max-w-[560px] mx-auto transition-transform duration-300 animate-slideUp"
        aria-label="Sticky purchase bar"
      >
        <div class="bg-[#FAF4EF] border border-[#000948]/20 rounded-full px-5 py-2.5 sm:py-3 shadow-xl flex items-center justify-between gap-4">
          <!-- Left: Offer Copy -->
          <div class="text-left">
            <div class="font-[700] text-[13px] sm:text-[15px] text-[#000948] leading-tight">
              Save 35% + Free Gift
            </div>
            <div class="text-[10px] sm:text-[11px] text-[#000948]/70 leading-none mt-0.5 font-[500]">
              While Supplies Last
            </div>
          </div>

          <!-- Right: Action Button -->
          <button
            type="button"
            (click)="state.addToCart()"
            class="bg-[#1f244b] hover:bg-[#151a3a] text-white font-[600] text-[12px] sm:text-[13px] tracking-wider uppercase px-5 sm:px-7 py-2.5 rounded-full transition-all active:scale-95 shadow-sm cursor-pointer whitespace-nowrap"
          >
            TRY RISK FREE
          </button>
        </div>
      </div>
    }
  `,
  host: {
    '(window:scroll)': 'onWindowScroll()'
  }
})
export class StickyAtc {
  readonly state = inject(PdpState);
  readonly isVisible = signal(false);

  onWindowScroll() {
    if (typeof window !== 'undefined') {
      this.isVisible.set(window.scrollY > 550);
    }
  }
}
