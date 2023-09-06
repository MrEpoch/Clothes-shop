<script lang="ts">
    import '../app.css';
    import { theme } from "$lib/store";
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';
	import CartModal from './Cart_Modal.svelte';

    $: dark = $theme === "dark";
    let shown_cart = false;

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
    <slot />
    <Footer />

    {#if shown_cart}
        <CartModal {showCart} />
    {/if}
</div>
