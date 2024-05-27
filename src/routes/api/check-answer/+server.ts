import { json } from '@sveltejs/kit';

const correctAnswers = {
    challenge1: 'hiddenmessage',
    challenge2: 'helloworld',
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
