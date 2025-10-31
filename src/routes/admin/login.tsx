import { AuthLayout } from "../../components/layouts/AuthLayout";

export const Login = () => {
    return (
        <AuthLayout title="Login">
            <div class={"min-h-screen flex flex-col justify-center items-center"}>
                <div class={"max-w-[500px] rounded shadow p-4 bg-white"}>
                    <h1 class={"text-right font-bold uppercase text-2xl text-blue-700 mb-8"}>Login</h1>
                    <form
                        method="post"
                        action="/^/login"
                        // hx-swap="none"
                        // hx-target="closest form"
                        className="max-w-md bg-zinc-200 p-6 rounded shadow"
                        // onSubmit={(e) => e.preventDefault()} // optional for SPA frameworks
                    >
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email or Username
                            </label>
                            <input
                                type="text"
                                id="identity"
                                name="email"
                                required
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
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

                        <button
                            type="submit"
                            className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Sign In
                        </button>
                    </form>

                    <center>
                        <a href="/^^/registration" class={"text-sm text-blue-800"}>Create new account!</a>
                    </center>
                </div>
            </div>
        </AuthLayout>
    );
}