<script lang="ts">
	import { cart } from 'lib/store';
	import { onDestroy } from 'svelte';

	export let order: any;
	let quantity = order.quantity;

	function updateCart() {
		cart.update((value) => {
			const index = value.findIndex((item) => item.id === order.id);
			if (index === -1) {
				return value;
			}
			value.splice(index, 1);
			return value;
		});
	}

	function quantityUpdate() {
		if (quantity > 20) {
			return (quantity = 20);
		}
		cart.update((value) => {
			const index = value.findIndex((item) => item.id === order.id);
			if (index === -1) {
				return value;
			}
			value[index].quantity = quantity;
			return value;
		});
	}
</script>

<li class="flex py-6">
	<div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
		<img
			src={order.image}
			alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt."
			class="h-full w-full object-cover object-center"
		/>
	</div>

	<div class="ml-4 flex flex-1 flex-col">
		<div>
			<div class="flex justify-between text-base font-medium text-gray-900">
				<h3 class="dark:text-white">
					{order.name}
				</h3>
				<p class="ml-4 dark:text-white">${order.price}</p>
			</div>
			<p class="mt-1 text-sm text-gray-600 dark:text-gray-300">{order.description}</p>
		</div>
		<div class="flex flex-1 items-center gap-2 justify-between text-sm">
			<input
				type="number"
				on:change={quantityUpdate}
				class="
        max-w-[100px] w-full text-gray-600 p-1 rounded dark:text-gray-300"
				bind:value={quantity}
			/>
			<div class="flex">
				<button
					on:click={updateCart}
					type="button"
					class="font-medium text-indigo-600 hover:text-indigo-500">Remove</button
				>
			</div>
		</div>
	</div>
</li>
