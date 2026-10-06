import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-weight-risks',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="weight-health-risks" class="py-[60px] lg:py-[90px] bg-white scroll-mt-[120px]">
      <div class="max-w-[1440px] mx-auto px-[16px] lg:px-[30px]">
        <div class="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-14 max-w-[1250px] mx-auto">
          <!-- Left: Cattle Dog on Beach Image with Caption -->
          <div class="lg:w-[48%] flex flex-col w-full">
            <div class="rounded-[18px] overflow-hidden shadow-xs border border-[#000948]/10 bg-[#F7F6F2]">
              <img
                src="https://cdn.shopify.com/s/files/1/0506/0424/5166/files/Frame_1598781_1.png?v=1784319611&width=650"
                srcset="https://cdn.shopify.com/s/files/1/0506/0424/5166/files/Frame_1598781_1.png?v=1784319611&width=400 400w, https://cdn.shopify.com/s/files/1/0506/0424/5166/files/Frame_1598781_1.png?v=1784319611&width=650 650w"
                sizes="(max-width: 640px) 100vw, 650px"
                alt="Overweight dog on beach"
                width="600"
                height="500"
                loading="lazy"
                class="w-full h-auto object-cover max-h-[480px]"
              />
              <div class="bg-[#EDEBE5] py-2 px-3 text-center text-[11px] sm:text-[12px] text-[#000948]/80 font-[500]">
                Based On 2022 Association For Pet Obesity Prevention Survey
              </div>
            </div>
          </div>

          <!-- Right: Section Heading, Intro, 2x2 Risks Grid, Footer Note -->
          <div class="lg:w-[52%] flex flex-col text-left">
            <h2 class="font-[500] text-[#000948] text-[28px] sm:text-[38px] lg:text-[46px] leading-[115%] font-recoleta mb-4">
              59% of Dogs In The USA Are Overweight
            </h2>
            <p class="text-[14px] lg:text-[15px] text-[#000948]/80 leading-[150%] mb-6">
              Vets call it an epidemic and agree that keeping your dog at an ideal weight is one of the best things you can do for them. Every extra pound puts your dog at risk for:
            </p>

            <!-- 2x2 Risks Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-5 mb-6">
              @for (risk of risks; track risk.title) {
                <div class="flex items-start gap-3">
                  <span class="text-2xl shrink-0 mt-0.5">{{ risk.emoji }}</span>
                  <div>
                    <h3 class="font-[600] text-[15px] text-[#000948] mb-1">
                      {{ risk.title }}
                    </h3>
                    <p class="text-[12px] sm:text-[13px] text-[#000948]/75 leading-[140%]">
                      {{ risk.copy }}
                    </p>
                  </div>
                </div>
              }
            </div>

            <p class="text-[13px] sm:text-[14px] text-[#000948]/70 leading-[150%] border-t border-[#000948]/10 pt-4">
              Healthy-weight dogs live up to 2 years longer. A few dollars a day now could mean more happy, healthy years with your dog.
            </p>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class WeightRisks {
  readonly risks = [
    {
      emoji: '🦴',
      title: 'Joint Damage',
      copy: 'Excess weight accelerates arthritis and joint pain, making everyday movement harder.',
    },
    {
      emoji: '❤️',
      title: 'Heart Strain',
      copy: 'Carrying extra pounds forces the heart to work overtime, raising the risk of cardiovascular disease.',
    },
    {
      emoji: '🩸',
      title: 'Organ Stress',
      copy: 'Added weight strains the liver and kidneys, increasing risk of metabolic disease and diabetes.',
    },
    {
      emoji: '🏥',
      title: 'Bigger Vet Bills',
      copy: 'Weight-related conditions mean more treatments, more medications, and thousands more in lifetime costs.',
    },
  ];
}
