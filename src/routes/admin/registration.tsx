import { AuthLayout } from "../../components/layouts/AuthLayout";

export const Registration = () => {
  return (
    <AuthLayout title="Registration">
      <div className="min-h-screen flex flex-col justify-center items-center">
        <div className="max-w-[500px] rounded shadow p-4 bg-white">
          <h1 className="text-right font-bold uppercase text-2xl text-fuchsia-600 mb-8">
            Registration
          </h1>

          {/* HTMX form: posts to /auth/start, swaps the form with response, and handles errors */}
          <form
            hx-post="/^/start"
            hx-swap="outerHTML"
            hx-target="closest form"
            className="max-w-md bg-zinc-200 p-6 rounded shadow"
            onSubmit={(e) => e.preventDefault()} // optional client prevention for SPA frameworks
          >
            <div className="mb-4">
              <label className="block text-zinc-700 text-sm font-bold mb-2" htmlFor="identity">
                Name
              </label>
              <input
                type="text"
                id="identity"
                name="name"
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700"
              />
            </div>

            <div className="mb-6">
              <label className="block text-zinc-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirm-password">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm-password"
                name="passwordConfirm"
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              />
            </div>

            <button
              type="submit"
              className="bg-fuchsia-500 hover:bg-fuchsia-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign Up
            </button>
          </form>

          <center>
            <a href="/^^/login" className="text-sm text-blue-800">
              Account already exists!
            </a>
          </center>
        </div>
      </div>
    </AuthLayout>
  );
};
