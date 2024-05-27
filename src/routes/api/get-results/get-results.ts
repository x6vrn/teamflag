import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
    const { challenge, answer } = await request.json();

    let correctAnswer = '';

    switch (challenge) {
        case 'challenge1':
            correctAnswer = 'hiddenmessage'; // استبدل بالإجابة الصحيحة
            break;
        case 'challenge2':
            correctAnswer = 'hello world'; // استبدل بالإجابة الصحيحة
            break;
        case 'challenge3':
            correctAnswer = 'flag{web_exploit}'; // استبدل بالإجابة الصحيحة
            break;
        default:
            return new Response(JSON.stringify({ message: 'Invalid challenge' }), { status: 400 });
    }

    const message = answer.trim().toLowerCase() === correctAnswer ? 'Correct!' : 'Incorrect!';

    return new Response(JSON.stringify({ message }), { status: 200 });
};
