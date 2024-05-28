<script>
</script>
<svelte:head>
    <title>Team 0xNess</title>
</svelte:head>
<body>
    <header>
        <h1>ServerS Nulls Blous</h1>
    </header>
    <nav>
        <a href="">Home</a>
        <a href="/contacts">Contact</a>
        <a href="/CTF">CTF</a>
        <a href="../#login">Login</a>
    </nav>
    <div class="container">
        <div id="home" class="section">
            <h2>Home</h2>
            <p>Welcome to my professional website. Here, you will find information about our services, contact details, and a login form for members.</p>
        </div>
        <div id="contact" class="section">
            <h2>Contact</h2>
            <p>If you have any questions, feel free to reach out to us at contact@example.com.</p>
        </div>
        <div id="login" class="section">
            <h2>Login</h2>
            <div class="login-form">
                <form>
                    <input type="text" placeholder="Username" required>
                    <input type="password" placeholder="Password" required>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    </div>
    <footer>
        <p>&copy; 2024 My Professional Website. All rights reserved.</p>
    </footer>
</body>
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