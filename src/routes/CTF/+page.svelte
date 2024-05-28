<script>
    import { onMount } from 'svelte';

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
<style>
/* عام */
body {
    font-family: 'San Francisco', Arial, sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: #f4f4f9;
    color: #333;
}

/* الرأس */
header {
    background-color: #007aff;
    color: #fff;
    padding: 1rem;
    text-align: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid #ddd;
    position: sticky;
    top: 0;
    z-index: 1000;
    border-radius: 0 0 12px 12px;
}

/* التنقل */
nav {
    display: flex;
    justify-content: center;
    background-color: #f4f4f9;
    padding: 0.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
}

nav a {
    color: #007aff;
    padding: 1rem;
    text-decoration: none;
    margin: 0 0.5rem;
    border-radius: 8px;
    transition: background-color 0.3s, color 0.3s;
}

nav a:hover {
    background-color: #e0e0e0;
}

/* الحاوية */
.container {
    padding: 2rem;
    max-width: 800px;
    margin: 0 auto;
}

/* القسم */
.section {
    margin: 2rem 0;
    padding: 1.5rem;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.section h2 {
    margin-bottom: 1rem;
    color: #333;
}

/* التحديات */
.challenge input[type="text"] {
    width: 100%;
    padding: 0.75rem;
    margin-top: 1rem;
    border: 1px solid #ccc;
    border-radius: 12px;
    font-size: 1rem;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
    transition: border-color 0.3s, box-shadow 0.3s;
}

.challenge input[type="text"]:focus {
    border-color: #007aff;
    box-shadow: 0 0 0 3px rgba(0, 122, 255, 0.3);
}

.challenge button {
    margin-top: 0.5rem;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 12px;
    background-color: #007aff;
    color: #fff;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s, box-shadow 0.3s;
}

.challenge button:hover {
    background-color: #005bb5;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.result {
    margin-top: 1rem;
    font-weight: bold;
}

.correct {
    color: green;
}

.incorrect {
    color: red;
}

/* النموذج */
.login-form {
    max-width: 400px;
    margin: 0 auto;
    padding: 2rem;
    border: 1px solid #ccc;
    border-radius: 12px;
    background: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.login-form input {
    width: 100%;
    padding: 1rem;
    margin: 0.5rem 0;
    border: 1px solid #ccc;
    border-radius: 12px;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
    transition: border-color 0.3s, box-shadow 0.3s;
}

.login-form input:focus {
    border-color: #007aff;
    box-shadow: 0 0 0 3px rgba(0, 122, 255, 0.3);
}

.login-form button {
    width: 100%;
    padding: 1rem;
    border: none;
    border-radius: 12px;
    background-color: #007aff;
    color: #fff;
    cursor: pointer;
    transition: background-color 0.3s, box-shadow 0.3s;
}

.login-form button:hover {
    background-color: #005bb5;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* التذييل */
footer {
    background-color: #007aff;
    color: #fff;
    text-align: center;
    padding: 1rem;
    position: fixed;
    width: 100%;
    bottom: 0;
    box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 12px 12px 0 0;
}
</style>

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
<footer>
    <p>&copy; 2024 CTF Challenges. All rights reserved.</p>
</footer>
