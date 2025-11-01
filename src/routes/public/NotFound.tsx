import { Layout } from "../../components/layouts/Layout";

export const NotFound = () => {
    return (
        <Layout title="404">
            <div class={"min-h-screen flex flex-col items-center justify-center gap-6"}>
                <img src="/logo.png" class={"w-44 h-44"} />
                <h1 class={"text-4xl font-bold"}>404</h1>
                <h2 class={"text-lg "}>Not Found</h2>
                <div class={"flex justify-center"}>
                    <a href="/" class={"px-4 py-1.5 rounded-md bg-blue-600 text-sky-100 shadow"}>Home</a>
                </div>
            </div>
        </Layout>
    );
}