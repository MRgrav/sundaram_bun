import type { FC } from 'hono/jsx';
import { html } from 'hono/html';

interface SplashScreenProps {
    imageUrl?: string;
    appName?: string;
}

export const SplashScreen: FC<SplashScreenProps> = ({ 
    // Use a placeholder image for default if no URL is provided
    imageUrl = 'logo.png', 
    appName = 'Sundaram Developers' 
}) => {
    
    // Custom CSS for the wave effect (pulsating box-shadow)
    const customStyles = `
        /* Define the wave animation */
        @keyframes pulse-wave {
            0% {
                /* Start with a subtle shadow (zinc-400 is equivalent to #94a3b8) */
                box-shadow: 0 0 0 0 rgba(148, 163, 184, 0.7); 
                transform: scale(0.95);
            }
            70% {
                /* Expand the shadow and fade it out */
                box-shadow: 0 0 0 30px rgba(148, 163, 184, 0); 
                transform: scale(1);
            }
            100% {
                box-shadow: 0 0 0 0 rgba(148, 163, 184, 0); 
                transform: scale(0.95);
            }
        }
        
        .wave-center {
            /* Apply the animation */
            animation: pulse-wave 1s infinite cubic-bezier(0.2, 0.6, 0.3, 1.2);
        }
        
        /* Animation for the bounce dots */
        @keyframes bounce {
            0%, 100% { transform: translateY(-25%); }
            50% { transform: translateY(0); }
        }
        .animate-bounce {
            animation: bounce 0.8s infinite;
        }
        .delay-150 { animation-delay: 0.15s; }
        .delay-300 { animation-delay: 0.3s; }
    `;

    return (
        // Full screen, fixed position, high Z-index to cover all content
        <div class="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-zinc-900/50 backdrop-blur-xs transition-opacity duration-300 ease-in-out" id="splash-screen">
            
            {/* Inject CSS styles */}
            {html`<style>${customStyles}</style>`}

            {/* Central element with wave effect */}
            <div class="relative flex items-center justify-center">
                <div 
                    class="wave-center bg-zinc-200 rounded-full p-4 shadow-2xl transition-all"
                    style={{ width: '200px', height: '200px' }}
                >
                    {/* Image in the center */}
                    <img 
                        src={imageUrl} 
                        alt="Loading Logo" 
                        class="h-full w-full object-contain rounded-full"
                        // Fallback image source in case the provided URL fails
                        onerror="this.onerror=null; this.src='https://placehold.co/100x100/1e293b/ffffff?text=LOGO';"
                    />
                </div>
            </div>

            {/* Loading text/App Name */}
            {/* <p class="mt-8 text-2xl font-semibold text-zinc-300">
                {appName}
            </p> */}

            {/* Three-dot loading animation */}
            {/* <div class="flex space-x-2 mt-4">
                <div class="w-2.5 h-2.5 bg-indigo-400 rounded-full animate-bounce"></div>
                <div class="w-2.5 h-2.5 bg-indigo-400 rounded-full animate-bounce delay-150"></div>
                <div class="w-2.5 h-2.5 bg-indigo-400 rounded-full animate-bounce delay-300"></div>
            </div> */}

            {/* --- Client-Side Script to Hide Splash Screen --- */}
            {html`
                <script>
                    (function() {
                        const splash = document.getElementById('splash-screen');
                        
                        // Wait for the full DOM to load AND simulate a min-load time of 2s
                        Promise.all([
                            new Promise(resolve => { 
                                if (document.readyState === 'complete') {
                                    resolve();
                                } else {
                                    window.addEventListener('load', resolve);
                                }
                            }),
                            new Promise(resolve => setTimeout(resolve, 2000))
                        ]).then(() => {
                            if (splash) {
                                // Start fade out animation by setting opacity to 0
                                splash.style.opacity = '0'; 

                                // Remove element after the CSS transition completes (0.5s)
                                splash.addEventListener('transitionend', () => {
                                    splash.remove();
                                });
                            }
                            // Ensure body scroll is restored
                            document.body.style.overflow = 'auto';
                        });
                    })();
                </script>
            `}
        </div>
    );
};