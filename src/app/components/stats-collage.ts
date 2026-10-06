import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-stats-collage',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="stats-collage" class="py-[50px] lg:py-[90px] bg-white scroll-mt-[120px]">
      <div class="max-w-[1440px] mx-auto px-[16px] lg:px-[30px]">
        <div class="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16">
          <!-- Left Column: Title, Subtitle, 2x2 Stats Grid -->
          <div class="lg:w-[50%] flex-1 text-left">
            <h2 class="font-[500] text-[#000948] text-[32px] sm:text-[42px] lg:text-[54px] leading-[110%] font-recoleta mb-4">
              Don’t Just Take Our Word For It
            </h2>
            <p class="text-[14px] lg:text-[16px] text-[#000948]/80 leading-[150%] mb-10 max-w-[550px]">
              We've crunched the numbers and asked fellow dog owners what they think. Here's why Pawfy works:
            </p>
            <div class="grid grid-cols-2 gap-y-10 gap-x-8">
              <!-- Stat 1 -->
              <div>
                <div class="font-recoleta font-[500] text-[40px] sm:text-[52px] text-[#000948] leading-none mb-1">
                  92%
                </div>
                <p class="text-[13px] sm:text-[15px] text-[#000948]/75 leading-[135%]">
                  would recommend us to a friend
                </p>
              </div>
              <!-- Stat 2 -->
              <div>
                <div class="font-recoleta font-[500] text-[40px] sm:text-[52px] text-[#000948] leading-none mb-1">
                  $1000
                </div>
                <p class="text-[13px] sm:text-[15px] text-[#000948]/75 leading-[135%]">
                  in lifetime savings on vet bills
                </p>
              </div>
              <!-- Stat 3 -->
              <div>
                <div class="font-recoleta font-[500] text-[40px] sm:text-[52px] text-[#000948] leading-none mb-1">
                  90.8%
                </div>
                <p class="text-[13px] sm:text-[15px] text-[#000948]/75 leading-[135%]">
                  are seeing results in their dog’s health
                </p>
              </div>
              <!-- Stat 4 -->
              <div>
                <div class="font-recoleta font-[500] text-[40px] sm:text-[52px] text-[#000948] leading-none mb-1">
                  2 Mil
                </div>
                <p class="text-[13px] sm:text-[15px] text-[#000948]/75 leading-[135%]">
                  Over 2 Million jars have been sold in the United States
                </p>
              </div>
            </div>
          </div>

          <!-- Right Column: Exact 6-Photo Dog Collage -->
          <div class="lg:w-[50%] flex justify-center">
            <div class="rounded-[20px] overflow-hidden max-w-[580px] w-full shadow-xs">
              <img
                src="https://cdn.shopify.com/s/files/1/0506/0424/5166/files/Frame_1598385_3_1.png?v=1784317640&width=620"
                alt="Dogs and Pawfy chews photo collage"
                width={620}
                height={620}
                loading="lazy"
                class="w-full h-auto object-cover rounded-[20px]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class StatsCollage {}
