import { html } from 'hono/html';
import { FC } from 'hono/jsx';

// Define the structure of a single slide item
type Slide = {
    title: string;
    description: string;
    buttonText: string;
    buttonUrl: string;
    image: string;
};

// Component props
interface HeroSliderProps {
    slidesData: Slide[];
}

// Fallback images array (copied from your JS for the fallback function)
const fallbacks = [
    'https://picsum.photos/id/1018/1920/1080',
    'https://picsum.photos/id/1015/1920/1080',
    'https://picsum.photos/id/1019/1920/1080'
];

// The main Hono/JSX component
export const HeroSlider: FC<HeroSliderProps> = ({ slidesData }) => {
    // Inject the CSS styles directly into the component for a cleaner setup, 
    // or you can move them to your main CSS file.
    const sliderStyles = `
        .hero-slide {
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .slide-content {
            transition: all 0.6s ease 0.3s;
        }
        .fade-in {
            animation: fadeIn 1s ease-in;
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `;

    return (
        <>
            {/* Inject the styles */}
            {html`<style>${sliderStyles}</style>`}

            {/* Main slider container. ID is crucial for the Vanilla JS */}
            <div id="hero-slider" class="relative overflow-hidden" 
                 onMouseEnter={"document.getElementById('hero-slider').__slider.pause()" as any} 
                 onMouseLeave={"document.getElementById('hero-slider').__slider.play()" as any} >
                 
                <div class="relative h-[80vh] min-h-[500px]">
                    {/* Map over the slides to render each one */}
                    {slidesData.map((slide, index) => (
                        <div
                            key={index}
                            data-slide-index={index}
                            className={`absolute inset-0 hero-slide opacity-0 transition-opacity duration-800 ease-in-out ${index === 0 ? 'opacity-100' : ''}`}
                            style={{ transitionProperty: 'opacity' }} // Explicitly ensure transition
                        >
                            {/* Background Image */}
                            <div class="absolute inset-0 bg-gray-800">
                                <img
                                    src={slide.image}
                                    alt={slide.title}
                                    className="w-full h-full object-cover opacity-80"
                                    onError={`this.src = ${JSON.stringify(fallbacks)}[${index} % ${fallbacks.length}]`} // Inline error handler
                                    loading="lazy"
                                />
                            </div>

                            {/* Content Block */}
                            <div class="container mx-auto px-6 h-full flex items-center">
                                <div
                                    data-content-index={index}
                                    className={`max-w-2xl text-white slide-content transition-all duration-600 ease-in-out delay-300 ${index === 0 ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}
                                >
                                    <h2 class="text-4xl md:text-5xl font-bold mb-4">{slide.title}</h2>
                                    <p class="text-xl md:text-2xl mb-8">{slide.description}</p>
                                    <a
                                        href={slide.buttonUrl}
                                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors fade-in"
                                    >
                                        {slide.buttonText}
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                    
                    {/* Previous Button */}
                    <button
                        onClick={"document.getElementById('hero-slider').__slider.prev()" as any}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center z-10 transition-all"
                        aria-label="Previous slide"
                    >
                        {/* SVG */}
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    {/* Next Button */}
                    <button
                        onClick={"document.getElementById('hero-slider').__slider.next()" as any}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center z-30 transition-all"
                        aria-label="Next slide"
                    >
                        {/* SVG */}
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    {/* Dots Navigation */}
                    <div id="slider-dots" class="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
                        {slidesData.map((_, index) => (
                            <button
                                key={index}
                                data-dot-index={index}
                                onClick={`document.getElementById('hero-slider').__slider.goTo(${index})` as any}
                                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all ${index === 0 ? 'bg-white w-4 md:w-6' : 'bg-white/50'}`}
                                aria-label={`Go to slide ${index + 1}`}
                            ></button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Vanilla JavaScript for the actual slideshow logic */}
            {html`
                <script>
                    function HeroSliderLogic(containerId, slideCount, intervalTime = 5000) {
                        const container = document.getElementById(containerId);
                        let currentSlide = 0;
                        let autoplay = true;
                        let interval = null;

                        const slides = Array.from(container.querySelectorAll('.hero-slide'));
                        const contents = Array.from(container.querySelectorAll('[data-content-index]'));
                        const dots = Array.from(container.querySelectorAll('[data-dot-index]'));

                        function updateUI(newIndex) {
                            if (newIndex === currentSlide) return; // Prevent unnecessary updates

                            // Hide old slide and content
                            const oldSlide = slides[currentSlide];
                            const oldContent = contents[currentSlide];
                            const oldDot = dots[currentSlide];
                            
                            oldSlide.classList.remove('opacity-100');
                            oldContent.classList.remove('translate-x-0', 'opacity-100');
                            oldContent.classList.add('translate-x-10', 'opacity-0');
                            oldDot.classList.remove('bg-white', 'w-4', 'md:w-6');
                            oldDot.classList.add('bg-white/50');
                            
                            currentSlide = newIndex;

                            // Show new slide and content
                            const newSlide = slides[currentSlide];
                            const newContent = contents[currentSlide];
                            const newDot = dots[currentSlide];

                            newSlide.classList.add('opacity-100');
                            newContent.classList.remove('translate-x-10', 'opacity-0');
                            newContent.classList.add('translate-x-0', 'opacity-100');
                            newDot.classList.remove('bg-white/50');
                            newDot.classList.add('bg-white', 'w-4', 'md:w-6');
                        }

                        function next() {
                            const newIndex = (currentSlide + 1) % slideCount;
                            updateUI(newIndex);
                        }

                        function prev() {
                            const newIndex = (currentSlide - 1 + slideCount) % slideCount;
                            updateUI(newIndex);
                        }

                        function goTo(index) {
                            if (index >= 0 && index < slideCount) {
                                updateUI(index);
                            }
                        }

                        function startAutoplay() {
                            if (interval) clearInterval(interval);
                            interval = setInterval(() => {
                                if (autoplay) {
                                    next();
                                }
                            }, intervalTime);
                        }

                        function pause() {
                            autoplay = false;
                        }

                        function play() {
                            autoplay = true;
                        }

                        // Start logic and expose API to the container element
                        startAutoplay();
                        container.__slider = { next, prev, goTo, pause, play };
                    }
                    
                    // Initialization once the DOM is ready
                    document.addEventListener('DOMContentLoaded', () => {
                        const sliderElement = document.getElementById('hero-slider');
                        if (sliderElement) {
                            // The actual number of slides is derived from the DOM
                            const slideCount = sliderElement.querySelectorAll('.hero-slide').length;
                            HeroSliderLogic('hero-slider', slideCount, 5000);
                        }
                    });
                </script>
            `}
        </>
    );
};