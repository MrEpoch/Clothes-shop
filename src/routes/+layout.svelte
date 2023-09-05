<script lang="ts">
    import '../app.css';
    import { theme } from "$lib/store";
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';

    $: dark = $theme === "dark";

    function showCart() {

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
</div>
