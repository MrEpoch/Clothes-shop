<script>
	import CartItems from 'components/CartItems.svelte';
	import { cart } from 'lib/store';
</script>

<div class="flex flex-col min-h-full w-full">
	{#each $cart as order}
		<CartItems {order} />
	{/each}
</div>
