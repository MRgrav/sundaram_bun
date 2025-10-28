import type { FC } from 'hono/jsx';
import { html } from 'hono/html';
import { Layout } from '../components/Layout';

export const Contact: FC = () => {
  return (
    <Layout title="Contact Us" >

      <div class="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div class="max-w-7xl mx-auto">
          
          <h1 class="text-4xl font-extrabold text-slate-900 text-center mb-4">
            Get In Touch
          </h1>
          <p class="text-xl text-slate-600 text-center mb-12">
            We'd love to hear from you! Fill out the form or use the contact details below.
          </p>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* 1. Contact Information Blocks */}
            <div class="space-y-6">
              
              {/* Grid for Contact Info Cards */}
              <div class="grid grid-cols-1 gap-6">
                <div class="bg-white rounded-lg shadow-xl p-6 border-t-4 border-sky-500">
                  <h3 class="text-lg font-medium mb-2 flex items-center gap-2 text-sky-700">
                    📞 Call Us
                  </h3>
                  <p class="text-slate-700 text-xl font-semibold mb-6">+91-8256009114</p>
                {/* </div>

                <div class="bg-white rounded-lg shadow-xl p-6 border-t-4 border-sky-500"> */}
                  <h3 class="text-lg font-medium mb-2 flex items-center gap-2 text-sky-700">
                    📧 Email
                  </h3>
                  <p class="text-slate-700 text-xl font-semibold wrap_break-words">developerssundaram@gmail.com</p>
                </div>
              </div>

              {/* Visit Us Card (Full width for better address display) */}
              <div class="bg-white rounded-lg shadow-xl p-6 border-t-4 border-sky-500">
                <h3 class="text-lg font-medium mb-2 flex items-center gap-2 text-sky-700">
                  📍 Visit Us At
                </h3>
                <address class="not-italic text-slate-700 text-xl font-medium">
                  Tarazan, AT Road<br />
                  Jorhat, Assam
                </address>
              </div>

              {/* Optional: Add a simple map placeholder */}
              <div class="bg-gray-200 h-64 rounded-lg overflow-hidden shadow-xl">
                {/* <p class="p-4 text-slate-600">Map Placeholder</p> */}
                {/*  */}
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14251.49087970285!2d94.1702458871582!3d26.74843750000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7a678b0f928852b%3A0x8653c53b0b2a513b!2sSundaram%20Developers!5e0!3m2!1sen!2sin!4v1761633991264!5m2!1sen!2sin" width="600" height="450" style="border:0;" allowfullscreen={true} loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
              </div>

            </div>

            {/* 2. Contact Form */}
            <div>
              <form
                id="contactForm"
                class="bg-white rounded-lg shadow-2xl p-8 space-y-5"
                method="post"
                action="/api/pocketbase/submit-contact"
              >
                <h2 class="text-3xl font-bold text-slate-800 mb-6">Send Us a Message</h2>
                <input type="hidden" name="collection" value="contacts" />

                {/* Name */}
                <div>
                  <label class="block text-sm font-medium text-slate-700 mb-1" for="name">Name</label>
                  <input id="name" name="name" required class="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-sky-500 focus:border-sky-500 transition duration-150" />
                </div>

                {/* Email */}
                <div>
                  <label class="block text-sm font-medium text-slate-700 mb-1" for="email">Email</label>
                  <input id="email" name="email" type="email" required class="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-sky-500 focus:border-sky-500 transition duration-150" />
                </div>

                {/* Phone */}
                <div>
                  <label class="block text-sm font-medium text-slate-700 mb-1" for="phone">Phone</label>
                  <input id="phone" name="phone" type="tel" required class="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-sky-500 focus:border-sky-500 transition duration-150" />
                </div>

                {/* Message */}
                <div>
                  <label class="block text-sm font-medium text-slate-700 mb-1" for="message_query">Message</label>
                  <textarea id="message_query" name="message_query" rows={6} required class="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-sky-500 focus:border-sky-500 transition duration-150"></textarea>
                </div>

                {/* Submit Button & Status */}
                <div class="flex items-center gap-4 pt-2">
                  <button type="submit" class="inline-flex items-center justify-center rounded-lg bg-sky-600 hover:bg-sky-700 text-white px-8 py-3 text-lg font-medium shadow-lg transition-colors duration-200">
                    Send Message
                  </button>

                  <p id="formStatus" class="text-sm font-medium text-slate-600"></p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Client-side script for interactivity (placed outside the main JSX structure for clarity) */}
      {html`
        <script>
          (function () {
            const form = document.getElementById('contactForm');
            const status = document.getElementById('formStatus');

            form.addEventListener('submit', async function (e) {
              e.preventDefault();
              
              // Disable button and show status
              const submitButton = form.querySelector('button[type="submit"]');
              submitButton.disabled = true;
              status.textContent = 'Sending…';
              status.classList.remove('text-green-600', 'text-red-600');
              
              const data = new FormData(form);

              try {
                const res = await fetch(form.action, {
                  method: 'POST',
                  body: data,
                });

                if (!res.ok) throw new Error(\`Server error: \${res.status}\`);

                status.textContent = 'Message sent — we will get back to you!';
                status.classList.add('text-green-600');
                form.reset();
                
              } catch (err) {
                console.error('Contact Form Submission Error:', err);
                status.textContent = 'Failed to send. Please try again later.';
                status.classList.add('text-red-600');
              } finally {
                submitButton.disabled = false;
              }
            });
          })();
        </script>
      `}
    </Layout>
  );
};