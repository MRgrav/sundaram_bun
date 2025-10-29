import { AuthLayout } from "../../components/layouts/AuthLayout";

export const Registration = () => {
    return (
        <AuthLayout title="Registration">
            <div class={"min-h-screen flex flex-col justify-center items-center"}>
                <div class={"max-w-[500px] rounded shadow p-4 bg-white"}>
                    <h1 class={"text-right font-bold uppercase text-2xl text-fuchsia-600 mb-8"}>Registration</h1>
                    <form method="post" action="/login" class="max-w-md bg-zinc-200 p-6 rounded shadow">
                        <div class="mb-4">
                            <label class="block text-zinc-700 text-sm font-bold mb-2" for="identity">Name</label>
                            <input type="text" id="identity" name="identity" required class="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700" />
                        </div>
                        <div class="mb-6">
                            <label class="block text-zinc-700 text-sm font-bold mb-2" for="password">Email</label>
                            <input type="email" id="email" name="email" required class="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700" />
                        </div>
                        <div class="mb-6">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
                            <input type="password" id="password" name="password" required class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" />
                        </div>
                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="identity">Confirm Password</label>
                            <input type="password" id="confirm-password" name="confirm-password" required class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" />
                        </div>
                        <button type="submit" class="bg-fuchsia-500 hover:bg-fuchsia-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Sign In</button>
                    </form>
                    <center>
                        <a href="/login" class={"text-sm text-blue-800"}>Account already exists!</a>
                    </center>
                </div>
            </div>
        </AuthLayout>
    );
}