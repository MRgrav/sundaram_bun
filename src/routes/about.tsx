import { Layout } from "../components/Layout";
import { Navbar } from "../components/Navbar";

export const About = () => (
  <Layout title="About Us">
    <Navbar />
    <div class="container mx-auto px-4 py-16">
      <h2 class="text-3xl font-bold mb-4">About This Project</h2>
      <p class="text-gray-700">
        Built with Bun, Hono, and Tailwind for pure HTML rendering.
      </p>
    </div>
  </Layout>
);
