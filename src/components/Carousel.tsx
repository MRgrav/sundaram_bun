import { html } from "hono/html";
import type { FC } from "hono/jsx";
import { CarouselItem } from "../types/types";


export const Carousel: FC<{ items: CarouselItem[] }> = ({ items }) => (
  <section class="relative overflow-hidden">
    <div id="carousel" class="relative h-[70vh] min-h-[500px] w-full">
      {items.map((slide, index) => (
        <div
          class={`carousel-slide absolute inset-0 transition-opacity duration-700 ease-in-out ${
            index === 0 ? "opacity-100 z-10" : "opacity-0"
          }`}
        >
          <img
            src={`https://baas.sundaramdevelopers.in/api/files/${slide.collectionId}/${slide.id}/${slide.field}`}
            alt={slide.title}
            class="w-full h-full object-cover backdrop-brightness-50"
            // loading="lazy"
          />

          <div class="absolute inset-0 bg-linear-to-t from-black/80 via-black/60 to-transparent flex items-center justify-start px-10 md:px-20">
            <div class="max-w-xl text-white space-y-6 animate-fadeIn">
              <p class="text-lg md:text-xl text-gray-200">{slide.sub}</p>
              <h2 class="text-5xl md:text-6xl font-bold">{slide.title}</h2>
              <div class={"flex gap-2"}>
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M11 17.9381C7.05369 17.446 4 14.0796 4 10C4 5.58172 7.58172 2 12 2C16.4183 2 20 5.58172 20 10C20 14.0796 16.9463 17.446 13 17.9381V20.0116C16.9463 20.1039 20 20.7351 20 21.5C20 22.3284 16.4183 23 12 23C7.58172 23 4 22.3284 4 21.5C4 20.7351 7.05369 20.1039 11 20.0116V17.9381ZM12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z"></path></svg>
                </div>
                <span>
                  {slide.address}
                </span>
              </div>
              <div class="space-x-4 hidden">
                <a
                  href={slide.visit_link}
                  target="_blank"
                  class="bg-teal-600 hover:bg-teal-700 px-6 py-3 rounded-lg text-white font-semibold"
                >
                  Visit Site
                </a>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(slide.address)}`}
                  target="_blank"
                  class="border border-white px-6 py-3 rounded-lg text-white hover:bg-white hover:text-black transition"
                >
                  View Address
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Pagination Dots */}
      {/* <div class="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex space-x-4">
        {items.map((_, i) => (
          <button
            class={`dot w-3 h-3 md:w-4 md:h-4 rounded-full transition-all ${
              i === 0 ? "bg-white/80" : "bg-white/30"
            }`}
          ></button>
        ))}
      </div> */}
    </div>

    {/* Animate FadeIn */}
    <style>{`
      .fadeIn {
        animation: fadeIn 0.8s ease-in-out forwards;
      }
      @keyframes fadeIn {
        0% { opacity: 0; transform: translateY(20px); }
        100% { opacity: 1; transform: translateY(0); }
      }
    `}</style>

    {/* ✅ Add raw script so browser executes it */}
    {html`
      <script>
        const slides = document.querySelectorAll('.carousel-slide');
        const dots = document.querySelectorAll('.dot');
        let current = 0;
        let autoplay = true;

        function showSlide(index) {
          slides.forEach((slide, i) => {
            slide.style.opacity = i === index ? '1' : '0';
            slide.style.zIndex = i === index ? '10' : '0';
          });
          dots.forEach((dot, i) => {
            dot.classList.toggle('bg-white/80', i === index);
            dot.classList.toggle('bg-white/30', i !== index);
          });
          current = index;
        }

        setInterval(() => {
          if (autoplay) {
            current = (current + 1) % slides.length;
            showSlide(current);
          }
        }, 5000);

        dots.forEach((dot, i) =>
          dot.addEventListener('click', () => showSlide(i))
        );
        const carousel = document.getElementById('carousel');
        carousel.addEventListener('mouseenter', () => autoplay = false);
        carousel.addEventListener('mouseleave', () => autoplay = true);
      </script>
    `}
  </section>
);
