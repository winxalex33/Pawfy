import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { PdpState } from '../services/pdp-state';
import { VariantType } from '../models/pdp.model';

@Component({
  selector: 'app-split-testing-toolbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <aside aria-label="Dev tools" class="fixed bottom-4 left-4 z-50">
      @if (state.isDevToolbarOpen()) {
        <div class="bg-[#000948] text-white p-3.5 rounded-[16px] shadow-2xl border border-white/20 text-xs flex flex-col gap-2.5 min-w-[260px] animate-fadeIn">
          <div class="flex items-center justify-between pb-1.5 border-b border-white/10 font-bold">
            <span class="flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-[#009055] animate-ping"></span>
              A/B &amp; Telemetry Tools
            </span>
            <button
              type="button"
              (click)="state.isDevToolbarOpen.set(false)"
              class="text-white/60 hover:text-white cursor-pointer px-1 font-bold text-sm"
            >
              ✕
            </button>
          </div>

          <div class="flex items-center justify-between text-white/80">
            <span>Active Variant:</span>
            <span class="font-mono bg-[#009055] px-2 py-0.5 rounded text-[11px] uppercase font-bold text-white">
              {{ state.activeVariant() }}
            </span>
          </div>

          <!-- Quick Toggle Button -->
          <button
            type="button"
            (click)="toggleVariant()"
            class="w-full bg-white/15 hover:bg-white/25 text-white py-1.5 rounded-lg cursor-pointer transition text-[11px] font-semibold"
          >
            Switch to {{ state.activeVariant() === 'challenger' ? 'Control' : 'Challenger' }}
          </button>

          <!-- Split Ratio Slider -->
          <div class="bg-black/30 p-2 rounded-lg flex flex-col gap-1 text-[11px]">
            <div class="flex justify-between font-mono">
              <span class="text-white/70">Traffic Allocation:</span>
              <span class="text-emerald-300 font-bold">{{ state.splitRatio() }}% Challenger</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              [value]="state.splitRatio()"
              (input)="onRatioChange($event)"
              class="w-full accent-[#009055] cursor-pointer"
            />
          </div>

          <!-- Live Conversion Stats comparison -->
          <div class="bg-black/40 p-2 rounded-lg flex flex-col gap-1 text-[11px] font-mono border border-white/10">
            <div class="text-white/60 text-[10px] uppercase font-bold">Live Conversion Rate:</div>
            <div class="flex justify-between text-amber-300">
              <span>Control:</span>
              <span>{{ controlCr() }}% ({{ stats().control.conversions }}/{{ stats().control.impressions }})</span>
            </div>
            <div class="flex justify-between text-emerald-300 font-bold">
              <span>Challenger:</span>
              <span>{{ challengerCr() }}% ({{ stats().challenger.conversions }}/{{ stats().challenger.impressions }})</span>
            </div>
            <div class="text-right text-[10px] text-emerald-400 font-bold border-t border-white/10 pt-1 mt-0.5">
              Estimated Lift: +{{ lift() }}% CR
            </div>
          </div>

          <button
            type="button"
            (click)="state.isAnalyticsOpen.set(true)"
            class="w-full bg-white/15 hover:bg-white/25 text-white py-1.5 rounded-lg cursor-pointer transition text-[11px]"
          >
            📊 Open DataLayer Inspector
          </button>

          <button
            type="button"
            (click)="state.isPerformanceReportOpen.set(true)"
            class="w-full bg-white/15 hover:bg-white/25 text-white py-1.5 rounded-lg cursor-pointer transition text-[11px]"
          >
            ⚡ Open Core Web Vitals
          </button>
        </div>
      } @else {
        <button
          type="button"
          (click)="state.isDevToolbarOpen.set(true)"
          class="bg-[#000948]/90 hover:bg-[#000948] text-white text-[12px] px-3 py-1.5 rounded-full shadow-lg border border-white/20 flex items-center gap-2 cursor-pointer backdrop-blur-xs transition"
        >
          <span class="w-2 h-2 rounded-full bg-[#009055] animate-pulse"></span>
          <span class="font-bold">A/B Tools</span>
        </button>
      }
    </aside>
  `,
})
export class SplitTestingToolbar {
  readonly state = inject(PdpState);

  readonly stats = this.state.splitStats;

  readonly controlCr = computed(() => {
    const c = this.stats().control;
    return ((c.conversions / Math.max(1, c.impressions)) * 100).toFixed(2);
  });

  readonly challengerCr = computed(() => {
    const ch = this.stats().challenger;
    return ((ch.conversions / Math.max(1, ch.impressions)) * 100).toFixed(2);
  });

  readonly lift = computed(() => {
    const c = parseFloat(this.controlCr());
    const ch = parseFloat(this.challengerCr());
    return (((ch - c) / Math.max(0.1, c)) * 100).toFixed(1);
  });

  toggleVariant() {
    const next: VariantType = this.state.activeVariant() === 'challenger' ? 'control' : 'challenger';
    this.state.setVariant(next);
  }

  onRatioChange(e: Event) {
    const val = parseInt((e.target as HTMLInputElement).value, 10);
    this.state.setSplitRatio(val);
  }
}
