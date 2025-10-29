import { AuthLayout } from "../../components/layouts/AuthLayout";

export const Login = () => {
    return (
        <AuthLayout title="Login">
            <div class={"min-h-screen flex flex-col justify-center items-center"}>
                <div class={"max-w-[500px] rounded shadow p-4 bg-white"}>
                    <h1 class={"text-right font-bold uppercase text-2xl text-blue-700 mb-8"}>Login</h1>
                    <form method="post" action="/login" class="max-w-md bg-zinc-200 p-6 rounded shadow">
                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="identity">Email or Username</label>
                            <input type="text" id="identity" name="identity" required class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" />
                        </div>
                        <div class="mb-6">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
                            <input type="password" id="password" name="password" required class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" />
                        </div>
                        <button type="submit" class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Sign In</button>
                    </form>
                    <center>
                        <a href="/registration" class={"text-sm text-blue-800"}>Create new account!</a>
                    </center>
                </div>
            </div>
        </AuthLayout>
    );
}