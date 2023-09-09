<script lang="ts">
	export let data;
	let { supabase } = data;
	$: ({ supabase } = data);

	let email: string;
	let password: string;

	const handle_login = async () => {
		await supabase.auth.signInWithPassword({
			email,
			password
		});
	};

	const handle_login_github = async () => {
		await supabase.auth.signInWithOAuth({
			provider: 'github',
			options: {
				redirectTo: `${data.url}/auth/callback`
			}
		});
	};

	const handle_login_google = async () => {
		await supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				redirectTo: `${data.url}/auth/callback`
			}
		});
	};
</script>

<div
	class="flex dark:bg-black/10 dark:text-white/90 justify-center gap-[3rem] flex-col bg-gray-100/40 items-center min-h-screen"
>
	<h1 class="text-5xl mb-6 font-thin">Log In</h1>
	<form
		class="dark:bg-black/20 max-w-[500px] w-full shadow bg-white mb-[5rem] relative rounded p-[5rem] flex flex-col gap-[3rem]"
		method="POST"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="absolute top-0 dark:text-white/80 left-0 translate-y-[-50px] translate-x-[10px] w-[100px]"
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
				minlength="3"
				bind:value={email}
				class="dark:bg-black/10 outline-none border-[1px] border-gray-600/50 rounded-[10px] p-3"
				placeholder="Email"
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
			/>
		</div>
		<div class="flex justify-center">
			<button
				type="button"
				on:click={handle_login}
				class="py-2 p-8 rounded-[6px] bg-black text-white font-light text-lg hover:bg-gray-800 transition-all"
				>Log In</button
			>
		</div>
	</form>
	<button
		on:click={handle_login_github}
		class="text-black text-lg dark:text-white/90 font-light hover:underline"
		>Sign in with GitHub</button
	>
	<button
		on:click={handle_login_google}
		class="text-black text-lg dark:text-white/90 font-light hover:underline"
		>Sign in with Google</button
	>
	<a href="/register" class="text-black text-lg dark:text-white/90 font-light hover:underline"
		>Don't have an account? Register</a
	>
</div>
