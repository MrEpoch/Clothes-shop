<script lang="ts">
	import { cart } from 'lib/store';
	import CartItems from 'components/CartItems.svelte';

	export let showCart: any;
</script>

<div class="relative z-10" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
  <button on:click={showCart} class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
	<div class="fixed inset-0 overflow-hidden">
		<div class="absolute inset-0 overflow-hidden">
			<div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full sm:pl-10">
				<div class="pointer-events-auto w-screen max-w-md">
					<div
						class="flex max-[600px]:p-4 h-full flex-col overflow-y-scroll dark:bg-gray-900 dark:text-white bg-white shadow-xl"
					>
						<div class="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
							<div class="flex items-start justify-between">
								<h2
									class="text-lg font-medium dark:text-gray-100 text-gray-900"
									id="slide-over-title"
								>
									Shopping cart
								</h2>
								<div class="ml-3 flex h-7 items-center">
									<button
										on:click={showCart}
										type="button"
										class="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
									>
										<span class="absolute -inset-0.5" />
										<span class="sr-only">Close panel</span>
										<svg
											class="h-6 w-6"
											fill="none"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											stroke="currentColor"
											aria-hidden="true"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M6 18L18 6M6 6l12 12"
											/>
										</svg>
									</button>
								</div>
							</div>

							<div class="mt-8">
								<div class="flow-root">
									<ul role="list" class="-my-6 divide-y dark:divide-gray-700 divide-gray-200">
										{#each $cart as item}
											<CartItems order={item} />
										{/each}
									</ul>
								</div>
							</div>
						</div>

						<div class="border-t border-gray-200 px-4 py-6 sm:px-6">
							<div
								class="flex justify-between text-base font-medium dark:text-gray-100 text-gray-900"
							>
								<p>Subtotal</p>
								<p>${$cart.reduce((acc, item) => acc + item.quantity * item.price, 0)}</p>
							</div>
							<p class="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
							<div class="mt-6">
								<a
									on:click={showCart}
									href="/payment"
									class="flex items-center justify-center rounded-md border border-transparent bg-violet-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-violet-700"
									>Checkout</a
								>
							</div>
							<div class="mt-6 flex justify-center text-center text-sm text-gray-500">
								<p>
									or
									<button
										type="button"
										on:click={showCart}
										class="font-medium text-violet-600 hover:text-violet-500"
									>
										Continue Shopping
										<span aria-hidden="true"> &rarr;</span>
									</button>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
