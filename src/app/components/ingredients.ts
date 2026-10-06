import { ChangeDetectionStrategy, Component, ElementRef, signal, viewChild } from '@angular/core';

@Component({
  selector: 'app-ingredients',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section
      id="research-backed-ingredients"
      class="bg-[#FFF] pt-[50px] lg:pt-[70px] pb-[70px] lg:pb-[60px] px-[16px] lg:px-[30px] overflow-hidden scroll-mt-[120px]"
    >
      <div class="max-w-[1440px] mx-auto lg:px-[30px]">
        <!-- Top Header Section -->
        <div class="max-w-[1180px] mx-auto mb-[40px] lg:mb-[70px] text-center">
          <div class="flex justify-center mb-3">
            <img
              src="https://cdn.shopify.com/s/files/1/0506/0424/5166/files/dog_owner-navy-optimized.gif?v=1784819390&width=120"
              alt="Dog owner guarantee stamp"
              width="105"
              height="105"
              class="max-h-[105px] w-auto select-none"
              loading="lazy"
            />
          </div>
          <h2 class="font-recoleta text-[30px] sm:text-[42px] lg:text-[54px] font-[500] leading-[115%] text-[#000948] mb-3">
            If The Research Didn't Back It, It Didn't Make The Cut
          </h2>
          <p class="max-w-[900px] mx-auto text-[14px] lg:text-[16px] text-[#000948]/85 leading-[160%] font-[400]">
            These premium soft chews may taste like a turkey-flavoured treat. But we built them from the research up, using only ingredients we'd happily feed our own dogs. Targeting metabolism, hunger hormones, and gut health at the source — so your dog stays fuller for longer and manages their weight naturally.
          </p>
        </div>

        <!-- Sub-tabs: Ingredients vs Nutritional Information -->
        <div class="mx-auto flex max-w-max items-center gap-[24px] border-b-[2px] border-[#00094826] mb-[30px] lg:mb-0 lg:-mt-[40px]">
          <button
            type="button"
            (click)="activeSubTab.set('ingredients')"
            class="-mb-[2px] border-b-[2px] pb-[14px] font-mono text-[16px] leading-[140%] transition-colors lg:text-[18px] cursor-pointer"
            [class.border-[#000948]]="activeSubTab() === 'ingredients'"
            [class.font-[500]]="activeSubTab() === 'ingredients'"
            [class.text-[#000948]]="activeSubTab() === 'ingredients'"
            [class.border-transparent]="activeSubTab() !== 'ingredients'"
            [class.font-[400]]="activeSubTab() !== 'ingredients'"
            [class.text-[#00094880]]="activeSubTab() !== 'ingredients'"
          >
            Ingredients
          </button>
          <button
            type="button"
            (click)="activeSubTab.set('nutrition')"
            class="-mb-[2px] border-b-[2px] pb-[14px] font-mono text-[16px] leading-[140%] transition-colors lg:text-[18px] cursor-pointer"
            [class.border-[#000948]]="activeSubTab() === 'nutrition'"
            [class.font-[500]]="activeSubTab() === 'nutrition'"
            [class.text-[#000948]]="activeSubTab() === 'nutrition'"
            [class.border-transparent]="activeSubTab() !== 'nutrition'"
            [class.font-[400]]="activeSubTab() !== 'nutrition'"
            [class.text-[#00094880]]="activeSubTab() !== 'nutrition'"
          >
            Nutritional Information
          </button>
        </div>

        <!-- Content Area -->
        <div class="lg:mt-[60px] relative">
          @if (activeSubTab() === 'ingredients') {
            <div class="relative px-0 lg:px-[10px]">
              <div class="relative max-w-full">
                <!-- Scrollable Carousel Track -->
                <div
                  #sliderRef
                  class="flex gap-4 sm:gap-5 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory scroll-smooth"
                >
                  @for (card of cards; track card.title) {
                    <div class="flex h-full w-[300px] sm:w-[330px] lg:w-[348px] shrink-0 flex-col rounded-[15px] select-none snap-start group">
                      <!-- Top Image Container -->
                      <div class="bg-[rgba(255,247,243,0.75)] p-[20px] pb-0 rounded-t-[15px] relative min-h-[170px] max-h-[170px] md:min-h-[200px] md:max-h-[200px] flex h-full flex-row overflow-hidden">
                        <img
                          loading="lazy"
                          [src]="card.image"
                          [alt]="card.title"
                          draggable="false"
                          class="absolute left-0 top-0 z-[1] h-full w-full rounded-t-[15px] object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                        />
                        <div class="absolute inset-0 z-[2] bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none"></div>
                        <div class="z-10 relative flex flex-col justify-end pt-[10px] lg:pt-[40px] pb-[12px] md:pb-[14px] pointer-events-none">
                          <p class="font-sans text-[18px] lg:text-[20px] leading-[26px] font-[500] !text-white z-10 mb-[10px] md:mb-[12px] drop-shadow-md">
                            {{ card.title }}
                          </p>
                          <p class="font-mono text-[13px] leading-[120%] font-[400] !text-white md:mb-[8px] z-10 border border-white rounded-full max-w-max py-[4px] px-[10px] drop-shadow-sm">
                            {{ card.badge }}
                          </p>
                        </div>
                      </div>

                      <!-- Card Body -->
                      <div class="flex flex-1 flex-col border-l border-b border-r border-[#DFE0E9] rounded-b-[15px] p-[20px] bg-white justify-between">
                        <div>
                          <p class="text-[12px] lg:text-[15px] text-[#000948] leading-[140%] font-[400] my-[10px] lg:my-0 z-10 lg:pr-[10px]">
                            {{ card.description }}
                          </p>
                          <ul class="mt-[20px] flex flex-1 flex-col space-y-[8px]">
                            @for (bullet of card.bullets; track $index) {
                              <li class="flex items-start gap-[8px] border-b border-[#00094840] last:border-0 pb-[10px] mb-[10px]">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  viewBox="0 0 20 20"
                                  fill="none"
                                  class="h-[20px] w-[20px] shrink-0"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M9.99935 1.66675C5.39698 1.66675 1.66602 5.39771 1.66602 10.0001C1.66602 14.6025 5.39698 18.3334 9.99935 18.3334C14.6017 18.3334 18.3327 14.6025 18.3327 10.0001C18.3327 5.39771 14.6017 1.66675 9.99935 1.66675ZM12.9831 8.31252C13.2017 8.04537 13.1623 7.6516 12.8951 7.43302C12.628 7.21444 12.2342 7.25382 12.0156 7.52097L8.70295 11.5698L7.52462 10.3915C7.28055 10.1474 6.88482 10.1474 6.64074 10.3915C6.39666 10.6356 6.39666 11.0313 6.64074 11.2754L8.30741 12.942C8.43227 13.0669 8.60412 13.1331 8.78048 13.1243C8.95684 13.1155 9.12125 13.0325 9.23307 12.8959L12.9831 8.31252Z"
                                    fill="#000948"
                                  />
                                </svg>
                                <span class="text-[12px] lg:text-[15px] text-[#000948] leading-[135%] font-[400]">
                                  {{ bullet }}
                                </span>
                              </li>
                            }
                          </ul>
                        </div>
                      </div>
                    </div>
                  }
                </div>

                <!-- Navigation Controls -->
                <div class="pointer-events-none absolute top-6 right-3 sm:right-6 lg:right-[-10px] flex flex-col items-center gap-2.5 z-30">
                  <button
                    type="button"
                    class="pointer-events-auto flex h-[48px] w-[48px] sm:h-[52px] sm:w-[52px] items-center justify-center rounded-full border border-white bg-white text-[#000948] shadow-lg transition-all duration-200 hover:bg-[#F7FAF8] hover:border-[#000948] cursor-pointer"
                    (click)="scrollLeft()"
                    aria-label="Previous ingredient"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 38 38"
                      fill="none"
                      class="h-[22px] w-[22px] rotate-180 text-[#000948]"
                    >
                      <path
                        d="M19.4196 0.340446L36.855 17.7758C37.0729 17.9938 37.1954 18.2894 37.1954 18.5977C37.1954 18.9059 37.0729 19.2016 36.855 19.4195L19.4196 36.8549C19.2008 37.0689 18.9065 37.1879 18.6004 37.1862C18.2944 37.1845 18.0014 37.0622 17.785 36.8458C17.5686 36.6294 17.4463 36.3364 17.4446 36.0304C17.4429 35.7243 17.5619 35.43 17.7759 35.2112L33.227 19.76L1.16236 19.76C0.854083 19.76 0.558432 19.6376 0.340448 19.4196C0.122463 19.2016 8.26812e-07 18.906 8.13337e-07 18.5977C7.99861e-07 18.2894 0.122463 17.9938 0.340448 17.7758C0.558432 17.5578 0.854083 17.4353 1.16236 17.4353L33.227 17.4353L17.7759 1.98416C17.5619 1.76536 17.4429 1.47102 17.4446 1.165C17.4463 0.858978 17.5686 0.565982 17.785 0.34959C18.0014 0.133197 18.2944 0.0108749 18.6004 0.00916209C18.9065 0.00744928 19.2008 0.126487 19.4196 0.340446Z"
                        fill="currentColor"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    class="pointer-events-auto flex h-[48px] w-[48px] sm:h-[52px] sm:w-[52px] items-center justify-center rounded-full border border-white bg-white text-[#000948] shadow-lg transition-all duration-200 hover:bg-[#F7FAF8] hover:border-[#000948] cursor-pointer"
                    (click)="scrollRight()"
                    aria-label="Next ingredient"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 38 38"
                      fill="none"
                      class="h-[22px] w-[22px] text-[#000948]"
                    >
                      <path
                        d="M19.4196 0.340446L36.855 17.7758C37.0729 17.9938 37.1954 18.2894 37.1954 18.5977C37.1954 18.9059 37.0729 19.2016 36.855 19.4195L19.4196 36.8549C19.2008 37.0689 18.9065 37.1879 18.6004 37.1862C18.2944 37.1845 18.0014 37.0622 17.785 36.8458C17.5686 36.6294 17.4463 36.3364 17.4446 36.0304C17.4429 35.7243 17.5619 35.43 17.7759 35.2112L33.227 19.76L1.16236 19.76C0.854083 19.76 0.558432 19.6376 0.340448 19.4196C0.122463 19.2016 8.26812e-07 18.906 8.13337e-07 18.5977C7.99861e-07 18.2894 0.122463 17.9938 0.340448 17.7758C0.558432 17.5578 0.854083 17.4353 1.16236 17.4353L33.227 17.4353L17.7759 1.98416C17.5619 1.76536 17.4429 1.47102 17.4446 1.165C17.4463 0.858978 17.5686 0.565982 17.785 0.34959C18.0014 0.133197 18.2944 0.0108749 18.6004 0.00916209C18.9065 0.00744928 19.2008 0.126487 19.4196 0.340446Z"
                        fill="currentColor"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          } @else {
            <!-- Nutritional Information Tab -->
            <div class="mx-auto max-w-[1180px]">
              <div class="space-y-[12px]">
                <p class="font-sans text-[14px] font-[600] text-[#000948] lg:text-[18px]">
                  Active Ingredients (per 1 chew)
                </p>
                <div class="grid grid-cols-1 gap-x-[40px] gap-y-[12px] lg:grid-cols-2">
                  @for (row of nutritionalRows; track row.name) {
                    <div class="flex items-baseline justify-between gap-[20px] border-b border-[#00094826] pb-[12px]">
                      <span class="font-sans text-[14px] font-[400] leading-[140%] text-[#000948] lg:text-[18px]">
                        {{ row.name }}
                      </span>
                      <span class="shrink-0 text-right font-mono text-[13px] font-[400] text-[#000948] lg:text-[15px]">
                        {{ row.amount }}
                      </span>
                    </div>
                  }
                </div>
                <p class="font-sans text-[14px] leading-[150%] text-[#000948] lg:text-[16px] mt-4">
                  Probiotic Blend: Lactobacillus acidophilus, Lactobacillus rhamnosus, Enterococcus faecium (4.5 Billion CFU at time of manufacture).
                </p>
              </div>
              <div class="mt-[28px] pt-[8px]">
                <p class="font-sans text-[14px] font-[600] text-[#000948] lg:text-[18px]">
                  Inactive Ingredients
                </p>
                <p class="mt-[10px] font-sans text-[14px] leading-[160%] text-[#000948] lg:text-[16px]">
                  Citric Acid (as preservative), Garbanzo Flour, Glycerin (from Palm, RSPO), Palm Fruit Oil (Organic, RSPO), Pea Flour, Sunflower Lecithin, Turkey, Turkey flavor (natural). Contains fish.
                </p>
              </div>
            </div>
          }
        </div>

        <!-- NASC Certification Banner -->
        <div class="max-w-[1300px] mx-auto mt-12 rounded-[14px] bg-[#000948] py-4 px-6 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-white">
          <p class="text-[12px] sm:text-[13px] text-[#D5E3EC] leading-[150%] max-w-[950px]">
            We're proud members of National Animal Supplement Council. We meet strict guidelines for animal products throughout the entire business. From quality control, to labeling, and testing.
          </p>
          <img
            src="https://cdn.shopify.com/s/files/1/0506/0424/5166/files/Mask_group_7.png?v=1782696590&width=120"
            alt="National Animal Supplement Council logo"
            width="70"
            height="70"
            class="w-14 h-14 object-contain shrink-0"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  `,
})
export class IngredientsSection {
  readonly activeSubTab = signal<'ingredients' | 'nutrition'>('ingredients');
  readonly sliderRef = viewChild<ElementRef<HTMLDivElement>>('sliderRef');

  readonly cards = [
    {
      title: 'Probiotic Blend',
      badge: '4.5 Billion CFU',
      image: 'https://cdn.builder.io/api/v1/image/assets%2Fd6a6486ebcea4a4b8117bdb2cc7132ec%2Fe5c4a3ffa9114794ab20e08f6e243aea',
      description: 'Three targeted probiotic strains repopulate the gut with beneficial bacteria directly linked to how the body metabolises food and regulates weight. The result is a dog whose body uses calories for energy, not storage.',
      bullets: [
        'A dog that\'s visibly leaner over weeks of consistent use',
        'More settled behaviour after meals - less pacing, less searching for more',
        'Better energy day to day, without changing anything else in their routine',
      ],
    },
    {
      title: 'Prebiotic Blend (FOS, GOS & Inulin)',
      badge: '500mg Total',
      image: 'https://cdn.shopify.com/s/files/1/0506/0424/5166/files/inulin-web.jpg?v=1784571319&width=360',
      description: 'This trio of prebiotic fibres feeds good gut bacteria and does something most supplements can\'t: it balances GLP-1 and leptin - the hunger hormones that tell your dog when they\'re full. Less begging isn\'t a behaviour problem you need to train away. It\'s a biology problem this fixes.',
      bullets: [
        'A dog that finishes their bowl and actually walks away',
        'Fewer "starving dog" theatrics between meals',
        'A calmer, more contented dog who isn\'t ruled by hunger',
      ],
    },
    {
      title: 'L-Carnitine',
      badge: '125mg',
      image: 'https://cdn.shopify.com/s/files/1/0506/0424/5166/files/L-Carnitine-web.jpg?v=1784571319&width=360',
      description: 'This natural amino acid shuttles fatty acids into cells where they\'re burned for energy - not stored as weight. The result is a leaner body composition, more stamina, and a dog that actually wants to move.',
      bullets: [
        'A dog that\'s more willing to walk, play, and keep up',
        'A leaner silhouette you can see and feel when you stroke them',
        'Less of the sluggishness that comes with carrying extra weight',
      ],
    },
    {
      title: 'Salmon Oil',
      badge: '25mg',
      image: 'https://cdn.builder.io/api/v1/image/assets%2Fd6a6486ebcea4a4b8117bdb2cc7132ec%2F9a2d4e862957428aae5b3906f4db59b5',
      description: 'A marine-derived source of omega-3 fatty acids that supports metabolic function and helps the body maintain a healthy weight. It also works on the outside - supporting a shinier coat and stronger cardiovascular system.',
      bullets: [
        'A coat that\'s visibly shinier and softer to touch',
        'A dog that looks as good on the outside as they\'re improving on the inside',
        'Long-term heart and metabolic support you won\'t see until you don\'t need it',
      ],
    },
    {
      title: 'Apple Cider Vinegar',
      badge: '25mg',
      image: 'https://cdn.shopify.com/s/files/1/0506/0424/5166/files/apple_cider_vinegar-web.jpg?v=1784571319&width=360',
      description: 'A time-tested ingredient that smooths digestion and blunts the hunger spikes that lead to begging, restlessness, and overeating between meals.',
      bullets: [
        'A dog that eats, settles, and stays settled',
        'Less whining, circling, and pestering between meals',
        'Calmer mealtimes without the chaos that follows',
      ],
    },
  ];

  readonly nutritionalRows = [
    { name: 'Inulin (From Chicory)', amount: '200 mg' },
    { name: 'Fructooligosaccharides (From Artichoke)', amount: '150 mg' },
    { name: 'Galactooligosaccharides', amount: '150 mg' },
    { name: 'L-Carnitine', amount: '125 mg' },
    { name: 'Apple Cider Vinegar', amount: '25 mg' },
    { name: 'Salmon Oil', amount: '25 mg' },
  ];

  scrollLeft() {
    this.sliderRef()?.nativeElement.scrollBy({ left: -360, behavior: 'smooth' });
  }

  scrollRight() {
    this.sliderRef()?.nativeElement.scrollBy({ left: 360, behavior: 'smooth' });
  }
}
