import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-countdown-banner',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <aside aria-label="Autumn Sale banner" class="w-full bg-[#163e2e] text-white py-2 sm:py-2.5 px-4 z-40 border-b border-[#0d2a1e]">
      <div class="max-w-[1440px] mx-auto flex items-center justify-between">
        <!-- Left Side: Sale Headline & Subtext -->
        <div class="text-left">
          <div class="font-[700] text-[13px] sm:text-[15px] lg:text-[16px] tracking-wide text-white uppercase flex items-center gap-1.5">
            <span>AUTUMN SALE NOW LIVE</span>
            <span>⚡</span>
          </div>
          <div class="text-[11px] sm:text-[12px] text-[#A3E5C8] font-[500] leading-none mt-0.5">
            Save 35% + FREE GIFT
          </div>
        </div>

        <!-- Right Side: Exact Countdown Display -->
        <div class="bg-[#009055] rounded-[6px] px-2.5 sm:px-3.5 py-1 text-center shadow-xs">
          <div class="font-mono font-[700] text-[13px] sm:text-[15px] tracking-wider text-white">
            {{ format(days()) }} : {{ format(hours()) }} : {{ format(minutes()) }} : {{ format(seconds()) }}
          </div>
          <div class="flex justify-between text-[7px] sm:text-[8px] font-[600] text-white/90 uppercase tracking-widest mt-0.5 px-0.5">
            <span>DAYS</span>
            <span>HRS</span>
            <span>MINS</span>
            <span>SECS</span>
          </div>
        </div>
      </div>
    </aside>
  `,
})
export class CountdownBanner implements OnInit, OnDestroy {
  readonly days = signal(3);
  readonly hours = signal(59);
  readonly minutes = signal(55);
  readonly seconds = signal(40);

  private timerId?: ReturnType<typeof setInterval>;

  ngOnInit() {
    this.timerId = setInterval(() => {
      const s = this.seconds();
      if (s > 0) {
        this.seconds.set(s - 1);
      } else {
        const m = this.minutes();
        if (m > 0) {
          this.minutes.set(m - 1);
          this.seconds.set(59);
        } else {
          const h = this.hours();
          if (h > 0) {
            this.hours.set(h - 1);
            this.minutes.set(59);
            this.seconds.set(59);
          } else {
            const d = this.days();
            if (d > 0) {
              this.days.set(d - 1);
              this.hours.set(23);
              this.minutes.set(59);
              this.seconds.set(59);
            }
          }
        }
      }
    }, 1000);
  }

  ngOnDestroy() {
    if (this.timerId) {
      clearInterval(this.timerId);
    }
  }

  format(n: number): string {
    return n.toString().padStart(2, '0');
  }
}
