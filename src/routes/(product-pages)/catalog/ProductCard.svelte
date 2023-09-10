<script lang="ts">
	import type { categories } from 'lib/product';

	import type { TempProduct } from 'types/product';

	export let product: TempProduct;
	export let selected: categories;

	let hiddenModal = true;
    console.log(product.image);
</script>

{#if product.category === selected}
	<button
		on:click={() => (hiddenModal = false)}
		class="hover:brightness-90 product_container transition duration-300
        aspect-[10/10] max-w-[300px] w-full"
	>
		<img src={URL.createObjectURL(product.image)} alt="" class="w-full h-full object-cover min-h-5/4" />
		<div class="p-4 dark:bg-gray-800/50 flex product_text w-full flex-col items-start">
			<h2 class="text-xl font-semibold">{product.name}</h2>
			<p class="text-gray-100">${product.price}</p>
		</div>
	</button>
{/if}

{#if !hiddenModal}
	<div
		tabindex="-1"
        class="fixed top-0 left-0 right-0 z-50 
        w-full p-4 overflow-x-hidden 
        flex items-center justify-center
        md:inset-0 h-[calc(100%-1rem)] min-h-full"
    >
        <button class="w-full max-h-full cursor-default bg-black/50 h-full z-[51] absolute" on:click={() => hiddenModal = true}></button>
		<div class="relative w-full max-w-2xl overflow-y-auto z-[52] max-h-full">
			<div class="relative bg-white rounded-lg shadow dark:bg-gray-900">
				<div class="flex items-start justify-between p-4 rounded-t dark:border-gray-600">
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">{product.name}</h3>
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
                        <div class="animate-pulse h-full w-full min-h-5/4"></div>
                    <img src={URL.createObjectURL(product.image)} alt="" class="w-full h-full object-cover min-h-5/4" />
                    <h3 class="text-2xl font-semibold">{product.name}</h3>
                    <p class="text-gray-500">{product.description}</p>
                </div>
				<div
					class="flex items-center justify-end p-6 space-x-2 rounded-b"
				>
					<button
                        on:click={() => hiddenModal = true}
						type="button"
						class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
						>Add to Cart and Continue</button
					>
					<button
                        on:click={() => hiddenModal = true}
						type="button"
						class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
						>Checkout</button
					>

				</div>
			</div>
		</div>
	</div>
{/if}


<style lang="postcss">
    .product_container:hover .product_text {
        opacity: 1
    }

    .product_text {
        opacity: 0;
        position: absolute;
        bottom: 0;
        left: 0;
    }
</style>
