import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-value-props-bar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section
      style="background-color: #000948; color: #D5E3EC;"
      class="value-props-bar w-full overflow-x-auto overflow-y-hidden py-3.5 lg:py-4 border-y border-[#000948] scrollbar-none"
    >
      <div class="max-w-[1440px] mx-auto px-[16px] lg:px-[24px]">
        <!-- Desktop & Mobile Row with all 6 authentic items -->
        <div class="flex items-center justify-between gap-6 lg:gap-4 min-w-max xl:min-w-0 xl:grid xl:grid-cols-6 text-left">
          
          <!-- 1. 90-Day Money Back Guarantee -->
          <div class="flex items-center gap-2.5 shrink-0">
            <span class="shrink-0 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 23 23" fill="none">
                <path d="M7.11364 0.75H0.75V21.75H21.75V0.75H15.3864M7.11364 0.75H15.3864M7.11364 0.75V7.75H15.3864V0.75M13.4773 16.6591H16.6591" stroke="#D5E3EC" stroke-width="1.5" stroke-linecap="round"></path>
              </svg>
            </span>
            <span class="font-[500] text-[13px] lg:text-[14px] leading-tight whitespace-nowrap">
              90-Day Money Back Guarantee
            </span>
          </div>

          <!-- 2. Made in USA -->
          <div class="flex items-center gap-2.5 shrink-0">
            <span class="shrink-0 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 23" fill="none">
                <path d="M11.8176 0.75L15.1692 7.75669L22.8851 8.77129L17.2407 14.1163L18.6577 21.75L11.8176 18.0467L4.97743 21.75L6.39446 14.1163L0.75 8.77129L8.4659 7.75669L11.8176 0.75Z" stroke="#D5E3EC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>
            </span>
            <span class="font-[500] text-[13px] lg:text-[14px] leading-tight whitespace-nowrap">
              Made in USA
            </span>
          </div>

          <!-- 3. GMP & SQF Certified -->
          <div class="flex items-center gap-2.5 shrink-0">
            <span class="shrink-0 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="22" viewBox="0 0 18 23" fill="none">
                <path d="M5.29054 5.29054H12.6689M5.29054 9.83108H12.6689M5.29054 14.3716H8.12838M0.75 0.75H17.2095V21.75H0.75V0.75Z" stroke="#D5E3EC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>
            </span>
            <span class="font-[500] text-[13px] lg:text-[14px] leading-tight whitespace-nowrap">
              GMP &amp; SQF Certified
            </span>
          </div>

          <!-- 4. Vet Formulated -->
          <div class="flex items-center gap-2.5 shrink-0">
            <span class="shrink-0 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 21 21" fill="none">
                <ellipse cx="13.7211" cy="11.4655" rx="1.04529" ry="1.04529" fill="#D5E3EC"></ellipse>
                <ellipse cx="7.28448" cy="11.4654" rx="1.05597" ry="1.05597" fill="#D5E3EC"></ellipse>
                <path d="M8.89258 14.3616H12.1106" stroke="#D5E3EC" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
                <path d="M6.72174 19.1884C4.50018 19.1884 2.69922 17.3874 2.69922 15.1659C2.69922 14.875 2.73011 14.5913 2.78876 14.3179L3.95883 9.18652" stroke="#D5E3EC" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
                <path d="M14.3092 19.1886H13.7199C11.9426 19.1886 10.5019 17.7479 10.5019 15.9706M10.5019 15.9706V14.3616M10.5019 15.9706C10.5019 17.7479 9.06113 19.1886 7.28386 19.1886H6.7207" stroke="#D5E3EC" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
                <path d="M17.7761 12.4614L18.2435 14.3181C18.3022 14.5915 18.3331 14.8751 18.3331 15.1661C18.3331 17.3876 16.5321 19.1886 14.3105 19.1886" stroke="#D5E3EC" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
                <path d="M14.0745 4.65054C13.0122 3.87672 11.9192 3.42017 10.5044 3.42017C9.07153 3.42017 7.98939 3.88839 6.91992 4.68018" stroke="#D5E3EC" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
                <path d="M5.65331 7.75371L7.18481 4.03384C7.42471 3.45114 7.30794 2.75616 6.83457 2.28279C6.20621 1.65443 5.18743 1.65443 4.55907 2.28279L1.7147 5.12716C0.772183 6.06968 0.772183 7.59784 1.7147 8.54036C2.65722 9.48288 4.18537 9.48288 5.12793 8.54036C5.36039 8.3079 5.53553 8.03983 5.65331 7.75371Z" stroke="#D5E3EC" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
                <path d="M15.3498 7.75351L13.8183 4.03359C13.5784 3.45089 13.6952 2.75592 14.1685 2.28255C14.7969 1.65419 15.8157 1.65419 16.444 2.28255L19.2884 5.12692C20.2309 6.06944 20.2309 7.59759 19.2884 8.54011C18.3459 9.48263 16.8177 9.48263 15.8752 8.54011C15.6427 8.30769 15.4676 8.03963 15.3498 7.75351Z" stroke="#D5E3EC" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>
            </span>
            <span class="font-[500] text-[13px] lg:text-[14px] leading-tight whitespace-nowrap">
              Vet Formulated
            </span>
          </div>

          <!-- 5. Third-Party Tested -->
          <div class="flex items-center gap-2.5 shrink-0">
            <span class="shrink-0 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 21 23" fill="none">
                <path d="M12.0753 2.89993L13.1503 3.97489M13.1503 3.97489L18.5251 9.34971M13.1503 3.97489L1.86316 15.262C0.378947 16.7462 0.378945 19.1526 1.86316 20.6368C3.34738 22.1211 5.75377 22.1211 7.23798 20.6368L18.5251 9.34971M18.5251 9.34971L19.6001 10.4247M5.07541 12.5746H14.7459M19.3309 5.3186V5.30785M18.5251 1.55622C18.5251 2.00149 18.1641 2.36245 17.7189 2.36245C17.2736 2.36245 16.9127 2.00149 16.9127 1.55622C16.9127 1.11096 17.2736 0.75 17.7189 0.75C18.1641 0.75 18.5251 1.11096 18.5251 1.55622ZM19.5997 5.3186C19.5997 5.46702 19.4793 5.58734 19.3309 5.58734C19.1825 5.58734 19.0622 5.46702 19.0622 5.3186C19.0622 5.17018 19.1825 5.04986 19.3309 5.04986C19.4793 5.04986 19.5997 5.17018 19.5997 5.3186Z" stroke="#D5E3EC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>
            </span>
            <span class="font-[500] text-[13px] lg:text-[14px] leading-tight whitespace-nowrap">
              Third-Party Tested
            </span>
          </div>

          <!-- 6. GMO, Hormone & Antibiotic Free -->
          <div class="flex items-center gap-2.5 shrink-0">
            <span class="shrink-0 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 21 21" fill="none">
                <circle cx="10.2015" cy="10.2015" r="9.45148" stroke="#D5E3EC" stroke-width="1.5"></circle>
                <line x1="3.99115" y1="16.4228" x2="16.8858" y2="3.52811" stroke="#D5E3EC" stroke-width="1.5"></line>
                <line y1="-0.75" x2="18.2358" y2="-0.75" transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 15.9785 16.9531)" stroke="#D5E3EC" stroke-width="1.5"></line>
              </svg>
            </span>
            <span class="font-[500] text-[13px] lg:text-[14px] leading-tight whitespace-nowrap">
              GMO, Hormone &amp; Antibiotic Free
            </span>
          </div>

        </div>
      </div>
    </section>
  `,
})
export class ValuePropsBar {}
