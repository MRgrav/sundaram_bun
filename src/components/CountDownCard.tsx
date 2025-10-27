import { html } from 'hono/html';
import type { FC } from 'hono/jsx';

interface CountdownAnimatorProps {
  targetNumber: number;
  // Optional: Unique ID to support multiple instances on one page
  id?: string;
  label?: string; // New label prop
  isPlus?: boolean; // Controls the '+' suffix
  // Optional: Duration of the animation in milliseconds
  duration?: number;
  // New props for customization
  numberClass?: string;
  labelClass?: string;
}

export const CountdownCard: FC<CountdownAnimatorProps> = ({ 
  targetNumber, 
  id = `count-up-${Math.random().toString(36).substring(2, 9)}`, 
  label,
  isPlus = false,
  duration = 2000,
  numberClass = "text-6xl font-extrabold text-blue-100 border-b-4 border-blue-400/50",
  labelClass = "text-xl font-medium text-zinc-300 mt-2"
}) => {
  
  const targetId = `target-${id}`;

  return (
    <div class="flex flex-col items-center justify-center p-6 text-center">
      <div 
        class={`inline-block ${numberClass}`}
      >
        <span 
          id={targetId}
          data-target={targetNumber}
          data-duration={duration}
          data-is-plus={isPlus ? 'true' : 'false'}
          aria-live="polite"
        >
          0
        </span>
        {isPlus && (
            <span class="ml-1 text-inherit"></span>
        )}
      </div>

      {label && (
        <p class={labelClass}>
          {label}
        </p>
      )}

      {/* Inject the encapsulated Vanilla JavaScript logic */}
      {html`
        <script>
          // 👇 FIX: Encapsulate the entire script block in an IIFE
          (function() {
            // Function to animate a single counter element
            function animateCounter(element, target, duration, shouldAppendPlus) {
              let start = 0;
              const startTime = performance.now();
              const difference = target - start;
              const plusSuffix = shouldAppendPlus ? '+' : '';

              function step(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing function (easeOutQuad)
                const easedProgress = progress * (2 - progress);

                const currentValue = Math.floor(start + difference * easedProgress);
                
                element.textContent = currentValue.toLocaleString() + plusSuffix;

                if (progress < 1) {
                  requestAnimationFrame(step);
                } else {
                  element.textContent = target.toLocaleString() + plusSuffix; 
                  element.setAttribute('data-animated', 'true'); 
                }
              }

              requestAnimationFrame(step);
            }

            // 👇 FIX: 'observer' is now a local variable inside the IIFE,
            // preventing the global redeclaration error.
            const observer = new IntersectionObserver((entries, observer) => {
              entries.forEach(entry => {
                const element = entry.target;
                if (entry.isIntersecting && element.getAttribute('data-animated') !== 'true') {
                  const target = parseInt(element.getAttribute('data-target'));
                  const duration = parseInt(element.getAttribute('data-duration'));
                  const isPlus = element.getAttribute('data-is-plus') === 'true';
                  
                  if (!isNaN(target) && !isNaN(duration)) {
                    animateCounter(element, target, duration, isPlus);
                    observer.unobserve(element);
                  }
                }
              });
            }, { 
              threshold: 0.1 
            });

            // Find the specific counter element using the dynamically generated ID
            const counterElement = document.getElementById('${targetId}');
            
            if (counterElement) {
              observer.observe(counterElement);
            }
          })(); // End of the IIFE
        </script>
      `}
    </div>
  );
};