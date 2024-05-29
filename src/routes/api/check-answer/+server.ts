import { RequestHandler } from '@sveltejs/kit';
import prisma from '$lib/prisma';

export const POST: RequestHandler = async ({ request }) => {
    const { userId, challenge, answer } = await request.json();

    if (!userId) {
        return new Response(JSON.stringify({ message: 'User ID is missing' }), { status: 400 });
    }

    try {
        console.log(`Received data: userId=${userId}, challenge=${challenge}, answer=${answer}`);

        // تحقق من صحة الإجابة بناءً على التحدي
        let isCorrect = false;

        switch (challenge) {
            case 'challenge1':
                isCorrect = (answer === 'flag{y0u_f1x_7h3_1m9'); // تأكد من تعديل 'expectedAnswer1' بالإجابة الصحيحة الفعلية
                break;
            case 'challenge2':
                isCorrect = (answer === 'flag{d3crypt_15_345y}'); // تأكد من تعديل 'expectedAnswer2' بالإجابة الصحيحة الفعلية
                break;
            case 'challenge3':
                isCorrect = (answer === 'expectedAnswer3'); // تأكد من تعديل 'expectedAnswer3' بالإجابة الصحيحة الفعلية
                break;
            default:
                throw new Error('Invalid challenge');
        }

        if (isCorrect) {
            console.log('Answer is correct. Updating user points.');

            // تحديث نقاط المستخدم في قاعدة البيانات
            const updatedUser = await prisma.user.update({
                where: { id: parseInt(userId, 10) },
                data: {
                    points: {
                        increment: 100
                    }
                }
            });

            console.log(`User points updated: ${updatedUser.points}`);

            return new Response(JSON.stringify({ message: 'Correct!' }), { status: 200 });
        } else {
            return new Response(JSON.stringify({ message: 'Incorrect' }), { status: 200 });
        }
    } catch (error) {
        console.error('Error updating user points:', error);
        return new Response(JSON.stringify({ message: error.message }), { status: 500 });
    }
};
