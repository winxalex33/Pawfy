import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CustomerReview } from '../models/pdp.model';
import { PdpState } from '../services/pdp-state';

@Component({
  selector: 'app-customer-reviews',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="customer-reviews" class="py-[60px] lg:py-[100px] bg-[#FAF7F2] scroll-mt-[120px]">
      <div class="max-w-[1440px] mx-auto px-[16px] lg:px-[30px]">
        <!-- Title and Intro -->
        <div class="max-w-[950px] mx-auto text-center mb-[40px] lg:mb-[60px]">
          <h2 class="font-[500] text-[#000948] text-[32px] sm:text-[42px] lg:text-[54px] leading-[115%] font-recoleta">
            If Dogs Could Talk...
          </h2>
          <p class="mt-[12px] font-[400] text-[14px] lg:text-[17px] text-[#000948]/80 leading-[150%] max-w-[750px] mx-auto">
            Real dogs. Real relief. Real reviews from thousands of happy pet parents who've seen the difference for themselves.
          </p>

          <!-- Top Toolbar: Rating Filter & Write Review Button -->
          <div class="flex flex-wrap items-center justify-center gap-3 mt-6">
            <div class="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-[#000948]/15 text-xs font-bold shadow-2xs">
              <span class="text-[#000948]/60 mr-1">Filter:</span>
              <button
                type="button"
                (click)="filterRating.set('all')"
                class="px-2.5 py-1 rounded-full cursor-pointer transition"
                [class.bg-[#000948]]="filterRating() === 'all'"
                [class.text-white]="filterRating() === 'all'"
                [class.text-[#000948]]="filterRating() !== 'all'"
              >
                All ({{ reviews().length }})
              </button>
              <button
                type="button"
                (click)="filterRating.set(5)"
                class="px-2.5 py-1 rounded-full cursor-pointer transition flex items-center gap-1"
                [class.bg-[#000948]]="filterRating() === 5"
                [class.text-white]="filterRating() === 5"
                [class.text-[#000948]]="filterRating() !== 5"
              >
                5 Stars ★
              </button>
              <button
                type="button"
                (click)="filterRating.set(4)"
                class="px-2.5 py-1 rounded-full cursor-pointer transition flex items-center gap-1"
                [class.bg-[#000948]]="filterRating() === 4"
                [class.text-white]="filterRating() === 4"
                [class.text-[#000948]]="filterRating() !== 4"
              >
                4 Stars ★
              </button>
            </div>

            <button
              type="button"
              (click)="isWriteModalOpen.set(true)"
              class="bg-[#009055] hover:bg-[#007b48] text-white text-xs font-bold px-4 py-2 rounded-full transition shadow-xs cursor-pointer"
            >
              + Write A Review
            </button>
          </div>
        </div>

        <!-- 6 Review Cards in 3-Column Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-[1250px] mx-auto">
          @for (r of filteredReviews(); track r.id) {
            <div class="bg-white p-6 rounded-[16px] border border-[#000948]/10 shadow-xs flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between mb-3">
                  <div class="flex items-center gap-1.5">
                    <span class="text-[11px] font-[600] text-[#0E5B23] bg-[#E2F8E6] px-2 py-0.5 rounded-[4px] flex items-center gap-1">
                      <span>✓</span> VERIFIED PURCHASE
                    </span>
                  </div>
                  <span class="text-[12px] text-[#000948]/70 font-mono">{{ r.date }}</span>
                </div>

                <div class="flex items-center gap-2 mb-3">
                  <span class="font-[700] text-[15px] text-[#000948]">{{ r.author }}</span>
                  <div class="text-[#00703C] text-sm tracking-wider">
                    @for (s of getStarArray(r.rating); track $index) {
                      ★
                    }
                  </div>
                </div>

                @if (r.headline) {
                  <h3 class="font-[600] text-[14px] text-[#000948] mb-1">
                    {{ r.headline }}
                  </h3>
                }

                <p class="text-[13px] sm:text-[14px] text-[#000948]/85 leading-[150%]">
                  {{ r.copy }}
                </p>
              </div>

              <div class="pt-3 mt-3 border-t border-[#000948]/10 flex items-center justify-between text-xs text-[#000948]/75">
                <span>Helpful to you?</span>
                <button
                  type="button"
                  (click)="markHelpful(r.id)"
                  class="font-semibold text-[#00703C] hover:underline cursor-pointer"
                >
                  👍 Yes ({{ r.helpfulCount }})
                </button>
              </div>
            </div>
          }
        </div>
      </div>

      <!-- Write Review Modal Dialog -->
      @if (isWriteModalOpen()) {
        <div class="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div class="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative border border-[#000948]/10">
            <button
              type="button"
              (click)="isWriteModalOpen.set(false)"
              class="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 text-gray-700 flex items-center justify-center hover:bg-gray-200 cursor-pointer font-bold"
            >
              ✕
            </button>

            @if (submittedSuccess()) {
              <div class="py-8 text-center flex flex-col items-center gap-2">
                <div class="w-12 h-12 rounded-full bg-emerald-100 text-[#009055] flex items-center justify-center text-2xl font-bold">
                  ✓
                </div>
                <h3 class="text-lg font-bold text-[#000948]">Thank You!</h3>
                <p class="text-xs text-gray-600">Your review was submitted and posted to the community feed.</p>
              </div>
            } @else {
              <h3 class="font-recoleta text-xl font-bold text-[#000948] mb-4">Share Your Pup's Experience</h3>

              <div class="flex flex-col gap-3 text-xs">
                <div>
                  <label for="rev-author-name" class="block font-bold text-[#000948] mb-1">Your Name</label>
                  <input
                    id="rev-author-name"
                    type="text"
                    [value]="reviewAuthor()"
                    (input)="reviewAuthor.set($any($event.target).value)"
                    placeholder="e.g. Rachel S."
                    class="w-full px-3 py-2 border border-gray-300 rounded-xl focus:border-[#009055] outline-none"
                  />
                </div>

                <div>
                  <label for="rev-dog-breed" class="block font-bold text-[#000948] mb-1">Dog's Name &amp; Breed</label>
                  <input
                    id="rev-dog-breed"
                    type="text"
                    [value]="reviewPet()"
                    (input)="reviewPet.set($any($event.target).value)"
                    placeholder="e.g. Copper (Beagle, 4 yrs)"
                    class="w-full px-3 py-2 border border-gray-300 rounded-xl focus:border-[#009055] outline-none"
                  />
                </div>

                <div>
                  <span class="block font-bold text-[#000948] mb-1">Star Rating</span>
                  <div class="flex gap-2 text-xl text-amber-400 cursor-pointer">
                    @for (star of [1, 2, 3, 4, 5]; track star) {
                      <button
                        type="button"
                        (click)="reviewRating.set(star)"
                        class="focus:outline-none"
                      >
                        {{ star <= reviewRating() ? '★' : '☆' }}
                      </button>
                    }
                  </div>
                </div>

                <div>
                  <label for="rev-detail-body" class="block font-bold text-[#000948] mb-1">Your Review</label>
                  <textarea
                    id="rev-detail-body"
                    rows="3"
                    [value]="reviewBody()"
                    (input)="reviewBody.set($any($event.target).value)"
                    placeholder="How has their begging, metabolism and energy improved?"
                    class="w-full px-3 py-2 border border-gray-300 rounded-xl focus:border-[#009055] outline-none"
                  ></textarea>
                </div>

                <button
                  type="button"
                  (click)="submitReview()"
                  class="w-full py-3 bg-[#009055] hover:bg-[#007b48] text-white font-bold rounded-xl shadow-md transition cursor-pointer mt-2"
                >
                  Submit Verified Review
                </button>
              </div>
            }
          </div>
        </div>
      }
    </section>
  `,
})
export class CustomerReviews {
  readonly state = inject(PdpState);

  readonly filterRating = signal<'all' | 5 | 4>('all');
  readonly isWriteModalOpen = signal(false);
  readonly submittedSuccess = signal(false);

  readonly reviewAuthor = signal('');
  readonly reviewPet = signal('');
  readonly reviewRating = signal(5);
  readonly reviewBody = signal('');

  readonly reviews = signal<CustomerReview[]>([
    {
      id: 'rev-1',
      author: 'Tom',
      rating: 5,
      date: '1/6/2026',
      verified: true,
      copy: 'I was skeptical these would work but they have been a miracle! My greedy dog has stopped begging at the table and stealing food. Thank you, Pawfy!',
      helpfulCount: 38,
    },
    {
      id: 'rev-2',
      author: 'Liam',
      rating: 5,
      date: '1/6/2026',
      verified: true,
      copy: 'My pup struggled to lose weight for years. I tried specialized foods and diets. Nothing worked. But on these chews she has already lost 2lbs and FINALLY begs less. We love them!',
      helpfulCount: 24,
    },
    {
      id: 'rev-3',
      author: 'Julie',
      rating: 5,
      date: '1/6/2026',
      verified: true,
      copy: 'My senior dog slowed down and gained weight fast. I tried these as a random experiment, not expecting much. Now he has lost the weight, full of energy and acting like a pup again!',
      helpfulCount: 41,
    },
    {
      id: 'rev-4',
      author: 'Nick',
      rating: 5,
      date: '1/6/2026',
      verified: true,
      copy: 'My dog\'s nickname was "garbage disposal". I battled her appetite for years. She barked for more food constantly. She thinks these chews are treats but they have balanced her appetite like nothing else so she\'s much calmer around food now. Die-hard fans!',
      helpfulCount: 19,
    },
    {
      id: 'rev-5',
      author: 'Carrie',
      rating: 5,
      date: '1/6/2026',
      verified: true,
      copy: 'Two weeks in and my dog has completely stopped circling the kitchen between meals. She eats, she settles. I didn\'t realise how much her begging was stressing me out until it stopped.',
      helpfulCount: 29,
    },
    {
      id: 'rev-6',
      author: 'Annabelle',
      rating: 4,
      date: '1/6/2026',
      verified: true,
      copy: 'My lab has been carrying extra weight for years despite us cutting back his food. 3 months on these and she is visibly leaner and more energetic on walks. Actually excited to go out again.',
      helpfulCount: 33,
    },
  ]);

  filteredReviews() {
    const f = this.filterRating();
    if (f === 'all') return this.reviews();
    return this.reviews().filter((r) => r.rating === f);
  }

  getStarArray(count: number): number[] {
    return Array.from({ length: count });
  }

  markHelpful(id: string) {
    this.reviews.update((list) =>
      list.map((r) => (r.id === id ? { ...r, helpfulCount: r.helpfulCount + 1 } : r))
    );
    this.state.trackEvent('review_helpful_clicked', { review_id: id });
  }

  submitReview() {
    if (!this.reviewBody()) return;

    const newRev: CustomerReview = {
      id: 'rev-' + Date.now(),
      author: this.reviewAuthor() || 'Verified Dog Parent',
      rating: this.reviewRating(),
      date: 'Just now',
      verified: true,
      copy: this.reviewBody(),
      helpfulCount: 1,
    };

    this.reviews.update((list) => [newRev, ...list]);
    this.submittedSuccess.set(true);
    this.state.trackEvent('review_submitted', { rating: newRev.rating, author: newRev.author });

    setTimeout(() => {
      this.submittedSuccess.set(false);
      this.isWriteModalOpen.set(false);
      this.reviewAuthor.set('');
      this.reviewPet.set('');
      this.reviewBody.set('');
    }, 1500);
  }
}
