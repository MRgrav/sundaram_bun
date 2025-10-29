import { Footer } from "../shared/Footer";
import { Navbar } from "../shared/Navbar";
import { SplashScreen } from "../shared/SplashScreen";
import { TopBar } from "../shared/TopBar";

export const Layout = ({
    title,
    description,
    image,
    url,
    keywords,
    children
  }: {
    title: string
    description?: string
    image?: string
    url?: string
    keywords?: string
    children: any
  }) => (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  
        {/* --- Basic SEO --- */}
        <title>{title}</title>
        <meta name="description" content={description || "Premium real estate and smart homes in Assam."} />
        <meta name="keywords" content={keywords || "real estate, apartments, flats, Assam, Jorhat"} />
  
        {/* --- Canonical URL --- */}
        {url && <link rel="canonical" href={url} />}
  
        {/* --- Open Graph --- */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        {image && <meta property="og:image" content={image} />}
        {url && <meta property="og:url" content={url} />}
        <meta property="og:type" content="website" />
  
        {/* --- Twitter Cards --- */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        {image && <meta name="twitter:image" content={image} />}
  
        {/* --- Resource Hints (Preload/Caching) --- */}
        <link rel="preload" as="style" href="/output.css" />
        <link rel="stylesheet" href="/output.css" />
        <link rel="preload" as="image" href="/images/hero.webp" type="image/webp" />
  
        {/* --- Favicon --- */}
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </head>
      <body class="bg-zinc-100 text-zinc-800 antialiased">
          <SplashScreen 
                    // imageUrl="https://your-domain.com/path/to/logo.png"
                    // appName="My PocketBase App"
                />
        {/* Actual main application content goes here */}
        <div class="hidden-until-load">
          <TopBar />
          <Navbar />
          {children}
          {/* <footer class="text-center text-gray-400 py-12">
            <p>© {new Date().getFullYear()} Sundaram Developers. All rights reserved.</p>
          </footer> */}
          {/* contact */}
          <section class=" px-4 py-20 text-center">
            <div class={"container mx-auto"}>
              <h3 class={"text-4xl font-bold"}>Ready to Find Your dream Home?</h3>
              <div class="flex flex-col sm:flex-row justify-center items-center gap-8 my-6">
                <div class="flex gap-2 items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M21 16.42V19.9561C21 20.4811 20.5941 20.9167 20.0705 20.9537C19.6331 20.9846 19.2763 21 19 21C10.1634 21 3 13.8366 3 5C3 4.72371 3.01545 4.36687 3.04635 3.9295C3.08337 3.40588 3.51894 3 4.04386 3H7.5801C7.83678 3 8.05176 3.19442 8.07753 3.4498C8.10067 3.67907 8.12218 3.86314 8.14207 4.00202C8.34435 5.41472 8.75753 6.75936 9.3487 8.00303C9.44359 8.20265 9.38171 8.44159 9.20185 8.57006L7.04355 10.1118C8.35752 13.1811 10.8189 15.6425 13.8882 16.9565L15.4271 14.8019C15.5572 14.6199 15.799 14.5573 16.001 14.6532C17.2446 15.2439 18.5891 15.6566 20.0016 15.8584C20.1396 15.8782 20.3225 15.8995 20.5502 15.9225C20.8056 15.9483 21 16.1633 21 16.42Z"></path></svg>
                  <span>9886847886</span>
                </div>
                <div class="flex gap-2 items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM12.0606 11.6829L5.64722 6.2377L4.35278 7.7623L12.0731 14.3171L19.6544 7.75616L18.3456 6.24384L12.0606 11.6829Z"></path></svg>
                  <span>sundaramconstjrt15@gmail.com</span>
                </div>
              </div>
              <div>
                <a href="/contact" class="bg-orange-500 rounded-lg px-4 py-2 font-semibold text-orange-100 shadow hover:scale-95">Contact Us</a>
              </div>
            </div>
          </section>
          <Footer />
        </div>
      </body>
    </html>
  );
  