<!-- src/routes/+page.svelte -->
<script lang="ts">
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
    import { isLoggedIn } from '$lib/stores';
    
    let user: { name: any; };
    let userId = "";

    onMount(async () => {
        userId = localStorage.getItem('userId');
        const response = await fetch('/api/user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      user = await response.json();
    });
  </script>
  
  <!-- الجزء الذي يعرض اسم المستخدم -->
  <svelte:head>
    <title>Team Flag</title>
</svelte:head>
<header class="bg-white">
    <nav class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
      <div class="flex lg:flex-1">
        <a href="" class="-m-1.5 p-1.5">
          <h1 class="h-8 w-auto text-lg font-bold text-blue-600">Team Flag</h1>
        </a>
      </div>
        <a href="/" class="text-sm font-medium leading-6 text-blue-600 px-3">Home</a>
        <a href="/contacts" class="text-sm font-medium leading-6 text-blue-600 px-3">Contact</a>
        <a href="/CTF" class="text-sm font-medium leading-6 text-blue-600 px-3">CTF</a>
        <div class="hidden lg:flex lg:flex-1 lg:justify-end">
        <a href="/auth" class="text-sm font-bold leading-6 bg-blue-600 p-2 px-3 rounded-lg text-white hover:bg-blue-800 transition">Log in <span aria-hidden="true">&rarr;</span></a>

        </div>
    </nav>    
</header>

<body class="font-sans bg-gray-100 text-gray-800 antialiased">
    <div class="container">
        <div id="home" class="section">
            <h2>Home</h2>
            <p>Welcome to my professional website. Here, you will find information about our services, contact details, and a login form for members.</p>
        </div>
        <div id="contact" class="section">
            <h2>Contact</h2>
            <p>If you have any questions, feel free to reach out to us at contact@example.com.</p>
        </div>
    </div>
    <footer>
        <p>&copy; 2024 My Professional Website. All rights reserved.</p>
    </footer>
</body>
<style>
    /* عام */
    html{
        background-color: #f4f4f9;
    }
    body {
        font-family: 'San Francisco', Arial, sans-serif;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        background-color: #f4f4f9;
        color: #333;
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