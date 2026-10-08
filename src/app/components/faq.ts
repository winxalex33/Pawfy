import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'app-faq',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="faq" class="pt-[50px] lg:pt-[70px] pb-[50px] lg:pb-[100px] bg-[#FFF] scroll-mt-[120px]">
      <div class="max-w-[1440px] mx-auto px-[16px] lg:px-[30px]">
        <div class="flex flex-col lg:flex-row gap-[30px] lg:gap-[40px] items-start justify-center">
          <!-- Left Column: Dog Illustration / Barking Beagle -->
          <div class="w-full lg:w-[28%] max-w-[400px] mx-auto lg:mx-0 flex items-center justify-between lg:justify-end lg:pr-6">
            <div class="block lg:hidden">
              <h2 class="font-recoleta text-[36px] font-[500] leading-[115%] text-[#000948]">
                FAQ
              </h2>
            </div>
            <img
              src="https://cdn.shopify.com/s/files/1/0506/0424/5166/files/27-Beagle.gif?v=1784671478&width=220"
              alt="Barking beagle animation"
              width={220}
              height={220}
              loading="lazy"
              class="w-full h-auto object-contain max-w-[120px] lg:max-w-[200px]"
            />
          </div>

          <!-- Right Column: Title + Accordions + Contact Us -->
          <div class="w-full lg:w-[72%] lg:max-w-[860px]">
            <!-- Desktop FAQ Title -->
            <div class="mb-[32px] hidden lg:block">
              <h2 class="font-recoleta text-[44px] lg:text-[54px] font-[500] leading-[115%] text-[#000948]">
                FAQ
              </h2>
            </div>

            <!-- Accordion List -->
            <div>
              @for (faq of faqs; track faq.question; let idx = $index) {
                <div class="border-b border-[#000948]/25 py-[16px] lg:py-[20px]">
                  <button
                    type="button"
                    (click)="toggleFaq(idx)"
                    class="w-full flex justify-between items-center text-left cursor-pointer group gap-4"
                    [attr.aria-expanded]="openIndex() === idx"
                  >
                    <span class="font-[400] text-[18px] lg:text-[23px] text-[#000948] font-sans leading-[135%] transition-colors duration-150 group-hover:text-[#000948]/80">
                      {{ faq.question }}
                    </span>
                    <span class="shrink-0 text-[#000948] p-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 38 38"
                        fill="none"
                        class="h-[18px] w-[18px] lg:h-[20px] lg:w-[20px] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] origin-center"
                        [class.-rotate-90]="openIndex() === idx"
                        [class.rotate-90]="openIndex() !== idx"
                      >
                        <path
                          d="M19.4196 0.340446L36.855 17.7758C37.0729 17.9938 37.1954 18.2894 37.1954 18.5977C37.1954 18.9059 37.0729 19.2016 36.855 19.4195L19.4196 36.8549C19.2008 37.0689 18.9065 37.1879 18.6004 37.1862C18.2944 37.1845 18.0014 37.0622 17.785 36.8458C17.5686 36.6294 17.4463 36.3364 17.4446 36.0304C17.4429 35.7243 17.5619 35.43 17.7759 35.2112L33.227 19.76L1.16236 19.76C0.854083 19.76 0.558432 19.6376 0.340448 19.4196C0.122463 19.2016 8.26812e-07 18.906 8.13337e-07 18.5977C7.99861e-07 18.2894 0.122463 17.9938 0.340448 17.7758C0.558432 17.5578 0.854083 17.4353 1.16236 17.4353L33.227 17.4353L17.7759 1.98416C17.5619 1.76536 17.4429 1.47102 17.4446 1.165C17.4463 0.858978 17.5686 0.565982 17.785 0.34959C18.0014 0.133197 18.2944 0.0108749 18.6004 0.00916209C18.9065 0.00744928 19.2008 0.126487 19.4196 0.340446Z"
                          fill="currentColor"
                        />
                      </svg>
                    </span>
                  </button>

                  <div
                    class="faq-accordion-content"
                    [class.is-open]="openIndex() === idx"
                  >
                    <div class="faq-accordion-inner">
                      <div class="pt-[14px] pb-[6px]">
                        <div class="font-[400] text-[13px] lg:text-[15px] text-[#000948]/90 font-sans leading-[160%]">
                          {{ faq.answer }}
                        </div>
                        @if (faq.details) {
                          <div class="font-[400] text-[13px] lg:text-[15px] text-[#000948]/90 font-sans leading-[160%] mt-2">
                            {{ faq.details }}
                          </div>
                        }
                      </div>
                    </div>
                  </div>
                </div>
              }
            </div>

            <!-- Bottom Row: Still Have A Question? Contact Us -->
            <div class="pt-[28px] lg:pt-[45px]">
              <div class="flex flex-wrap items-center gap-[14px] lg:gap-[18px]">
                <span class="font-mono text-[14px] lg:text-[15px] tracking-wide leading-[120%] text-[#000948]">
                  Still Have A Question?
                </span>
                <a
                  href="https://pawfy.com/pages/contact-us"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex min-h-[32px] items-center justify-center rounded-full bg-[#000948] px-[20px] py-[7px] font-mono text-[13px] lg:text-[14px] leading-[120%] text-white transition-all duration-200 hover:bg-[#000948]/85 hover:shadow-sm"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class FaqSection {
  readonly openIndex = signal<number | null>(1); // question 2 open by default as in screenshot

  readonly faqs = [
    {
      question: 'What Flavor Is Metabolic Complex?',
      answer:
        'Every Metabolic Complex soft chew is made with a natural turkey flavor that dogs drool over — even if they’re a picky eater.',
    },
    {
      question: 'How Many Soft Chews Do I Give My Dog Each Day?',
      answer:
        'The daily dosage is based on your dog’s weight. Dogs up to 30 pounds get 1 soft chew per day. 2 soft chews for dogs between 31-60 pounds. 3 soft chews for dogs between 61-90 pounds. And 4 soft chews for any pooch over 91 pounds.',
    },
    {
      question: 'What Are The Ingredients In Metabolic Complex?',
      answer:
        'Active Ingredients (per 1 chew): Inulin (From Chicory), Fructooligosaccharides (From Artichoke), Galactooligosaccharides, L-Carnitine, Apple Cider Vinegar, Salmon Oil, Probiotic Blend: Lactobacillus acidophilus, Lactobacillus rhamnosus, Enterococcus faecium (4.5 Billion CFU at time of manufacture).',
      details:
        'Inactive Ingredients: Citric Acid (as preservative), Garbanzo Flour, Glycerin (from Palm, RSPO), Palm Fruit Oil (Organic, RSPO), Pea Flour, Sunflower Lecithin, Turkey, Turkey flavor (natural). Contains fish.',
    },
    {
      question: 'Is Metabolic Complex Quality Checked?',
      answer:
        'All of our health soft chews and meal powders are tested for quality at an independent, 3rd-party laboratory. However, we always recommend consulting with your veterinarian before beginning any new supplement.',
    },
    {
      question: 'What If It Doesn’t Work? Is There A Guarantee?',
      answer:
        'Absolutely! If you’re unsatisfied with your dog’s results for any reason, simply contact our U.S.-based customer support team within 60 days and we’ll refund your entire purchase price — no hassle, no questions asked.',
    },
  ];

  toggleFaq(idx: number) {
    this.openIndex.update((curr) => (curr === idx ? null : idx));
  }
}
