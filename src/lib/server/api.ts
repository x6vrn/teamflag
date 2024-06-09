import prisma from '$lib/prisma';

export async function signup(name: string, email: string, password: string): Promise<void> {
    
    const response = await fetch('/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to sign up');
    }
  }
  
  export async function getUsers(): Promise<User[]> {
    const response = await fetch('/api/user');
  
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    return response.json();
  }
  export async function getPoints(userId: number): Promise<number> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { points: true }
    });
  
    return user?.points || 0;
  }