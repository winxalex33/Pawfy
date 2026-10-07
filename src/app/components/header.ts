import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="header w-full bg-[#edfef0] shadow relative z-30 border-b border-[#20254a]/10">
      <div class="max-w-[1440px] w-full mx-auto px-[16px] lg:px-[30px] flex justify-between items-center py-2.5 lg:py-3.5">
        <!-- Logo -->
        <div class="header__logo">
          <a href="https://pawfy.com/" aria-label="Pawfy Home" class="inline-block">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 468 171.65"
              class="w-[95px] lg:w-[125px] h-[34px] lg:h-[45px]"
            >
              <g data-name="Layer 2">
                <g data-name="Layer 2">
                  <path
                    fill="#20254a"
                    d="M49,77.55c14.88,0,23.11-11.55,23.11-26.26,0-23.81-14.18-36.76-28.18-36.76H39.21c-3.68,0-5.77,2.63-5.77,7.53V69.67c0,4.9,2.1,7.88,7.53,7.88ZM0,125.34v-.7c0-4,6.83-5.78,6.83-13.13V20.83C6.83,13.65,0,11.9,0,7.53v-.7C0,5.08,1.58,4,4,4H43.94c31,0,55.67,11.55,55.67,41C99.6,71.42,80,87.88,49,87.88H33.43v23.63c0,7.35,7.53,9.1,7.53,13.13v.7c0,1.75-1.57,3-4,3H4c-2.45,0-4-1.23-4-3"
                  />
                  <path
                    fill="#20254a"
                    d="M311,47.09V48c0,4.38-6.83,5.43-9.63,13.3l-22.58,62.84c-1,3-2.62,4.2-5.6,4.2H267.4c-3.15,0-4.9-1.23-5.78-4.2L245.52,72.3l-16.28,51.82c-1,3-2.8,4.2-5.78,4.2h-4c-3,0-4.55-1.23-5.6-4.2L188.28,61.27c-3-7.35-8.4-9.1-8.4-13.3v-.87c0-1.75,1.4-2.8,3.5-2.8h31.16c2.1,0,3.33,1.22,3.33,3V48c0,4.2-8.23,4.9-5.25,13.65l14,41.14L242.9,48.31c.7-2.1,1.75-3.33,4-3.33l9.63-.18c2.27,0,3.33,1.05,4,3.15l15.93,54.79L290,63.89c3.68-10.68-7-11.55-7-15.93v-.7c0-1.75,1.4-3,3.5-3h21c2.27,0,3.5,1.05,3.5,2.8"
                  />
                  <path
                    fill="#20254a"
                    d="M464.5,44.29H443.14c-2.28,0-3.68,1.23-3.68,3V48c0,4.38,12.25,5.43,7.7,16.46l-18.91,41.17L407.78,62c-3.85-9.1,2.63-9.63,2.63-14v-.7a3,3,0,0,0-3.33-3H353.23c-4.55-13.48-8.75-36.93,3.85-36.93,13.65.18,2.63,22.23,21.7,22.23,6.65,0,9.8-4.9,9.8-9.1,0-11-11.9-20.48-26.43-20.48-22.93,0-33.61,14.7-33.61,33.26v11h-6.4a3.55,3.55,0,0,0-3.67,3.5v3.33a3.41,3.41,0,0,0,3.67,3.33h6.4v56.89c0,7.53-7,8.93-7,13.3v.7c0,1.75,1.4,3,3.67,3h34.14a3,3,0,0,0,3.32-3v-.7c0-4.37-8.75-5.77-8.75-13.3V54.44h12.18a17.63,17.63,0,0,1,15.9,10l29.11,60.74a14.45,14.45,0,0,1-1.34,14.89L390,167a2.94,2.94,0,0,0,2.37,4.68H405.9a4.38,4.38,0,0,0,4-2.57c3.09-6.81,11.57-25.48,16.09-35.52l33.08-71.95c3.5-7.7,8.93-9.28,8.93-13.65v-.87c0-1.75-1.4-2.8-3.5-2.8"
                  />
                  <path
                    fill="#20254a"
                    d="M144.2,121.84c-9.07,0-17.32-10.94-14.43-22.87,3.35-13.83,23.47-18.45,25.14-18.81v0l.18,2.1,1.59,17c.06.4.12.79.16,1.2l.53,6.13c.53,8-5,15.23-13.16,15.23m40.64-1.67c-1.19-10.54-4.9-41.75-4.9-41.75-2.45-22.05-17.85-35.88-40.61-35.88-18.21,0-33.61,7.35-33.61,20,0,6,4.2,9.8,10.5,9.8,13.13,0,9.1-22.41,23.11-22.41,9.41,0,12.7,7.63,14.79,23.47-19.3,2.52-50.68,6.85-50.68,29.7,0,17.79,14.24,26.87,33.45,26.87,12.19,0,19.64-4.39,23.58-10.2l0,.18c1.06,6,2.34,9.45,8.53,9.45h9.43c6.1,0,6.94-4.06,6.36-9.2"
                  />
                </g>
              </g>
            </svg>
          </a>
        </div>

        <!-- Navigation links matching offer.pawfy.com -->
        <nav class="header__nav flex items-center">
          <ul class="hidden min-[1221px]:flex items-center gap-0 text-[13px] font-[500] uppercase tracking-[0.1em] text-[#20254a]">
            <li><a href="https://pawfy.com/pages/shop" class="px-3 xl:px-4 py-2 hover:text-[#009055] transition">SHOP</a></li>
            <li><a href="https://pawfy.com/pages/reviews" class="px-3 xl:px-4 py-2 hover:text-[#009055] transition">REVIEWS</a></li>
            <li><a href="https://pawfy.com/pages/faq" class="px-3 xl:px-4 py-2 hover:text-[#009055] transition">FAQ</a></li>
            <li><a href="https://pawfy.com/pages/about-us" class="px-3 xl:px-4 py-2 hover:text-[#009055] transition">OUR STORY</a></li>
            <li><a href="https://pawfy.com/pages/contact-us" class="px-3 xl:px-4 py-2 hover:text-[#009055] transition">CONTACT US</a></li>
            <li><a href="https://pawfy.com/tools/recurring/get-subscription-access" class="px-3 xl:px-4 py-2 hover:text-[#009055] transition">My Subscriptions</a></li>
          </ul>

          <!-- Mobile / tablet menu toggle (<= 1220px) without any extraneous shipping pill -->
          <button
            type="button"
            (click)="mobileMenuOpen.set(!mobileMenuOpen())"
            class="min-[1221px]:hidden p-1.5 text-[#20254a] cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            <img
              src="https://cdn.shopify.com/s/files/1/0506/0424/5166/files/menu.svg"
              alt="Menu"
              width="22"
              height="22"
              class="w-[22px] h-[22px]"
            />
          </button>
        </nav>
      </div>

      <!-- Mobile dropdown -->
      @if (mobileMenuOpen()) {
        <div class="min-[1221px]:hidden bg-white border-t border-[#20254a]/10 px-5 py-4 flex flex-col gap-2.5 text-[14px] font-[500] uppercase tracking-[0.1em] text-[#20254a]">
          <a (click)="mobileMenuOpen.set(false)" href="https://pawfy.com/pages/shop" class="py-1 hover:text-[#009055]">SHOP</a>
          <a (click)="mobileMenuOpen.set(false)" href="https://pawfy.com/pages/reviews" class="py-1 hover:text-[#009055]">REVIEWS</a>
          <a (click)="mobileMenuOpen.set(false)" href="https://pawfy.com/pages/faq" class="py-1 hover:text-[#009055]">FAQ</a>
          <a (click)="mobileMenuOpen.set(false)" href="https://pawfy.com/pages/about-us" class="py-1 hover:text-[#009055]">OUR STORY</a>
          <a (click)="mobileMenuOpen.set(false)" href="https://pawfy.com/pages/contact-us" class="py-1 hover:text-[#009055]">CONTACT US</a>
          <a (click)="mobileMenuOpen.set(false)" href="https://pawfy.com/tools/recurring/get-subscription-access" class="py-1 hover:text-[#009055] normal-case">My Subscriptions</a>
        </div>
      }
    </header>
  `,
})
export class HeaderSection {
  readonly mobileMenuOpen = signal<boolean>(false);
}
