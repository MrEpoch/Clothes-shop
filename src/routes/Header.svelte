<script lang="ts">
	import Logo from 'assets/logo.png';
	import LogoDark from 'assets/VelvetLine-bg.png';
	import { cart, theme } from 'lib/store';
	import { UserIcon, SunIcon, ShoppingCartIcon } from 'svelte-feather-icons';

	let hidden = true;
	export let showCart: any;

	function SwitchTheme() {
		theme.set($theme === 'dark' ? 'light' : 'dark');
	}
</script>

<nav class="dark:bg-black/10 dark:text-white/90">
	<div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
		<a href="/" class="flex items-center">
			<div class="sm:h-24 h-12 w-12 mr-3 sm:w-24 scale-125">
				<img
					src={$theme === 'dark' ? LogoDark : Logo}
					class="h-full w-full"
					alt="Alexandr Stenčuk Logo"
				/>
			</div>
		</a>
		<button
			on:click={() => (hidden = !hidden)}
			type="button"
			class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
			aria-controls="navbar-default"
			aria-expanded="false"
		>
			<span class="sr-only">Open main menu</span>
			<svg
				class="w-5 h-5"
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 17 14"
			>
				<path
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M1 1h15M1 7h15M1 13h15"
				/>
			</svg>
		</button>
		<div class={`${hidden ? 'hidden' : ''} w-full md:block md:w-auto`} id="navbar-default">
			<ul
				class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100
            rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0
            md:dark:bg-transparent dark:border-gray-700 dark:bg-black/90 md:items-center"
            >
                <li>
					<a
						href="/"
						class="block py-2 text-xl pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent
                ">Home</a
					>
				</li>

                <li>
					<a
						href="/about"
						class="block py-2 text-xl pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent
                ">About</a
					>
				</li>

				<li>
					<a
						href="/catalog"
						class="block py-2 text-xl pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent
                ">Catalog</a
					>
				</li>

				<li>
					<a
						href="/contact"
						class="block py-2 text-xl pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
						>Contact</a
					>
				</li>
				<button
					on:click={showCart}
					class="flex items-center md:justify-center w-full text-start
                py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0
                md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 relative
                dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
				>
					<ShoppingCartIcon class="w-8 dark:text-white font-bold text-black" />
					{#if $cart.length > 0}
						<div
							class="absolute inline-flex items-center justify-center w-5 h-5 text-xs
                        font-bold text-white bg-red-500 rounded-full -top-3 -right-3"
						>
							{$cart.length}
						</div>
					{/if}
				</button>
				<button
					on:click={SwitchTheme}
					class="flex items-center md:justify-center w-full text-start
                py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0
                md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500
                dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
				>
					<SunIcon class="w-8 dark:text-white font-bold text-black" />
				</button>
				<a
					href="/account"
					class="flex items-center md:justify-center w-full text-start
                py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0
                md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500
                dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
				>
					<UserIcon class="w-8 dark:text-white font-bold text-black" />
				</a>
			</ul>
		</div>
	</div>
</nav>
