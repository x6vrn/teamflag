<script lang="ts">
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import { goto } from '$app/navigation';

  let name = '';
  let email = '';
  let password = '';
  let message = '';
  let isSignup = false; // للتحكم في إظهار نموذج التسجيل أو تسجيل الدخول
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
<header class="bg-white">
  <nav class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
    <div class="flex lg:flex-1">
      <a href="#" class="-m-1.5 p-1.5">
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
<body class="div m-0 p-0 box-border text-slate-800">
  <div class=" flex justify-center m-4 max-w-md mx-auto mt-10 p-8">
  <h1 class=" text-3xl font-bold text-blue-500">Team Flag</h1>
  </div>
  <div class="mt-10 p-8 max-w-sm">  
    {#if isSignup}
        <input type="text" bind:value={name} placeholder="Name" class="block w-full rounded-lg border-0 py-3 text-gray-900 shadow-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:bluae-indigo-600 sm:text-sm sm:leading-6 mt-4 p-6" />
        <input bind:value={email} placeholder="Email" class="block w-full rounded-lg border-0 py-3 text-gray-900 shadow-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:bluae-indigo-600 sm:text-sm sm:leading-6 mt-4 p-6" type="email"/>
        <input type="password" bind:value={password} placeholder="Password" class="block w-full rounded-lg border-0 py-3 text-gray-900 shadow-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:bluae-indigo-600 sm:text-sm sm:leading-6 mt-4 p-6"/>
        <button class="mt-10 text-sm text-gray-500" on:click={() => isSignup = false}> you already have an <span class="text-blue-500">Account</span></button>
        <button class="flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm bg-blue-500 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" on:click={handleSignup}>Sign Up</button>
    {:else}
      <input type="email" bind:value={email} placeholder="Email" class="block w-full rounded-lg border-0 py-3 text-gray-900 shadow-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:bluae-indigo-600 sm:text-sm sm:leading-6 mt-4 p-6"/>
      <input type="password" bind:value={password} placeholder="Password" class="block w-full rounded-lg border-0 py-3 text-gray-900 shadow-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:blue-indigo-600 sm:text-sm sm:leading-6 mt-4 p-6"/>
      <button class="mt-10 text-sm text-gray-500" >Not a member? <span on:click={() => isSignup = true}  class="text-blue-500">Sign up</span></button>
      <button class="flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm bg-blue-500 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" on:click={handleLogin} >Login</button>
    {/if}
  
    {#if message}
      <p>{message}</p>
    {/if}
  </div>
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

  /* التنقل */
  .div div{
    max-width: 400px;
    margin:  auto;
    margin-top: 120px;
  }

  button{
    margin-top: 10px;
    padding: 5px;
  }



</style>
