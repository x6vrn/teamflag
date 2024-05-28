<script lang="ts">
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import { goto } from '$app/navigation';

  let name = '';
  let email = '';
  let password = '';
  let message = '';
  let isSignup = true; // للتحكم في إظهار نموذج التسجيل أو تسجيل الدخول
  let isLoggedIn = writable(false); // حالة تسجيل الدخول

  // تحميل حالة تسجيل الدخول من التخزين المحلي عند تحميل الصفحة
  onMount(() => {
      const loggedIn = localStorage.getItem('loggedIn') === '1';
      const userId = localStorage.getItem('userId');
      isLoggedIn.set(loggedIn);
      if (!loggedIn) {
          goto('/auth');
      }
  });

  async function handleSignup() {
      const response = await fetch('/api/signup', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name, email, password })
      });

      const result = await response.json();
      message = result.message || 'Signup successful';
  }

  async function handleLogin() {
      const response = await fetch('/api/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
      });

      const result = await response.json();
      message = result.message || 'Login successful';

      if (result.userId) {
          // حفظ معرف المستخدم وحالة تسجيل الدخول في التخزين المحلي
          localStorage.setItem('userId', result.userId);
          localStorage.setItem('loggedIn', '1');
          isLoggedIn.set(true);
          goto('/');
      }
  }

  function logout() {
      // حذف معرف المستخدم وتحديث حالة تسجيل الدخول في التخزين المحلي
      localStorage.removeItem('userId');
      localStorage.removeItem('loggedIn');
      isLoggedIn.set(false);
      goto('/auth');
  }
</script>

<header>
    <h1>ServerS Nulls Blous</h1>
</header>
<nav>
    <a href="/">Home</a>
    <a href="/contacts">Contact</a>
    <a href="/CTF">CTF</a>
    <a href="/auth">Login</a>
</nav>

<div>
  <div class="toggle-buttons">
    <button on:click={() => isSignup = true} class:is-active={isSignup}>Sign Up</button>
    <button on:click={() => isSignup = false} class:is-active={!isSignup}>Login</button>
  </div>

  {#if isSignup}
    <h2>Sign Up</h2>
    <input type="text" bind:value={name} placeholder="Name" />
    <input type="email" bind:value={email} placeholder="Email" />
    <input type="password" bind:value={password} placeholder="Password" />
    <button on:click={handleSignup}>Sign Up</button>
  {:else}
    <h2>Login</h2>
    <input type="email" bind:value={email} placeholder="Email" />
    <input type="password" bind:value={password} placeholder="Password" />
    <button on:click={handleLogin}>Login</button>
  {/if}

  {#if message}
    <p>{message}</p>
  {/if}
</div>

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

  div {
    max-width: 400px;
    margin:  auto;
    margin-top: 40px;
    padding: 2rem;
    border: 1px solid #ccc;
    border-radius: 12px;
    background: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  input {
    width: 100%;
    padding: 1rem;
    margin: 0.5rem 0;
    border: 1px solid #ccc;
    border-radius: 12px;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
  }

  button {
    width: 100%;
    padding: 1rem;
    border: none;
    border-radius: 12px;
    background-color: #007aff;
    color: #fff;
    cursor: pointer;
    transition: background-color 0.3s, box-shadow 0.3s;
  }

  button:hover {
    background-color: #005bb5;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  .toggle-buttons {
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;
  }

  .toggle-buttons button {
    flex: 1;
    padding: 0.5rem;
    margin: 0 0.5rem;
    border-radius: 12px;
    background: #e0e0e0;
    border: 1px solid #ccc;
    cursor: pointer;
    transition: background 0.3s, box-shadow 0.3s;
  }

  .toggle-buttons button.is-active {
    background: #007aff;
    color: #fff;
  }
</style>
