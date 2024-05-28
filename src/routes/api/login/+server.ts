import { json, type RequestHandler } from '@sveltejs/kit';
import prisma from '$lib/prisma';
import { generateToken } from '$lib/auth';

export const POST: RequestHandler = async ({ request }) => {
  const { email, password } = await request.json();

  try {
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user || user.password !== password) {
      return json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const token = generateToken(user.id);

    return json({ token }, { status: 200 });
  } catch (error) {
    return json({ message: error.message }, { status: 500 });
  }
};
