import { json, type RequestHandler } from '@sveltejs/kit';
import prisma from '$lib/prisma';

export const POST: RequestHandler = async ({ request }) => {
  const { name, email, password } = await request.json();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });
    if (email === "" || password === "" || name === "") {
      return json({message : 'Please Fill Your Credentials'})
    }
    
    if (existingUser) {
      return json({ message: 'Email already exists' }, { status: 400 });
    }
    if (email == null || password == null || name == null) {
      return json({ message: 'Please Fill Your Credentials' }, { status: 400 });
    }  
    if (!emailPattern.test(email)) {
      return json({ message: 'Email must be a valid address' }, { status: 400 });
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
