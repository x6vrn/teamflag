<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';

    let isLoggedIn = false;

    onMount(() => {
        isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        if (!isLoggedIn) {
            goto('/auth');
        }
    });

    let answer1 = '';
    let answer2 = '';
    let answer3 = '';
    let result1 = '';
    let result2 = '';
    let result3 = '';

    // تحميل النتائج من التخزين المحلي عند تحميل الصفحة
    onMount(() => {
        result1 = localStorage.getItem('result1') || '';
        result2 = localStorage.getItem('result2') || '';
        result3 = localStorage.getItem('result3') || '';
    });

    async function checkAnswer(challenge, answer, resultSetter, resultKey) {
        try {
            // التحقق مما إذا تم حل التحدي بالفعل
            const solved = localStorage.getItem(resultKey) === 'Correct!';

            if (solved) {
                resultSetter('You already solved this challenge!');
                return;
            }

            const response = await fetch('/api/check-answer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ challenge, answer }),
            });

            const result = await response.json();
            resultSetter(result.message);

            // حفظ النتيجة في التخزين المحلي
            localStorage.setItem(resultKey, result.message);
        } catch (error) {
            resultSetter('خطأ: ' + error.message);
        }
    }    
</script>

<!-- النموذج -->
<div class="login-form">
    <h2>Login or Register</h2>
    <button on:click={() => goto('/auth')}>Go to Auth Page</button>
</div>

<header>
    <h1>CTF Challenges</h1>
</header>
<nav>
    <a href="/">Home</a>
    <a href="/contacts">Contact</a>
    <a href="/CTF">CTF</a>
    <a href="/Login">Login</a>
</nav>
<div class="container">
    <div id="ctf" class="section">
        <h2>Welcome to the CTF Challenges</h2>
        <p>Here you can test your skills with various computer and cybersecurity challenges. Good luck!</p>
        <div class="challenges">
            <div class="challenge">
                <div class="container">
    <div id="ctf" class="section">
        <h2>Welcome to the CTF Challenges</h2>
        <p>Here you can test your skills with various computer and cybersecurity challenges. Good luck!</p>
        <div class="challenges">
            <div class="challenge">
                <h3>Challenge 1: Corrupted image</h3>
                <p>Fix the corrupted image <a href="https://drive.google.com/file/d/1cB9wuwm1be4iDHBYCHGEBbWpbFTHIfwn/view?usp=sharing">image</a>.</p>
                <input type="text" bind:value={answer1} placeholder="Your answer...">
                <button on:click={() => checkAnswer('challenge1', answer1, (msg) => result1 = msg)}>Submit</button>
                <div class="result {result1 === 'Correct!' ? 'correct' : 'incorrect'}">{result1}</div>
            </div>
            <div class="challenge">
                <h3>Challenge 2: Basic Encryption</h3>
                <p>Decrypt this message: (CibbgAaz8Rk7LGGhgC44g5Fay8ILCYTCh1KRFCYh8Z8=)</p>
                <input type="text" bind:value={answer2} placeholder="Your answer...">
                <button on:click={() => checkAnswer('challenge2', answer2, (msg) => result2 = msg)}>Submit</button>
                <div class="result {result2 === 'Correct!' ? 'correct' : 'incorrect'}">{result2}</div>
            </div>
            <div class="challenge">
                <h3>Challenge 3: Web Exploit</h3>
                <p>Find the vulnerability on this <a href="#">webpage</a> and exploit it to find the flag.</p>
                <input type="text" bind:value={answer3} placeholder="Your answer...">
                <button on:click={() => checkAnswer('challenge3', answer3, (msg) => result3 = msg)}>Submit</button>
                <div class="result {result3 === 'Correct!' ? 'correct' : 'incorrect'}">{result3}</div>
            </div>
        </div>
    </div>
</div>
            </div>
        </div>
    </div>
</div>
<footer>
    <p>&copy; 2024 CTF Challenges. All rights reserved.</p>
</footer>
