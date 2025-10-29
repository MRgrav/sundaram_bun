import { Layout } from "../../components/layouts/Layout";
import { Navbar } from "../../components/shared/Navbar";

export const About = () => (
  <Layout title="About Us">
    <div class="">
      <section class="relative w-full h-[70vh] overflow-hidden" id="herotop">
        <carousel itemstoshow="1" wraparound="true" autoplay="3000" class="w-full h-full">
          <slide>
            <div class="w-full h-[70vh] relative">
              <img src="/images/sky_link_heights/sdimg_sm.png" alt="Hero Slide" loading="lazy"
                  class="w-full h-full object-cover object-center brightness-40" />
            </div>
          </slide>
        </carousel>

        <div class="absolute inset-0 flex justify-center items-center p-8 lg:pb-16">
          <div class="z-10 p-6 text-white max-w-3xl" data-aos="fade-right">
            <h1 class="text-6xl font-bold">Legacy Built on Trust</h1>
            <p class="text-lg pt-4">
              Over three decades of delivering resilient, thoughtful construction across residential,
              commercial and coastal projects.
            </p>
          </div>
        </div>
      </section>

      <section class="flex flex-col items-center justify-center p-8 lg:p-16">
        <div class="max-w-4xl">
          <h2 class="text-2xl font-semibold text-center mb-4">Who We Are</h2>
          <p class="text-center text-gray-700 py-4">
            Established in 1999, Sundaram Developers started as a local contractor and has grown into
            a trusted name known for structural excellence, eco-conscious practices, and client-first delivery.
          </p>

          <p class="text-gray-800 mt-6 font-medium">We specialize in:</p>
          <ul class="list-disc ps-8 mt-3 text-gray-700 space-y-2">
            <li>Residential & Commercial Developments</li>
            <li>Smart Infrastructure & Industrial Projects</li>
            <li>Shoreline Erosion Control & Barge Services</li>
            <li>Environmentally Sustainable Construction</li>
          </ul>
        </div>
      </section>

      <section class="flex flex-col items-center justify-center bg-white p-8 lg:p-16">
        <div class="max-w-3xl text-center">
          <h2 class="text-2xl font-semibold mb-4">Our Philosophy</h2>
          <p class="text-gray-700 py-4">
            Every structure should stand the test of time. We combine rigorous engineering, responsible
            materials, and transparent processes to deliver value beyond blueprints — whether it's a luxury villa,
            an industrial shed, or coastal protection works.
          </p>
        </div>
      </section>

      {/* <section class="flex flex-col items-center justify-center bg-white py-16 px-6">
        <div class="max-w-3xl text-center">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-6">📞 Let’s Build Something Together</h2>
          <p class="text-gray-600 mb-6">
            From first consultation to final handover, Sundaram Developers partners with you at every step.
            Reach out to discuss your project.
          </p>

          <div class="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="/contact" class="inline-flex items-center justify-center rounded-md bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 text-sm font-medium shadow">
              Contact Us
            </a>
            <a href="/projects" class="inline-flex items-center justify-center rounded-md border border-slate-200 text-slate-700 px-6 py-3 text-sm hover:bg-slate-50">
              View Projects
            </a>
          </div>

          <blockquote class="mt-8 border-l-4 border-gray-800 pl-4 italic text-gray-700">
            Sundaram Developers — <strong>Crafting Legacies. Building Futures.</strong>
          </blockquote>
        </div>
      </section> */}
    </div>
  </Layout>
);
