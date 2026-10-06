import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-vet-endorsement',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section
      id="benefits"
      class="my-[0px] w-full bg-cover bg-center bg-no-repeat py-[30px] lg:my-[0px] lg:py-[100px] relative overflow-hidden scroll-mt-[120px]"
      style="background: url('https://cdn.shopify.com/s/files/1/0506/0424/5166/files/a32c2b5c37c6e0c14e5f8ecb2901ffc065af9c34_1.jpg?v=1785180218&width=1400') center/cover no-repeat;"
    >
      <div class="mx-auto max-w-[1220px] px-[16px] lg:px-[30px] relative z-[1]">
        <!-- Transparent Liquid-Glass Frosted Rectangle Card -->
        <div class="rounded-[16px] lg:rounded-[25px] border border-white/80 bg-white/20 backdrop-blur-md px-[20px] pt-[28px] pb-0 lg:px-[50px] lg:pt-[50px] lg:pb-0 shadow-[0_20px_60px_rgba(32,37,74,0.12)] liquid-glass lg:grid lg:grid-cols-2 lg:gap-x-[80px] items-end">
          <!-- Left Column on Desktop: Dr. Daisy May Image bottom-aligned -->
          <div class="order-2 lg:order-1 flex justify-center lg:justify-start items-end self-end mt-6 lg:mt-0">
            <img
              src="https://cdn.shopify.com/s/files/1/0506/0424/5166/files/Frame_1598775_2.png?v=1783619146&width=500"
              alt="Dr. Daisy May | DVM"
              width={500}
              height={500}
              loading="lazy"
              class="max-h-[380px] sm:max-h-[440px] lg:max-h-[480px] w-auto object-cover select-none self-end"
            />
          </div>

          <!-- Right Column on Desktop: Title, Copy, Author -->
          <div class="order-1 lg:order-2 pb-[24px] lg:pb-[50px] text-left">
            <h2 class="font-recoleta font-[500] text-[32px] sm:text-[40px] lg:text-[48px] text-[#20254A] leading-[120%] mb-[20px]">
              Recommended &amp; Loved by Vets
            </h2>
            <p class="font-sans font-[400] text-[15px] lg:text-[17px] text-[#20254A]/90 leading-[155%] mb-[30px]">
              A healthy weight is vital for limber joints, lasting energy, and long-term wellness. But it’s almost impossible to manage when your dog acts like they’re starving 24/7. Well, these all-natural soft chews fight fat by focusing on metabolism and quieting those cravings between meals — thanks to a targeted blend of probiotics, prebiotics, L-carnitine, and more.
            </p>
            <div class="flex items-center justify-start gap-2.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                class="shrink-0"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M10 1.6665C5.39765 1.6665 1.66669 5.39746 1.66669 9.99984C1.66669 14.6022 5.39765 18.3332 10 18.3332C14.6024 18.3332 18.3334 14.6022 18.3334 9.99984C18.3334 5.39746 14.6024 1.6665 10 1.6665ZM12.9837 8.31228C13.2023 8.04512 13.1629 7.65136 12.8958 7.43278C12.6286 7.2142 12.2349 7.25358 12.0163 7.52073L8.70362 11.5696L7.5253 10.3912C7.28122 10.1472 6.88549 10.1472 6.64141 10.3912C6.39733 10.6353 6.39733 11.031 6.64141 11.2751L8.30808 12.9418C8.43294 13.0666 8.60479 13.1329 8.78115 13.1241C8.95752 13.1153 9.12193 13.0323 9.23374 12.8956L12.9837 8.31228Z"
                  fill="#000948"
                />
              </svg>
              <p class="font-mono text-[12px] sm:text-[13px] lg:text-[15px] font-[500] text-[#20254A] leading-[150%]">
                Dr. Daisy May | DVM, Vet Consultant to Pawfy
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class VetEndorsement {}
