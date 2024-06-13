<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { readable } from 'svelte/store';
    // import { getPoints } from '$lib/server/api';


    let isLoggedIn = false;
    let userId = "";
    let userPoints = "";

   async function getPoints() {
    isLoggedIn = localStorage.getItem('loggedIn') === '1';
        userId = localStorage.getItem('userId');
          const response = await fetch(`/api/get-points/${userId}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
            if (response.ok) {
    const data = await response.json();
    userPoints = data.points;
    console.log(data);
  } 

    }

    onMount(async () => {
        getPoints();

    });


    let answer1 = '';
    let answer2 = '';
    let answer3 = '';
    let answer4 = '';
    let result1 = '';
    let result2 = '';
    let result3 = '';
    let result4 = '';

    async function checkAnswer(challenge, answer, resultSetter, resultKey) {
        try {
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
                body: JSON.stringify({ userId, challenge, answer })
            });

            const result = await response.json();
            resultSetter(result.message);

            if (result.message === 'Correct!') {
                localStorage.setItem(resultKey, result.message);
            }
        } catch (error) {
            resultSetter('Error: ' + error.message);
        }
        getPoints();
    }

// onMount(async () => {
//   const response = await fetch('/api/get-points/', {
//     headers: {
//       'Authorization': `Bearer ${localStorage.getItem('token')}`
//     }
//   });

// });



</script>   

  {#if !userId}
    <div class="relative z-10 transition" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <!--
          Background backdrop, show/hide based on modal state.
      
          Entering: "ease-out duration-300"
            From: "opacity-0"
            To: "opacity-100"
          Leaving: "ease-in duration-200"
            From: "opacity-100"
            To: "opacity-0"
        -->
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity transition"></div>
      
        <div class="fixed inset-0 z-10 w-screen overflow-y-auto transition">
          <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 transition">
            <!--
              Modal panel, show/hide based on modal state.
      
              Entering: "ease-out duration-300"
                From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                To: "opacity-100 translate-y-0 sm:scale-100"
              Leaving: "ease-in duration-200"
                From: "opacity-100 translate-y-0 sm:scale-100"
                To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            -->
            <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div class="sm:flex sm:items-start">
                  <div class="mx-auto flex h-12 w-12 flex-shrink-0 transition items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg class="h-6 w-6 text-red-600 transition" fill="none"  viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                    </svg>
                  </div>
                  <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <h3 class="text-base font-semibold leading-6 text-gray-900" id="modal-title">You Dont Have An Account</h3>
                    <div class="mt-2">
                      <p class="text-sm text-gray-500">You Dont Have Acsses To The Page Wihout Account Please Create Account</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 transition">
                <a type="button" class="inline-flex w-full justify-center rounded-md transition bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto" href="/auth">Create Account</a>
                <a type="button" class="mt-3 inline-flex w-full justify-center rounded-md transition bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" href="/">Cancel</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    {/if}
    <header class="bg-white">
        <nav class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div class="flex lg:flex-1">
            <a href="#" class="-m-1.5 p-1.5">
              <h1 class="h-8 w-auto  text-lg font-bold text-blue-600">Team Flag</h1>
            </a>
          </div>
            <a href="/" class="text-sm font-medium leading-6 text-blue-600 px-3 ">Home</a>
            <a href="/contacts" class="text-sm font-medium leading-6 text-blue-600 px-3 ">Contact</a>
            <a href="/CTF" class="text-sm font-medium leading-6 text-blue-600 px-3 ">CTF</a>
            <div class="hidden lg:flex lg:flex-1 lg:justify-end">
            <a href="/auth" class="text-sm font-bold leading-6  bg-blue-600 p-2 px-3 rounded-lg text-white hover:bg-blue-800 transition">Log in <span aria-hidden="true">&rarr;</span></a>
          </div>
        </nav>    
    </header>
<body class="">
    <div class="rounded-lg mt-28 ">
        <div id="ctf" class="ml-6">
            <h2 class=" text-3xl font-bold text-blue-600">Welcome to the CTF Challenges</h2>
            <p>Here you can test your skills with various computer and cybersecurity challenges. Good luck!</p>
            <p class="mt-4">Your current points: <span class="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">{userPoints}</span></p>
            <div class="">
                <div class="p-1">
                    <h3 class="mt-6 text-2xl">Challenge 1: Corrupted image <span class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">easy</span></h3>
                    <p>Fix the corrupted <a class=" text-blue-600" href="https://drive.google.com/file/d/1cB9wuwm1be4iDHBYCHGEBbWpbFTHIfwn/view?usp=sharing">image</a>.</p>
                    <input type="text" bind:value={answer1} placeholder="  Your answer..." class="block w-full rounded-lg border-0 py-3.5 text-gray-900 shadow-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:blue-indigo-600 sm:text-sm sm:leading-6 mt-4 p-6">
                    <button on:click={() => checkAnswer('challenge1', answer1, (msg) => result1 = msg, 'result1')} class="bg-blue-500 p-2 px-3 mt-4 rounded-lg text-white">Submit</button>
                    <div class="result {result1 === 'Correct!' ? 'inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20' : 'inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10'}">{result1}</div>
                </div>
                <div class="p-1">
                    <h3 class="mt-6 text-2xl">Challenge 2: Forensics <span class="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">Medium</span></h3>
                    <p>Note: the answer should be in lowercase <a href="https://drive.google.com/file/d/1TquatPqi7wPeWpH0SwdDCI7Z5WgQseMc/view?usp=sharing" class="text-blue-500">Download</a> </p>
                    <p>Flag format : flagy&#123;&#125;</p>

                    <input type="text" bind:value={answer2} placeholder="  Your answer..." class="block w-full rounded-lg border-0 py-3.5 text-gray-900 shadow-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:blue-indigo-600 sm:text-sm sm:leading-6 mt-4 p-6">
                    <button on:click={() => checkAnswer('challenge2', answer2, (msg) => result2 = msg, 'result2')} class="bg-blue-500 p-2 px-3 mt-4 rounded-lg text-white">Submit</button>
                    <div class="result {result2 === 'Correct!' ? 'inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20' : 'inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10'}">{result2}</div>
                </div>
                <div class="p-1">
                    <h3 class="mt-6 text-2xl">Challenge 3: Web Exploit  <span class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">easy</span></h3>
                    <p>Find the table!!! flag <a href="http://45.88.9.217/" class=" text-blue-600">CTF</a></p>
                    <input type="text" bind:value={answer3} placeholder="  Your answer..."  class="block w-full rounded-lg border-0 py-3.5 text-gray-900 shadow-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:blue-indigo-600 sm:text-sm sm:leading-6 mt-4 p-6">
                    <button on:click={() => checkAnswer('challenge3', answer3, (msg) => result3 = msg, 'result3')} class="bg-blue-500 p-2 px-3 mt-4 rounded-lg text-white">Submit</button>
                    <div class="result {result3 === 'Correct!' ? 'inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20' :'inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10'}">{result3}</div>
                <div class="p-1">
                      <h3 class="mt-6 text-2xl">Challenge 4: Web Exploit <span class="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">Medium</span></h3>
                      <p>Calculator built with node.js ../ <a href="http://45.88.9.217:1337" class=" text-blue-600">CTF</a></p>
                      <input type="text" bind:value={answer4} placeholder="  Your answer..."  class="block w-full rounded-lg border-0 py-3.5 text-gray-900 shadow-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:blue-indigo-600 sm:text-sm sm:leading-6 mt-4 p-6">
                      <button on:click={() => checkAnswer('challenge4', answer4, (msg) => result4 = msg, 'result4')} class="bg-blue-500 p-2 px-3 mt-4 rounded-lg text-white">Submit</button>
                <div class="result {result4 === 'Correct!' ? 'inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20' :'inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10'}">{result4}</div>
                </div>
            </div>
        </div>
    </div>
</body>
