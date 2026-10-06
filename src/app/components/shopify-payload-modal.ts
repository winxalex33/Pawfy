import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { PdpState } from '../services/pdp-state';

@Component({
  selector: 'app-shopify-payload-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (state.isPayloadModalOpen()) {
      <div
        class="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-payload-title"
      >
        <div class="relative max-w-2xl w-full bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col my-auto max-h-[92vh]">
          <!-- Modal Header -->
          <div class="bg-[#19483C] text-white p-5 sm:p-6 flex items-center justify-between border-b border-emerald-800">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-[#009055] flex items-center justify-center text-white shadow-inner">
                <span>🛍️</span>
              </div>
              <div>
                <h2 id="modal-payload-title" class="text-lg sm:text-xl font-bold flex items-center gap-2">
                  <span>Shopify Add-To-Cart Payload</span>
                  <span class="text-xs bg-emerald-500/30 text-emerald-200 px-2 py-0.5 rounded-full font-mono">
                    POST /cart/add.js
                  </span>
                </h2>
                <p class="text-xs text-emerald-200/80 mt-0.5">
                  Target Offer: <code class="font-mono">offer.pawfy.com/pdp-fresh-mtc-b</code>
                </p>
              </div>
            </div>
            <button
              type="button"
              (click)="closeModal()"
              class="p-2 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition cursor-pointer text-xl font-bold"
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>

          <!-- Tab Selector -->
          <div class="bg-gray-100 px-6 pt-3 flex gap-2 border-b border-gray-200 text-xs sm:text-sm font-semibold overflow-x-auto">
            <button
              type="button"
              (click)="activeTab.set('json')"
              class="pb-3 px-3 border-b-2 transition cursor-pointer"
              [class.border-[#009055]]="activeTab() === 'json'"
              [class.text-[#19483C]]="activeTab() === 'json'"
              [class.font-bold]="activeTab() === 'json'"
              [class.border-transparent]="activeTab() !== 'json'"
              [class.text-gray-500]="activeTab() !== 'json'"
            >
              JSON Payload
            </button>
            <button
              type="button"
              (click)="activeTab.set('table')"
              class="pb-3 px-3 border-b-2 transition cursor-pointer"
              [class.border-[#009055]]="activeTab() === 'table'"
              [class.text-[#19483C]]="activeTab() === 'table'"
              [class.font-bold]="activeTab() === 'table'"
              [class.border-transparent]="activeTab() !== 'table'"
              [class.text-gray-500]="activeTab() !== 'table'"
            >
              Line Items Breakdown
            </button>
            <button
              type="button"
              (click)="activeTab.set('curl')"
              class="pb-3 px-3 border-b-2 transition cursor-pointer"
              [class.border-[#009055]]="activeTab() === 'curl'"
              [class.text-[#19483C]]="activeTab() === 'curl'"
              [class.font-bold]="activeTab() === 'curl'"
              [class.border-transparent]="activeTab() !== 'curl'"
              [class.text-gray-500]="activeTab() !== 'curl'"
            >
              cURL Request
            </button>
            <button
              type="button"
              (click)="activeTab.set('checkout')"
              class="pb-3 px-3 border-b-2 transition cursor-pointer"
              [class.border-[#009055]]="activeTab() === 'checkout'"
              [class.text-[#19483C]]="activeTab() === 'checkout'"
              [class.font-bold]="activeTab() === 'checkout'"
              [class.border-transparent]="activeTab() !== 'checkout'"
              [class.text-gray-500]="activeTab() !== 'checkout'"
            >
              Simulate Checkout Flow
            </button>
          </div>

          <!-- Modal Body -->
          <div class="p-6 overflow-y-auto flex-1">
            @if (activeTab() === 'json') {
              <div class="flex flex-col gap-3">
                <div class="flex items-center justify-between text-xs text-gray-600">
                  <span>Exact JSON dispatched to Shopify storefront:</span>
                  <button
                    type="button"
                    (click)="copyPayload()"
                    class="flex items-center gap-1.5 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg font-semibold text-gray-700 transition cursor-pointer"
                  >
                    <span>{{ isCopied() ? '✓ Copied to Clipboard!' : '📋 Copy JSON' }}</span>
                  </button>
                </div>
                <pre class="bg-[#121820] text-emerald-300 p-4 rounded-xl text-xs font-mono overflow-x-auto leading-relaxed border border-gray-800 shadow-inner">{{ payloadString() }}</pre>
              </div>
            }

            @if (activeTab() === 'table') {
              <div class="flex flex-col gap-4 text-xs sm:text-sm">
                <div class="border border-gray-200 rounded-xl overflow-hidden">
                  <table class="w-full text-left border-collapse">
                    <thead class="bg-gray-50 border-b border-gray-200 text-gray-600 font-semibold text-xs">
                      <tr>
                        <th class="p-3">Item / Variant</th>
                        <th class="p-3">Qty</th>
                        <th class="p-3">Type</th>
                        <th class="p-3">Total Value</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100">
                      <tr>
                        <td class="p-3">
                          <div class="font-bold text-gray-900">{{ state.selectedPlan().title }}</div>
                          <div class="text-xs text-gray-500 font-mono">ID: 47918395785390</div>
                        </td>
                        <td class="p-3 font-semibold">{{ state.selectedPlan().quantity }}</td>
                        <td class="p-3">
                          <span class="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-xs font-semibold">
                            ReCharge Subscription
                          </span>
                        </td>
                        <td class="p-3 font-bold text-gray-900">\${{ state.selectedPlan().discountedPrice.toFixed(2) }}</td>
                      </tr>
                      @if (state.selectedPlan().freeGift) {
                        <tr class="bg-emerald-50/40">
                          <td class="p-3">
                            <div class="font-bold text-emerald-900">Pawfy Dental Wash (8 fl oz)</div>
                            <div class="text-xs text-gray-500 font-mono">ID: 45054690164910</div>
                          </td>
                          <td class="p-3 font-semibold">1</td>
                          <td class="p-3">
                            <span class="bg-[#009055] text-white px-2 py-0.5 rounded text-xs font-bold">
                              FREE GIFT
                            </span>
                          </td>
                          <td class="p-3 font-bold text-emerald-700">
                            <span class="line-through text-gray-400 mr-1 text-xs">$25.00</span>
                            $0.00
                          </td>
                        </tr>
                      }
                    </tbody>
                  </table>
                </div>
                <div class="bg-amber-50 border border-amber-200 p-3 rounded-xl text-amber-900 text-xs">
                  <strong>Discount Details:</strong> Auto-applied promo code
                  <code class="bg-amber-100 px-1 py-0.5 rounded font-mono">DZTVBXMTCVTZKH4</code> (35% OFF),
                  Shipping and product details are included with your order.
                </div>
              </div>
            }

            @if (activeTab() === 'curl') {
              <div class="flex flex-col gap-3">
                <div class="flex items-center justify-between text-xs text-gray-600">
                  <span class="font-semibold">Terminal cURL invocation:</span>
                  <button
                    type="button"
                    (click)="copyCurl()"
                    class="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 rounded font-semibold text-xs text-gray-700 cursor-pointer"
                  >
                    <span>{{ isCopied() ? '✓ Copied!' : '📋 Copy cURL' }}</span>
                  </button>
                </div>
                <pre class="bg-[#121820] text-emerald-400 p-4 rounded-xl text-xs font-mono overflow-x-auto leading-relaxed border border-gray-800">{{ curlString() }}</pre>
              </div>
            }

            @if (activeTab() === 'checkout') {
              <div class="flex flex-col items-center justify-center py-4 text-center">
                @if (orderComplete()) {
                  <div class="flex flex-col items-center gap-3 animate-fadeIn">
                    <div class="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-3xl font-bold">
                      ✓
                    </div>
                    <h3 class="text-xl font-bold text-gray-900">Order Simulated Successfully!</h3>
                    <p class="text-sm text-gray-600 max-w-md">
                      Order confirmation event fired into <code class="font-mono bg-gray-100 px-1 py-0.5 rounded">window.dataLayer</code>.
                    </p>
                    <button
                      type="button"
                      (click)="orderComplete.set(false)"
                      class="mt-2 text-xs text-emerald-700 underline font-semibold cursor-pointer"
                    >
                      Reset Simulation
                    </button>
                  </div>
                } @else {
                  <div class="flex flex-col items-center gap-3 max-w-md">
                    <div class="w-12 h-12 rounded-full bg-[#19483C]/10 text-[#19483C] flex items-center justify-center text-2xl">
                      🚀
                    </div>
                    <h3 class="text-lg font-bold text-gray-900">Simulate Shopify Checkout Redirection</h3>
                    <p class="text-xs text-gray-600">
                      Click below to trigger a simulated successful Shopify checkout with the configured payload, line item properties, and conversion tracking event.
                    </p>
                    <button
                      type="button"
                      (click)="simulateCheckout()"
                      [disabled]="isSimulatingOrder()"
                      class="w-full py-3 px-6 rounded-xl bg-[#009055] hover:bg-[#007b48] text-white font-bold text-sm tracking-wide shadow-md transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      @if (isSimulatingOrder()) {
                        <span>Redirecting to Shopify Checkout...</span>
                      } @else {
                        <span>Complete Simulated Order (\${{ state.selectedPlan().discountedPrice.toFixed(2) }}) →</span>
                      }
                    </button>
                  </div>
                }
              </div>
            }
          </div>

          <!-- Modal Footer -->
          <div class="bg-gray-50 p-4 border-t border-gray-200 flex items-center justify-between text-xs text-gray-600">
            <div class="flex items-center gap-1.5 text-emerald-800 font-semibold">
              <span>🛡️</span>
              <span>Ready for Shopify / ReCharge Integration</span>
            </div>
            <button
              type="button"
              (click)="closeModal()"
              class="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold transition cursor-pointer"
            >
              Close Inspector
            </button>
          </div>
        </div>
      </div>
    }
  `,
})
export class ShopifyPayloadModal {
  readonly state = inject(PdpState);

  readonly activeTab = signal<'json' | 'table' | 'curl' | 'checkout'>('json');
  readonly isCopied = signal(false);
  readonly isSimulatingOrder = signal(false);
  readonly orderComplete = signal(false);

  readonly payloadString = computed(() => {
    const plan = this.state.selectedPlan();
    const isSub = this.state.isSubscription();
    const mainLineProperties: Record<string, string> = {
      _product_handle: 'metabolic-complex',
      _plan_title: plan.title,
      _plan_id: plan.id,
      _per_day_cost: `$${plan.perDayPrice.toFixed(2)}`,
      _dollar_savings: `$${plan.dollarSavings.toFixed(2)}`,
      _discount_code: 'DZTVBXMTCVTZKH4',
      _source_url: 'https://offer.pawfy.com/pdp-fresh-mtc-b',
      _timestamp: new Date().toISOString(),
    };

    if (plan.freeGift) {
      mainLineProperties['_gift_variant_id'] = '45054690164910';
      mainLineProperties['_gift_name'] = 'Pawfy Dental Wash (8 fl oz)';
    }

    const items: Record<string, unknown>[] = [
      {
        id: 47918395785390,
        quantity: plan.quantity,
        ...(isSub ? { selling_plan: 688921820422 } : {}),
        properties: mainLineProperties,
      },
    ];

    if (plan.freeGift) {
      items.push({
        id: 45054690164910,
        quantity: 1,
        properties: {
          _is_free_gift: 'true',
          _parent_product_id: '47918395785390',
          _applied_gift_discount: 'P1X77SH3MTKG',
          _retail_value: '$25.00',
        },
      });
    }

    return JSON.stringify({ items }, null, 2);
  });

  readonly curlString = computed(() => {
    return `curl -X POST https://shop.pawfy.com/cart/add.js \\
  -H "Content-Type: application/json" \\
  -H "Accept: application/json" \\
  -d '${this.payloadString().replace(/\n/g, '')}'`;
  });

  closeModal() {
    this.state.isPayloadModalOpen.set(false);
  }

  copyPayload() {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(this.payloadString());
      this.isCopied.set(true);
      setTimeout(() => this.isCopied.set(false), 2000);
      this.state.trackEvent('payload_copied', { plan_id: this.state.selectedPlan().id });
    }
  }

  copyCurl() {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(this.curlString());
      this.isCopied.set(true);
      setTimeout(() => this.isCopied.set(false), 2000);
    }
  }

  simulateCheckout() {
    this.isSimulatingOrder.set(true);
    const plan = this.state.selectedPlan();
    this.state.trackEvent('simulate_checkout_click', {
      plan_id: plan.id,
      amount: plan.discountedPrice,
    });

    setTimeout(() => {
      this.isSimulatingOrder.set(false);
      this.orderComplete.set(true);
      this.state.trackEvent('checkout_success_simulated', {
        order_id: 'PAWFY-' + Math.floor(100000 + Math.random() * 900000),
        amount: plan.discountedPrice,
      });
    }, 1200);
  }
}
