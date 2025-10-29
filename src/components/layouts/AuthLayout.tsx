import type { FC } from 'hono/jsx';
import { html } from 'hono/html';
import { AuthUser } from '../../lib/pocketbase'; // Import the user type

export const AuthLayout: FC<{ title: string, children?: any }> = ({ title, children }) => {
    return (
        <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>{title} | Sundaram Developers</title>
                <script src="https://cdn.tailwindcss.com"></script>
            </head>
            <body class="relative bg-zinc-100 min-h-screen">
                <main class="container mx-auto ">
                    {children}
                </main>
                <div class={"absolute w-fit top-0 right-28 rounded-b-xl text-2xl shadow-xl px-5 py-2 bg-rose-600 text-red-100"}>
                    <strong>Admin</strong>
                </div>
            </body>
        </html>
    );
};