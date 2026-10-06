import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-compare-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section
      id="compare"
      class="overflow-hidden relative py-[60px] lg:py-[90px] scroll-mt-[120px] bg-[#DCEBF2]"
    >
      <!-- Background chews image container from original site -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none select-none">
        <!-- Desktop chews canvas: anchored object-left so chews are positioned on the left under and beside the frosted table -->
        <picture class="hidden md:block absolute inset-0 w-full h-full">
          <source type="image/webp" srcset="/what-sets-pawfy-apart-bg.webp" />
          <img
            src="https://cdn.shopify.com/s/files/1/0533/0970/2320/files/d0c17d8a9492ea6357b70f54c3dfa5b7cf4aa3ef_1.jpg?v=1782251067"
            alt=""
            aria-hidden="true"
            loading="eager"
            decoding="async"
            class="w-full h-full object-cover object-left"
          />
        </picture>
        <!-- Mobile chews canvas -->
        <img
          src="https://cdn.shopify.com/s/files/1/0506/0424/5166/files/mobile-chews_1_1.png?v=1785256858"
          alt=""
          aria-hidden="true"
          loading="eager"
          decoding="async"
          class="w-full h-full object-cover object-left md:hidden absolute inset-0"
        />
      </div>

      <div class="relative z-10 max-w-[1420px] mx-auto py-[20px] lg:py-[40px] pb-[80px] lg:pb-[100px]">
        <!-- Section Heading -->
        <div class="relative px-[16px] lg:px-[30px] max-w-[960px] mx-auto text-center mb-[30px] sm:mb-[50px]">
          <h2 class="font-recoleta text-[32px] sm:text-[44px] lg:text-[54px] font-[500] leading-[115%] text-[#000948]">
            What Sets Pawfy Apart
          </h2>
        </div>

        <!-- Liquid-glass Table Container with Prominent Protruding White Card for Center Column -->
        <div class="my-[40px] max-w-[360px] md:max-w-[770px] lg:max-w-[1010px] mx-auto relative lg:overflow-visible mt-[40px] sm:mt-[70px] bg-white/30 backdrop-blur-[6px] rounded-[18px] lg:rounded-3xl border border-white/60 shadow-sm">
          <!-- The Distinct Protruding Pure White Card for the Pawfy Column -->
          <div
            class="absolute lg:top-[-36px] lg:bottom-[-36px] top-[-15px] bottom-[-15px] left-1/2 -translate-x-1/2 w-[122px] md:w-[259px] lg:w-[339px] bg-white rounded-[16px] lg:rounded-[24px] z-0 border-[2px] border-white shadow-xl max-[358px]:hidden"
            aria-hidden="true"
          ></div>

          <!-- Table -->
          <table class="min-w-full w-full table-fixed rounded-[2px] lg:rounded-[10px] relative z-10 p-[10px] sm:p-[20px] lg:p-[30px]">
            <thead class="p-[10px]">
              <tr class="border-b border-[#000948]/15">
                <!-- Column 1 Header: Blank Label Column -->
                <th class="w-1/3 md:w-[33%] px-2 lg:px-4 py-3 sm:py-5"></th>
                <!-- Column 2 Header: Pawfy Metabolic Complex Jar -->
                <th class="w-1/3 md:w-[33%] px-2 lg:px-4 py-3 sm:py-5 text-center">
                  <div class="flex justify-center items-center">
                    <img
                      src="https://cdn.shopify.com/s/files/1/0506/0424/5166/files/Frame_1598463.png?v=1784318334&width=160"
                      alt="Pawfy Metabolic Complex"
                      width={77}
                      height={77}
                      class="max-w-[55px] lg:max-w-[77px] h-auto object-contain mx-auto select-none"
                      loading="lazy"
                    />
                  </div>
                </th>
                <!-- Column 3 Header: Generic Competitor Jar -->
                <th class="w-1/3 md:w-[33%] px-2 lg:px-4 py-3 sm:py-5 text-center">
                  <div class="flex justify-center items-center">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets%2Fd6a6486ebcea4a4b8117bdb2cc7132ec%2Ff34d5a2ae1d34948aeacb9563823bfa7"
                      alt="Generic Brand"
                      width={77}
                      height={77}
                      class="mx-auto max-w-[55px] lg:max-w-[77px] h-auto object-contain select-none opacity-90"
                      loading="lazy"
                    />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              @for (row of rows; track row.label; let isLast = $last) {
                <tr [class.border-b]="!isLast" class="border-[#000948]/15">
                  <!-- Feature Label -->
                  <td class="px-3 sm:px-4 lg:px-6 py-[16px] lg:py-[22px] w-full text-left font-sans text-[13px] sm:text-[15px] lg:text-[19px] font-[500] text-[#000948]">
                    {{ row.label }}
                  </td>
                  <!-- Pawfy Cell -->
                  <td class="px-2 sm:px-4 lg:px-6 py-[16px] lg:py-[22px] w-full text-center">
                    <span class="text-center text-[22px] lg:text-[26px] block">
                      {{ row.highlight.icon }}
                    </span>
                    <p class="mt-[6px] text-[12px] sm:text-[13px] lg:text-[16px] text-[#000948] font-[400] leading-snug">
                      {{ row.highlight.copy }}
                    </p>
                  </td>
                  <!-- Generic Alternative Cell -->
                  <td class="px-2 sm:px-4 lg:px-6 py-[16px] lg:py-[22px] w-full text-center">
                    <span class="text-center text-[22px] lg:text-[26px] block">
                      {{ row.comparison.icon }}
                    </span>
                    <p class="mt-[6px] text-[12px] sm:text-[13px] lg:text-[16px] text-[#000948]/85 font-[400] leading-snug">
                      {{ row.comparison.copy }}
                    </p>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </section>
  `,
})
export class CompareTable {
  readonly rows = [
    {
      label: 'Ingredients',
      highlight: {
        icon: '🐶',
        copy: '100% natural. Human-grade and research backed.',
      },
      comparison: {
        icon: '🤯',
        copy: 'Fillers and additives you can’t pronounce.',
      },
    },
    {
      label: 'Vet-Formulated',
      highlight: {
        icon: '🐾',
        copy: 'Yes, together with pet nutrition specialists.',
      },
      comparison: {
        icon: '🔴',
        copy: 'Rarely. And it shows.',
      },
    },
    {
      label: 'NASC Certification',
      highlight: {
        icon: '🎖️',
        copy: 'Proudly. A non-negotiable for us.',
      },
      comparison: {
        icon: '🚨',
        copy: 'Most would fail.',
      },
    },
    {
      label: 'Manufactured in the USA',
      highlight: {
        icon: '🇺🇸',
        copy: 'Yes. Every single batch.',
      },
      comparison: {
        icon: '❌',
        copy: 'Made overseas to cut costs.',
      },
    },
  ];
}
