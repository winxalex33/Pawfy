import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-help-all-dogs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="py-[60px] lg:py-[100px] bg-[#FAF8F5]">
      <div class="max-w-[1440px] mx-auto px-[16px] lg:px-[30px]">
        <div class="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-14 max-w-[1150px] mx-auto">
          <!-- Left: Mission Statement -->
          <div class="lg:w-[50%] text-left">
            <h2 class="font-[500] text-[#000948] text-[30px] sm:text-[40px] lg:text-[48px] leading-[115%] font-recoleta mb-5">
              Help Your Dog, Help All Dogs
            </h2>
            <p class="text-[14px] lg:text-[15px] text-[#000948]/85 leading-[165%]">
              At Pawfy, we believe all dogs deserve genuine care. Millions of dogs suffer everyday from allergy issues, joint issues and a whole lot more. We're committed to giving back and helping dogs that can't help themselves, and have no one to care for them. That's why we need your support. Choosing Pawfy, means choosing to help all dogs, not just yours. Your support means direct donations, assistance and free supplements for dogs all over America.
            </p>
          </div>
          <!-- Right: Lily dog photo -->
          <div class="lg:w-[50%] flex justify-center">
            <div class="relative rounded-[20px] overflow-hidden shadow-xs max-w-[500px] w-full">
              <img
                src="https://cdn.shopify.com/s/files/1/0506/0424/5166/files/lily_-_desktop_1.png?v=1784659851&width=500"
                alt="Lily after 12 weeks with Pawfy"
                width={500}
                height={400}
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
export class HelpAllDogs {}
