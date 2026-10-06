import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { PdpState } from '../services/pdp-state';
import { AnalyticsEvent } from '../models/pdp.model';

@Component({
  selector: 'app-analytics-inspector',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (state.isAnalyticsOpen()) {
      <div
        class="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex justify-end animate-fadeIn"
        role="dialog"
        aria-modal="true"
        aria-label="Analytics DataLayer Inspector"
      >
        <div class="w-full max-w-xl bg-[#121820] text-gray-200 h-full shadow-2xl flex flex-col border-l border-gray-800">
          <!-- Header -->
          <div class="p-4 bg-[#19232F] border-b border-gray-800 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="text-emerald-400 font-bold">⚡</span>
              <div>
                <h2 class="font-bold text-sm text-white flex items-center gap-2">
                  <span>Analytics DataLayer Inspector</span>
                  <span class="text-[10px] bg-emerald-950 text-emerald-300 font-mono px-2 py-0.5 rounded border border-emerald-800">
                    {{ state.analyticsLogs().length }} Events
                  </span>
                </h2>
                <p class="text-[11px] text-gray-400">
                  Live stream mirroring <code class="font-mono text-emerald-300">window.dataLayer</code>
                </p>
              </div>
            </div>
            <div class="flex items-center gap-1">
              <button
                type="button"
                (click)="state.clearAnalytics()"
                class="p-1.5 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-red-400 transition cursor-pointer text-xs"
                title="Clear event logs"
              >
                Clear
              </button>
              <button
                type="button"
                (click)="closeInspector()"
                class="p-1.5 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition cursor-pointer text-base font-bold"
                aria-label="Close inspector"
              >
                ✕
              </button>
            </div>
          </div>

          <!-- Toolbar -->
          <div class="px-4 py-2 bg-[#151c24] border-b border-gray-800 flex items-center justify-between text-xs">
            <button
              type="button"
              (click)="dispatchPing()"
              class="text-[11px] font-semibold text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>+ Dispatch Test Ping Event</span>
            </button>
            <button
              type="button"
              (click)="copyAllJson()"
              class="flex items-center gap-1 px-2.5 py-1 rounded bg-gray-800 hover:bg-gray-700 text-[11px] font-medium transition cursor-pointer"
            >
              <span>{{ copied() ? '✓ Copied All JSON' : '📋 Export All Events' }}</span>
            </button>
          </div>

          <!-- Body Split -->
          <div class="flex-1 flex flex-col md:flex-row overflow-hidden">
            <!-- Events List -->
            <div class="flex-1 overflow-y-auto divide-y divide-gray-800/80">
              @if (state.analyticsLogs().length === 0) {
                <div class="p-8 text-center text-xs text-gray-500">
                  No events recorded yet. Interact with the page (change plan, browse gallery, click CTA) to view events.
                </div>
              } @else {
                @for (log of state.analyticsLogs(); track log.id) {
                  <button
                    type="button"
                    (click)="selectedEvent.set(log)"
                    class="w-full p-3 text-left transition flex flex-col gap-1 cursor-pointer hover:bg-gray-800/40"
                    [class.bg-emerald-950/40]="selectedEvent()?.id === log.id"
                    [class.border-l-4]="selectedEvent()?.id === log.id"
                    [class.border-emerald-400]="selectedEvent()?.id === log.id"
                  >
                    <div class="flex items-center justify-between text-[11px]">
                      <span class="font-mono font-bold text-emerald-300 truncate">
                        {{ log.event }}
                      </span>
                      <span class="text-gray-500 text-[10px] font-mono">
                        {{ formatTime(log.timestamp) }}
                      </span>
                    </div>
                    <div class="text-[10px] text-gray-400 font-mono truncate">
                      {{ formatSnippet(log.properties) }}
                    </div>
                  </button>
                }
              }
            </div>

            <!-- Selected Event Details Panel -->
            @if (selectedEvent(); as event) {
              <div class="w-full md:w-72 bg-[#0d1217] border-t md:border-t-0 md:border-l border-gray-800 p-3 overflow-y-auto flex flex-col gap-2 text-xs">
                <div class="flex items-center justify-between border-b border-gray-800 pb-2">
                  <span class="font-mono font-bold text-emerald-300 text-xs truncate">
                    {{ event.event }}
                  </span>
                  <button
                    type="button"
                    (click)="selectedEvent.set(null)"
                    class="text-gray-400 hover:text-white cursor-pointer font-bold"
                  >
                    ✕
                  </button>
                </div>
                <span class="text-[10px] text-gray-500 font-mono">
                  {{ event.timestamp }}
                </span>
                <div class="font-mono text-[11px] text-gray-300 bg-black/40 p-2.5 rounded-lg border border-gray-800 overflow-x-auto">
                  <pre>{{ formatJson(event.properties) }}</pre>
                </div>
              </div>
            }
          </div>

          <!-- Footer info -->
          <div class="p-3 bg-[#19232F] border-t border-gray-800 text-[11px] text-gray-400 flex items-center justify-between">
            <span>Standard E-Commerce GA4 / Shopify Schema</span>
            <span class="text-emerald-400 font-mono font-bold">100% Client-Side Safe</span>
          </div>
        </div>
      </div>
    }
  `,
})
export class AnalyticsInspector {
  readonly state = inject(PdpState);

  readonly selectedEvent = signal<AnalyticsEvent | null>(null);
  readonly copied = signal(false);

  closeInspector() {
    this.state.isAnalyticsOpen.set(false);
  }

  dispatchPing() {
    this.state.trackEvent('test_ping_event', {
      source: 'AnalyticsInspector',
      time: Date.now(),
      status: 'active',
    });
  }

  copyAllJson() {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(JSON.stringify(this.state.analyticsLogs(), null, 2));
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    }
  }

  formatTime(iso: string): string {
    try {
      return new Date(iso).toLocaleTimeString();
    } catch {
      return iso;
    }
  }

  formatSnippet(props: Record<string, unknown>): string {
    return JSON.stringify(props).slice(0, 70) + '...';
  }

  formatJson(props: Record<string, unknown>): string {
    return JSON.stringify(props, null, 2);
  }
}
