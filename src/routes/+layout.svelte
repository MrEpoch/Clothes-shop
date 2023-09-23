<script lang="ts">
	import '../app.css';
	import { theme } from '$lib/store';
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';
	import CartModal from './Cart_Modal.svelte';
	import { onMount } from 'svelte';
	import { invalidate } from '$app/navigation';
	import Transition from './transition.svelte';

	$: dark = $theme === 'dark';
	let shown_cart = false;

	export let data;

	$: ({ supabase, session } = data);

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});

	function showCart() {
		shown_cart = !shown_cart;
	}
</script>

<svelte:head>
	<title>Velvet Line</title>
	<meta name="color-scheme" content={dark ? 'dark' : 'light'} />
</svelte:head>

<div class="relative" class:dark>
	<Header {showCart} />
    <Transition url={data.url}>
        <slot />
    </Transition>
	<Footer />

	{#if shown_cart}
		<CartModal {showCart} />
	{/if}
</div>
