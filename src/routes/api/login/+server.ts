// src/routes/api/login.ts

import { RequestHandler } from '@sveltejs/kit';
import prisma from '$lib/prisma';

export const POST: RequestHandler = async ({ request }) => {
    const { email, password } = await request.json();

    try {
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user || user.password !== password) {
            return new Response(JSON.stringify({ message: 'Invalid credentials' }), { status: 401 });
        }

        return new Response(JSON.stringify({ userId: user.id, loggedIn: true }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ message: error.message }), { status: 500 });
    }
};
