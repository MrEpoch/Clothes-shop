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
			options: {
				redirectTo: `${data.url}/auth/callback`
			}
		});
	};

	const handle_google_register = async () => {
		await supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				redirectTo: `${data.url}/auth/callback`
			}
		});
	};
</script>

<div
	class="flex dark:text-white/90 dark:bg-black/10 justify-center gap-[3rem] flex-col bg-gray-100/40 items-center min-h-screen"
>
	<h1 class="sm:text-5xl py-[5rem] text-3xl mb-6 font-thin">Register</h1>
	<form
		class="dark:bg-black/20 max-w-[500px] w-full shadow bg-white mb-[5rem] relative
        rounded p-[2rem] sm:py-[5rem] py-[4rem] sm:p-[5rem] flex flex-col gap-[3rem]"
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
				class="dark:bg-black/10 outline-none border-[1px] border-gray-600/50 rounded-[10px] p-3"
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
				class="dark:bg-black/10 outline-none border-[1px] border-gray-600/50 rounded-[10px] p-3"
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
				class="dark:bg-black/10 outline-none border-[1px] border-gray-600/50 rounded-[10px] p-3"
				id="password_confirmation"
				placeholder="Confirm Password"
				required
			/>
		</div>
		<div class="flex justify-center">
			<button
				type="button"
				on:click={handle_register}
				class="py-2 p-8 rounded-[6px] bg-black text-white font-light text-lg hover:bg-gray-800 transition-all"
				>Register</button
			>
		</div>
	</form>
	<button
		on:click={handle_github_register}
		class="text-black text-lg dark:text-white/90 font-light hover:underline"
		>Sign in with GitHub</button
	>
	<button
		on:click={handle_google_register}
		class="text-black text-lg dark:text-white/90 font-light hover:underline"
		>Sign in with Google</button
	>
	<a
		href="/login"
		class="text-black dark:text-white/90 mb-[5rem] text-lg font-light hover:underline"
		>Already have an account? Login</a
	>
</div>
