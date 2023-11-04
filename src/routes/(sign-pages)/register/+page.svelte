<script lang="ts">
	import { goto } from '$app/navigation';

	export let data;
	let { supabase, url } = data;
	$: ({ supabase, url } = data);

	let email: string;
	let error: string;
	let password: string;
	let confirm_password: string;

	const handle_register = async () => {
		console.log('handle');
		if (password !== confirm_password) return;
		const val = await supabase.auth.signUp({
			email,
			password,
			options: {
				emailRedirectTo: `${location.origin}/auth/callback`
			}
		});
		if (val.error) return;
		await goto('/account');
	};

	const handle_github_register = async () => {
		await supabase.auth.signInWithOAuth({
			provider: 'github',
		});
	};
</script>

<div
	class="flex dark:text-gray-100 dark:bg-darkmode-500 justify-center gap-[3rem] flex-col  items-center min-h-screen"
>
	<h1 class="sm:text-5xl py-[5rem] text-3xl mb-6 font-bold">Register</h1>
	<form
		class="dark:bg-darkmode-400 dark:border-2 dark:border-darkmode-200 rounded-lg max-w-[500px] w-full shadow bg-white mb-4 relative
        p-[2rem] sm:py-[5rem] py-[4rem] sm:p-[5rem] flex flex-col gap-[3rem]"
		method="POST"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="absolute top-0 dark:text-white/80 left-0
            translate-y-[-50px] translate-x-[10px] w-[75px] sm:w-[100px]"
			viewBox="0 0 24 24"
			><title>shield-account</title><path
				fill="currentColor"
				d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,5A3,3 0 0,1 15,8A3,3 0 0,1 12,11A3,3 0 0,1 9,8A3,3 0 0,1 12,5M17.13,17C15.92,18.85 14.11,20.24 12,20.92C9.89,20.24 8.08,18.85 6.87,17C6.53,16.5 6.24,16 6,15.47C6,13.82 8.71,12.47 12,12.47C15.29,12.47 18,13.79 18,15.47C17.76,16 17.47,16.5 17.13,17Z"
			/></svg
		>
		<div class="flex flex-col gap-[1rem]">
			<label for="email">Email</label>
			<input
				type="email"
				name="email"
				class="dark:bg-darkmode-300 outline-none border-[1px] border-gray-600/50 rounded-[10px] p-3"
				id="name"
				placeholder="Email"
				bind:value={email}
				required
				minlength="3"
			/>
		</div>
		<div class="flex flex-col gap-[1rem]">
			<label for="password">Password</label>
			<input
				type="password"
				name="password"
				bind:value={password}
				class="dark:bg-darkmode-300 outline-none border-[1px] border-gray-600/50 rounded-[10px] p-3"
				id="password"
				placeholder="Password"
				required
			/>
		</div>
		<div class="flex flex-col gap-[1rem]">
			<label for="password_confirmation">Confirm Password</label>
			<input
				type="password"
				bind:value={confirm_password}
				name="password_confirmation"
				class="dark:bg-darkmode-300 outline-none border-[1px] border-gray-600/50 rounded-[10px] p-3"
				id="password_confirmation"
				placeholder="Confirm Password"
				required
			/>
		</div>
		<div class="flex justify-center">
			<button
				type="button"
				on:click={handle_register}
				class="py-2 p-8 rounded-[6px] bg-violet-500 dark:bg-violet-600 text-white font-base text-lg dark:hover:bg-violet-700 hover:bg-violet-700 transition-all"
				>Register</button
			>
		</div>
	</form>
	<button
		on:click={handle_github_register}
		class="text-black text-lg dark:text-white/90 font-light hover:underline"
    >
    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z" clip-rule="evenodd"/>
    </svg>
  </button
	>
	<a
		href="/login"
		class="text-black dark:text-white/90 mb-[5rem] text-lg font-light hover:underline"
		>Already have an account? Login</a
	>
</div>
