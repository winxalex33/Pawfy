import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'app-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="w-full bg-[#080C26] text-white pt-[60px] pb-[40px] px-4">
      <div class="max-w-[1300px] mx-auto">
        <!-- Top 4 Columns Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-white/10 text-left">
          <!-- Column 1: Need Help? -->
          <div>
            <h4 class="font-[600] text-[15px] sm:text-[16px] mb-4 text-white">
              Need Help?
            </h4>
            <ul class="space-y-2 text-[13px] text-white/70">
              <li>
                <a href="#faq" class="hover:text-white transition">FAQ</a>
              </li>
              <li>
                <a href="https://pawfy.com/tools/recurring/get-subscription-access" class="hover:text-white transition">Manage Subscriptions</a>
              </li>
              <li>
                <a href="https://pawfy.com/pages/contact-us" class="hover:text-white transition">Contact Us</a>
              </li>
            </ul>
          </div>

          <!-- Column 2: Our Products -->
          <div>
            <h4 class="font-[600] text-[15px] sm:text-[16px] mb-4 text-white">
              Our Products
            </h4>
            <ul class="space-y-2 text-[13px] text-white/70">
              <li>
                <a href="#product-atf" class="hover:text-white transition">Metabolic Complex</a>
              </li>
              <li>
                <a href="https://pawfy.com/pages/shop" class="hover:text-white transition">All Dog Supplements</a>
              </li>
              <li>
                <a href="https://pawfy.com/pages/shop" class="hover:text-white transition">Dental Health Wash</a>
              </li>
            </ul>
          </div>

          <!-- Column 3: About Us -->
          <div>
            <h4 class="font-[600] text-[15px] sm:text-[16px] mb-4 text-white">
              About Us
            </h4>
            <ul class="space-y-2 text-[13px] text-white/70">
              <li>
                <a href="#owner-reviews" class="hover:text-white transition">Customer Reviews</a>
              </li>
              <li>
                <a href="#benefits" class="hover:text-white transition">Our Story &amp; Vets</a>
              </li>
              <li>
                <a href="https://pawfy.com/pages/mission" class="hover:text-white transition">Giving Back Initiative</a>
              </li>
            </ul>
          </div>

          <!-- Column 4: Newsletter Form -->
          <div>
            <h4 class="font-[600] text-[15px] sm:text-[16px] mb-4 text-white">
              Get 10% off your first order
            </h4>
            @if (subscribed()) {
              <p class="text-[13px] text-[#34D399] font-[500]">
                ✓ Thank you for subscribing!
              </p>
            } @else {
              <form (submit)="onSubscribe($event)" class="flex flex-col gap-2.5">
                <input
                  type="email"
                  [value]="email()"
                  (input)="email.set($any($event.target).value)"
                  placeholder="Enter your email"
                  required
                  class="w-full bg-white text-[#000948] px-4 py-2.5 rounded-full text-[13px] outline-none focus:ring-2 focus:ring-[#009055]"
                />
                <button
                  type="submit"
                  class="w-full bg-[#E5E5FD] hover:bg-white text-[#000948] font-[700] text-[12px] uppercase tracking-wider py-2.5 rounded-full transition cursor-pointer"
                >
                  SUBSCRIBE
                </button>
              </form>
            }
          </div>
        </div>

        <!-- Bottom Bar: Social, Pawfy Logo, Legal -->
        <div class="pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <!-- Social Icons -->
          <div class="flex items-center gap-4 text-white/70 text-lg order-2 md:order-1">
            <a href="https://facebook.com/pawfy" aria-label="Facebook" class="hover:text-white transition">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="https://instagram.com/pawfy" aria-label="Instagram" class="hover:text-white transition">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href="https://tiktok.com/@pawfy" aria-label="TikTok" class="hover:text-white transition">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.86.12V9.32a6.34 6.34 0 0 0-.86-.06 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.58a8.28 8.28 0 0 0 3.77.9V6.69z"/>
              </svg>
            </a>
          </div>

          <!-- Centered Brand Logo -->
          <div class="order-1 md:order-2">
            <span class="font-recoleta text-3xl sm:text-4xl text-white font-bold tracking-tight">
              Pawfy
            </span>
          </div>

          <!-- Legal / Copyright -->
          <div class="text-[11px] text-white/50 text-center md:text-right order-3">
            <div class="flex justify-center md:justify-end gap-3 mb-1">
              <a href="https://pawfy.com/pages/privacy-policy" class="hover:underline">Privacy Policy</a>
              <span>•</span>
              <a href="https://pawfy.com/pages/terms-conditions" class="hover:underline">Terms &amp; Conditions</a>
            </div>
            <p>Copyright © 2026 Pawfy. All rights reserved. Pawfy Inc. Raleigh, NC, USA.</p>
          </div>
        </div>
      </div>
    </footer>
  `,
})
export class FooterSection {
  readonly email = signal('');
  readonly subscribed = signal(false);

  onSubscribe(e: Event) {
    e.preventDefault();
    if (this.email()) {
      this.subscribed.set(true);
    }
  }
}
