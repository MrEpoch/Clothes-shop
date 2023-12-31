<script lang="ts">
	import { goto } from '$app/navigation';
	import type { categories } from 'lib/product';
	import { cart } from 'lib/store';
  import { fly } from "svelte/transition";

	import type { Product } from 'types/product';

	export let product: Product;
	export let selected: categories;

	let hiddenModal = true;

	function addToCart() {
		hiddenModal = true;
		cart.update((c) => {
			const exists = c.find((cartItem) => cartItem.id === product.id);
			if (exists) {
				exists.quantity += 1;
				return [...c];
			}
			const cartItem = { ...product, quantity: 1 };
			return [...c, cartItem];
		});
	}

	function addToCartAndPay() {
		cart.update((c) => {
			const exists = c.find((cartItem) => cartItem.id === product.id);
			if (exists) {
				exists.quantity += 1;
				return [...c];
			}
			const cartItem = { ...product, quantity: 1 };
			return [...c, cartItem];
		});
		goto('/payment');
	}
</script>

{#if product.category === selected || selected === 'all'}
	<button
		on:click={() => (hiddenModal = false)}
		class="hover:brightness-90 product_container transition duration-300
        aspect-[10/11] max-w-[300px] w-full overflow-hidden"
	>
		<img
			src={product.image}
			alt=""
			class="w-full transition hover:duration-300 hover:transition duration-300
    hover:scale-[1.02] h-full object-cover min-h-5/4"
		/>
		<div
			class="p-4 bg-gray-800/50 text-white
            flex product_text w-full flex-col items-start"
		>
			<h2 class="text-xl font-semibold">{product.name}</h2>
			<p class="text-gray-100">${product.price}</p>
		</div>
	</button>
{/if}

{#if !hiddenModal}
	<div
    in:fly
    out:fly
		tabindex="-1"
		class="fixed top-0 left-0 right-0 z-50
        w-full p-4 overflow-x-hidden
        flex items-center justify-center
        md:inset-0 h-[calc(100%-1rem)] min-h-full"
	>
		<button
			class="w-full max-h-full cursor-default bg-black/50 h-full z-[51] absolute"
			on:click={() => (hiddenModal = true)}
		/>
		<div class="relative w-full max-w-2xl overflow-y-auto z-[52] max-h-full">
			<div class="relative bg-white rounded-lg shadow dark:bg-darkmode-400">
				<div class="flex items-start justify-between p-4 rounded-t dark:border-gray-600">
					<button
						type="button"
						on:click={() => (hiddenModal = true)}
						class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
						data-modal-hide="defaultModal"
					>
						<svg
							class="w-3 h-3"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 14 14"
						>
							<path
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
							/>
						</svg>
						<span class="sr-only">Close modal</span>
					</button>
				</div>
				<div class="p-6 space-y-6">
					<div class="animate-pulse h-full w-full min-h-5/4" />
					<img src={product.image} alt="" class="w-full h-full object-cover min-h-5/4" />
					<h3 class="text-2xl font-semibold">{product.name}</h3>
					<p class="text-gray-500">{product.description}</p>
				</div>
				<div
					class="flex items-center justify-end p-6 max-[325px]:gap-3
                    max-[325px]:flex-col space-x-2 rounded-b"
				>
					<button
						on:click={addToCart}
						type="button"
						class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4
                        focus:outline-none focus:ring-violet-300 rounded-lg
                        text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700
                        dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-600
                        dark:focus:ring-gray-600 text-center">Add to Cart</button
					>
					<button
						on:click={addToCartAndPay}
						type="button"
						class="text-white bg-violet-700 hover:bg-violet-800 focus:ring-4
                        focus:outline-none focus:ring-violet-300 font-medium rounded-lg
                        text-sm px-5 py-2.5 text-center dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-violet-800"
						>Checkout</button
					>
				</div>
			</div>
		</div>
	</div>
{/if}

<style lang="postcss">
	.product_container:hover .product_text {
		opacity: 1;
	}

	.product_text {
		opacity: 0;
		position: absolute;
		bottom: 0;
		left: 0;
	}
</style>
