import { json, type RequestHandler } from '@sveltejs/kit';
import prisma from '$lib/prisma';

export const GET: RequestHandler = async () => {
  try {
    const users = await prisma.user.findMany();
    return json(users, { status: 200 });
  } catch (error) {
    return json({ message: error.message }, { status: 500 });
  }
};

export const POST: RequestHandler = async ({ request }) => {
  const { name, email, password } = await request.json();

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return json({ message: 'Email already exists' }, { status: 400 });
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password // تخزين كلمة المرور كما هي بدون تشفير
      }
    });

    return json({ message: 'User created successfully' }, { status: 201 });
  } catch (error) {
    return json({ message: error.message }, { status: 500 });
  }
};
