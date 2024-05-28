// src/routes/api/user.ts
import { RequestHandler } from '@sveltejs/kit';
import prisma from '$lib/prisma';

export const GET: RequestHandler = async ({ request }) => {
  const cookies = request.headers.get('Cookie');
  if (!cookies) {
    return {
      status: 401,
      body: JSON.stringify({ message: 'Unauthorized' })
    };
  }

  const token = cookies.split(';').find(cookie => cookie.trim().startsWith('token='));
  if (!token) {
    return {
      status: 401,
      body: JSON.stringify({ message: 'Unauthorized' })
    };
  }

  const userId = token.split('=')[1]; // Assuming token is 'token=userId'
  if (!userId) {
    return {
      status: 401,
      body: JSON.stringify({ message: 'Unauthorized' })
    };
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId) }
    });

    if (!user) {
      return {
        status: 404,
        body: JSON.stringify({ message: 'User not found' })
      };
    }

    return {
      status: 200,
      body: JSON.stringify(user)
    };
  } catch (error) {
    return {
      status: 500,
      body: JSON.stringify({ message: error.message })
    };
  }
};
