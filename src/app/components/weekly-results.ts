import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-weekly-results',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="weekly-results" class="bg-[#FFF7F3] py-[60px] lg:py-[90px] scroll-mt-[120px]">
      <div class="max-w-[1440px] mx-auto px-[16px] lg:px-[30px]">
        <!-- Section Heading & Subtitle -->
        <div class="max-w-[970px] mx-auto mb-[40px] lg:mb-[56px] text-center">
          <h2 class="font-recoleta text-[30px] sm:text-[42px] lg:text-[54px] font-[500] leading-[115%] text-[#000948] mb-3">
            84.8% of Dog Owners See Results Within 1-4 Weeks with Pawfy
          </h2>
          <p class="max-w-[850px] mx-auto font-[400] text-[14px] lg:text-[16px] text-[#000948]/85 leading-[160%] font-sans">
            We love hearing of early results. But as with all supplements, they work over time. That’s why consistent daily use helps build and support long-term benefits. For best results, we recommend using the chews for at least 3 months.
          </p>
        </div>

        <!-- Content Columns: Left (Before/After Photos) & Right (Connected Timeline) -->
        <div class="flex flex-col-reverse lg:grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] gap-[30px] md:gap-[50px] lg:gap-[70px] items-start max-w-[1320px] mx-auto">
          <!-- Left Column: Stacked Before & After Images -->
          <div class="grid grid-cols-1 gap-[20px] lg:gap-[28px] w-full">
            @for (img of images; track img.tag) {
              <div class="relative overflow-hidden rounded-[16px] lg:rounded-[24px] bg-[#E9ECF5] shadow-xs">
                <img
                  [src]="img.src"
                  [alt]="img.alt"
                  loading="lazy"
                  class="w-full h-[220px] sm:h-[280px] lg:h-[320px] object-cover"
                />
                <span
                  class="absolute left-[16px] top-[16px] lg:left-[22px] lg:top-[22px] inline-flex rounded-full px-[16px] py-[6px] text-[12px] lg:text-[13px] font-[600] leading-[120%] shadow-sm select-none"
                  [style.backgroundColor]="img.tagBgColor"
                  [style.color]="img.tagTextColor"
                >
                  {{ img.tag }}
                </span>
              </div>
            }
          </div>

          <!-- Right Column: Connected Vertical Line & Dots Timeline -->
          <div class="flex flex-col w-full pt-1 lg:pt-2">
            @for (step of steps; track step.title; let isLast = $last) {
              <article class="relative grid grid-cols-[22px_minmax(0,1fr)] gap-x-[16px] sm:gap-x-[20px] items-start">
                <!-- Dot & Line -->
                <div class="relative flex h-full justify-center pt-[6px]">
                  <span
                    class="relative z-10 block h-[12px] w-[12px] rounded-full shrink-0 shadow-xs"
                    [style.backgroundColor]="step.dotColor"
                  ></span>
                  @if (!isLast) {
                    <span class="absolute top-[18px] bottom-[-16px] left-1/2 w-[2px] -translate-x-1/2 bg-[#000948]/20"></span>
                  }
                </div>

                <!-- Step Info -->
                <div class="border-b border-[#000948]/15 pb-[20px] mb-[18px] last:border-b-0 last:pb-0 last:mb-0">
                  <div class="flex flex-wrap items-center gap-[10px] mb-[8px]">
                    <span
                      class="inline-flex rounded-full px-[14px] py-[5px] text-[11px] lg:text-[13px] font-[500] leading-[120%] font-mono select-none"
                      [style.backgroundColor]="step.tagBgColor"
                      [style.color]="step.tagTextColor"
                    >
                      {{ step.weekTag }}
                    </span>
                    <h3 class="font-recoleta font-[500] text-[18px] lg:text-[23px] text-[#000948] leading-[120%]">
                      {{ step.title }}
                    </h3>
                  </div>
                  <p class="font-sans font-[400] text-[14px] lg:text-[16px] text-[#000948]/85 leading-[150%]">
                    {{ step.copy }}
                  </p>
                </div>
              </article>
            }
          </div>
        </div>
      </div>
    </section>
  `,
})
export class WeeklyResults {
  readonly steps = [
    {
      weekTag: 'Weeks 1-3',
      title: 'Gut Balance Begins',
      copy: "Probiotics start repopulating your dog's gut with beneficial bacteria. You may notice less restlessness after meals and the start of fewer begging behaviours as hunger hormones begin to regulate.",
      tagBgColor: '#2B335C',
      tagTextColor: '#ffffff',
      dotColor: '#2B335C',
    },
    {
      weekTag: 'Month 1',
      title: 'Hunger Starts to Settle',
      copy: 'Prebiotics are now actively working to balance GLP-1 and leptin levels. Your dog may begin finishing meals and actually settling - with less circling, less whining, and more contentment between feeds.',
      tagBgColor: '#1E254A',
      tagTextColor: '#ffffff',
      dotColor: '#1E254A',
    },
    {
      weekTag: 'Month 2',
      title: 'Visible Changes in Weight & Energy',
      copy: 'L-Carnitine and salmon oil are building momentum. Many dogs begin showing a leaner body shape, more willingness to exercise, and improved energy and coat condition as the formula works deeper.',
      tagBgColor: '#000948',
      tagTextColor: '#ffffff',
      dotColor: '#000948',
    },
    {
      weekTag: 'Month 3+',
      title: 'Long-Term Weight & Metabolic Support',
      copy: 'Consistent daily use helps lock in results - maintaining a healthy weight, keeping hunger balanced, and giving your dog the sustained energy and gut health that supports every area of their wellbeing.',
      tagBgColor: '#009055',
      tagTextColor: '#ffffff',
      dotColor: '#009055',
    },
  ];

  readonly images = [
    {
      src: 'https://cdn.shopify.com/s/files/1/0506/0424/5166/files/before-overweight_3.png?v=1784314582&width=500',
      alt: 'Dog overweight review before starting Pawfy',
      tag: 'Before',
      tagBgColor: '#BF0003',
      tagTextColor: '#ffffff',
    },
    {
      src: 'https://cdn.shopify.com/s/files/1/0506/0424/5166/files/after-lean_3.png?v=1784314583&width=500',
      alt: 'Dog lean after progress with Pawfy',
      tag: 'After',
      tagBgColor: '#ffffff',
      tagTextColor: '#000948',
    },
  ];
}
