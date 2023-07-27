import React from 'react';
import Image from 'next/image';

const TestimonialsSection = () => {
  return (
    <section className="text-neutral-700 dark:text-neutral-300">
      <div className="mx-auto text-center md:max-w-xl lg:max-w-3xl">
        <h3 className="mb-6 text-3xl font-bold">Testimonials</h3>
        <p className="mb-6 pb-2 md:mb-12 md:pb-0">
          Here are just a few of the many happy clients we have served!
        </p>
      </div>

      {/* First Testimonial */}
      <div className="grid gap-6 text-center md:grid-cols-3">
        <div>
          <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-700 dark:shadow-black/30">
            <div className="h-28 overflow-hidden rounded-t-lg bg-[#9d789b]"></div>
            <div className="mx-auto -mt-12 w-24 overflow-hidden rounded-full border-2 border-white bg-white dark:border-neutral-800 dark:bg-neutral-800">
              <Image src="https://www.istockphoto.com/resources/images/FreePhotos/Free-Photo-700x860-1410039110.jpg" alt="Avatar" width={700} height={860} />
            </div>
            <div className="p-6">
              <h4 className="mb-4 text-2xl font-semibold">Sarah Johnson</h4>
              <hr />
              <p className="mt-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="inline-block h-7 w-7 pr-2"
                  viewBox="0 0 24 24"
                >
                  <path d="M13 14.725c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275zm-13 0c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275z" />
                </svg>
                Testimony from Sarah Johnson:
                I recently hired Full Metal Collective for a welding project, and I could not be happier with the results. Their team was professional, skilled, and attentive to detail. They completed the project on time and within budget. The quality of their work exceeded my expectations, and I would highly recommend them to anyone in need of welding services. Full Metal Collective truly delivered exceptional craftsmanship!


              </p>
            </div>
          </div>
        </div>

        {/* Second Testimonial */}
        <div>
          <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-700 dark:shadow-black/30">
            <div className="h-28 overflow-hidden rounded-t-lg bg-[#7a81a8]"></div>
            <div className="mx-auto -mt-12 w-24 overflow-hidden rounded-full border-2 border-white bg-white dark:border-neutral-800 dark:bg-neutral-800">
              <Image src="https://www.istockphoto.com/resources/images/FreePhotos/Free-Photo-700x860-1492442441.jpg" alt="Avatar" width={700} height={860} />
            </div>
            <div className="p-6">
              <h4 className="mb-4 text-2xl font-semibold">John Adams</h4>
              <hr />
              <p className="mt-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="inline-block h-7 w-7 pr-2"
                  viewBox="0 0 24 24"
                >
                  <path d="M13 14.725c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275zm-13 0c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275z" />
                </svg>
                Testimony from John Adams:
                I had the pleasure of working with Full Metal Collective on a custom metal fabrication project for my business. From the initial consultation to the final installation, their team demonstrated exceptional expertise and professionalism. They carefully listened to my requirements and provided valuable insights to optimize the design and functionality of the project. The craftsmanship and attention to detail were remarkable. I am extremely satisfied with their work and would not hesitate to work with them again in the future.
              </p>
            </div>
          </div>
        </div>

        {/* Third Testimonial */}
        <div>
          <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-700 dark:shadow-black/30">
            <div className="h-28 overflow-hidden rounded-t-lg bg-[#6d5b98]"></div>
            <div className="mx-auto -mt-12 w-24 overflow-hidden rounded-full border-2 border-white bg-white dark:border-neutral-800 dark:bg-neutral-800">
              <Image src="https://images.unsplash.com/photo-1543207564-1271b510019d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" alt="Avatar" width={687} height={458} />
            </div>
            <div className="p-6">
              <h4 className="mb-4 text-2xl font-semibold">Emily Rodriguez</h4>
              <hr />
              <p className="mt-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="inline-block h-7 w-7 pr-2"
                  viewBox="0 0 24 24"
                >
                  <path d="M13 14.725c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275zm-13 0c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275z" />
                </svg>
                Testimony from Emily Rodriguez:
                Full Metal Collective transformed my vision into reality with their outstanding welding services. Their team was incredibly skilled and dedicated to ensuring my project turned out exactly as I had envisioned. They went above and beyond to accommodate my unique requirements and delivered a high-quality end product. The communication throughout the process was excellent, and the project was completed within the agreed-upon timeline. I am extremely grateful for their expertise and professionalism. Full Metal Collective is definitely my go-to welding company!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
   
  );
};

export default TestimonialsSection;
