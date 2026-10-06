import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PdpState } from '../services/pdp-state';

@Component({
  selector: 'app-feeding-guide-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (state.showFeedingModal()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fadeIn">
        <div class="bg-white rounded-[24px] max-w-md w-full p-6 shadow-2xl border border-[#000948]/15 relative">
          <button
            type="button"
            (click)="state.showFeedingModal.set(false)"
            class="absolute top-4 right-4 text-[#000948]/60 hover:text-[#000948] text-lg font-bold w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer"
          >
            ✕
          </button>
          <h3 class="font-recoleta text-[22px] font-[600] text-[#000948] mb-2">
            Veterinary Feeding Guide
          </h3>
          <p class="text-[13px] text-[#000948]/80 leading-[140%] mb-4">
            Use this as your quick daily guide. If your pup is between weight ranges or has a sensitive stomach, start lower and adjust as needed with your vet.
          </p>
          <div class="space-y-2 border-t border-b border-[#000948]/15 py-3 mb-4">
            <div class="flex justify-between items-center text-xs py-1">
              <span class="font-semibold text-[#000948]">SMALL (Up to 30 lbs)</span>
              <span class="font-bold text-[#009055] bg-emerald-50 px-2 py-0.5 rounded">1 soft chew daily</span>
            </div>
            <div class="flex justify-between items-center text-xs py-1">
              <span class="font-semibold text-[#000948]">MEDIUM (31 to 60 lbs)</span>
              <span class="font-bold text-[#009055] bg-emerald-50 px-2 py-0.5 rounded">2 soft chews daily</span>
            </div>
            <div class="flex justify-between items-center text-xs py-1">
              <span class="font-semibold text-[#000948]">LARGE (61 to 90 lbs)</span>
              <span class="font-bold text-[#009055] bg-emerald-50 px-2 py-0.5 rounded">3 soft chews daily</span>
            </div>
            <div class="flex justify-between items-center text-xs py-1">
              <span class="font-semibold text-[#000948]">EXTRA LARGE (91+ lbs)</span>
              <span class="font-bold text-[#009055] bg-emerald-50 px-2 py-0.5 rounded">4 soft chews daily</span>
            </div>
          </div>
          <button
            type="button"
            (click)="state.showFeedingModal.set(false)"
            class="w-full bg-[#000948] text-white py-2.5 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-[#1a225c] transition cursor-pointer"
          >
            Got It
          </button>
        </div>
      </div>
    }
  `,
})
export class FeedingGuideModal {
  readonly state = inject(PdpState);
}
