import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PdpState } from '../services/pdp-state';

@Component({
  selector: 'app-dosage-calculator',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="w-full bg-[#F4F9F6] border border-emerald-900/10 rounded-3xl p-5 sm:p-7 shadow-xs">
      <div class="max-w-3xl mx-auto flex flex-col gap-5">
        <div class="text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <span class="text-[11px] font-bold uppercase tracking-wider text-[#009055] bg-emerald-100/70 px-2 py-0.5 rounded-full">
              Veterinary Dosage Guidelines
            </span>
            <h2 class="text-xl sm:text-2xl font-black text-gray-900 mt-1">
              How Many Chews Does Your Dog Need?
            </h2>
            <p class="text-xs sm:text-sm text-gray-600 mt-0.5">
              Natural turkey-flavored soft chews dogs love. Dosage is calibrated by body weight.
            </p>
          </div>
          <div class="flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-white px-3 py-1.5 rounded-full border border-emerald-200 shadow-2xs">
            <span>🐾</span>
            <span>30 Soft Chews Per Tub</span>
          </div>
        </div>

        <!-- Quick Weight Selectors -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-bold" role="group" aria-label="Select dog weight tier">
          @for (item of quickTiers; track item.label) {
            <button
              type="button"
              (click)="onQuickSelect(item.val)"
              class="py-2.5 px-3 rounded-xl border text-center transition focus-visible:ring-2 focus-visible:ring-emerald-600 cursor-pointer"
              [class.bg-[#19483C]]="isTierSelected(item.val)"
              [class.text-white]="isTierSelected(item.val)"
              [class.border-[#19483C]]="isTierSelected(item.val)"
              [class.shadow-xs]="isTierSelected(item.val)"
              [class.bg-white]="!isTierSelected(item.val)"
              [class.text-gray-700]="!isTierSelected(item.val)"
              [class.border-gray-200]="!isTierSelected(item.val)"
            >
              {{ item.label }}
            </button>
          }
        </div>

        <!-- Weight Slider -->
        <div class="bg-white p-4 rounded-2xl border border-gray-200/80 flex flex-col gap-2">
          <div class="flex items-center justify-between text-xs font-bold text-gray-700">
            <span class="flex items-center gap-1.5">
              <span>⚖️</span>
              <span>Select exact dog weight:</span>
            </span>
            <span class="text-sm font-black text-[#009055]">{{ state.dogWeightLbs() }} lbs</span>
          </div>
          <input
            type="range"
            min="5"
            max="120"
            step="5"
            [value]="state.dogWeightLbs()"
            (input)="onSliderInput($event)"
            class="w-full accent-[#009055] cursor-pointer h-2 bg-gray-200 rounded-lg"
            aria-label="Dog weight in pounds"
          />
          <div class="flex justify-between text-[10px] text-gray-600">
            <span>5 lbs (Toy)</span>
            <span>40 lbs (Medium)</span>
            <span>80 lbs (Large)</span>
            <span>120 lbs (Giant)</span>
          </div>
        </div>

        <!-- Calculated Result Card -->
        <div class="bg-[#19483C] text-white rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div class="flex items-center gap-3.5">
            <div class="w-14 h-14 rounded-2xl bg-[#009055] flex flex-col items-center justify-center font-black text-white shadow-inner flex-shrink-0">
              <span class="text-2xl leading-none">{{ state.dosageInfo().chewsPerDay }}</span>
              <span class="text-[9px] uppercase tracking-wider font-semibold">
                {{ state.dosageInfo().chewsPerDay === 1 ? 'chew' : 'chews' }}/day
              </span>
            </div>
            <div>
              <div class="font-bold text-sm sm:text-base">{{ state.dosageInfo().rangeText }}</div>
              <div class="text-xs text-emerald-200/80 mt-0.5">
                Common: {{ state.dosageInfo().sampleBreeds }}
              </div>
            </div>
          </div>
          <div class="flex items-center gap-3 text-xs border-t sm:border-t-0 sm:border-l border-emerald-700/60 pt-3 sm:pt-0 sm:pl-4">
            <div class="flex flex-col">
              <span class="text-emerald-300 font-medium">3-Tub Supply Lasts:</span>
              <span class="font-bold text-sm text-white flex items-center gap-1 mt-0.5">
                <span>📅</span>
                {{ state.dosageInfo().threeTubDuration }}
              </span>
            </div>
            <div class="flex flex-col pl-3 border-l border-emerald-700/60">
              <span class="text-emerald-300 font-medium">Daily Investment:</span>
              <span class="font-bold text-sm text-emerald-300 mt-0.5">
                {{ state.dosageInfo().dailyCost }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class DosageCalculator {
  readonly state = inject(PdpState);

  readonly quickTiers = [
    { label: 'Up to 30 lbs', val: 20 },
    { label: '31 – 60 lbs', val: 45 },
    { label: '61 – 90 lbs', val: 75 },
    { label: '91+ lbs', val: 105 },
  ];

  isTierSelected(val: number): boolean {
    const w = this.state.dogWeightLbs();
    if (val <= 30 && w <= 30) return true;
    if (val > 30 && val <= 60 && w > 30 && w <= 60) return true;
    if (val > 60 && val <= 90 && w > 60 && w <= 90) return true;
    if (val > 90 && w > 90) return true;
    return false;
  }

  onQuickSelect(weight: number) {
    this.state.setDogWeight(weight);
  }

  onSliderInput(event: Event) {
    const val = parseInt((event.target as HTMLInputElement).value, 10);
    this.state.setDogWeight(val);
  }
}
