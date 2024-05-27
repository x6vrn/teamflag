import { json } from '@sveltejs/kit';

const correctAnswers = {
    challenge1: 'flag{y0u_f1x_7h3_1m9}',
    challenge2: 'flag{d3crypt_15_345y}',
    challenge3: 'webexploitflag'
};

export const POST = async ({ request }) => {
    const { challenge, answer } = await request.json();
    const correctAnswer = correctAnswers[challenge];

    if (correctAnswer && answer.toLowerCase() === correctAnswer) {
        return json({ message: 'Correct!' });
    } else {
        return json({ message: 'Incorrect!' });
    }
};
