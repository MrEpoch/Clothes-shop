<script lang="ts">
	import type { Product } from '@prisma/client';
	import ProductCard from './ProductCard.svelte';
	export let form: { success: boolean; error: boolean; data: Product[] | undefined };
</script>

<div class="min-h-screen dark:bg-darkmode-500 dark:text-gray-100">
	<div
		class="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8 relative
        flex items-center justify-center"
	>
		{#if form?.data}
			<div class="w-full gap-10 h-full flex flex-wrap">
				{#each form.data as product}
					<ProductCard {product} />
				{/each}
			</div>
			<button
				on:click={() => (form.data = undefined)}
				class="px-4 py-2 bg-violet-500 text-white rounded absolute top-2 right-2">Search</button
			>
		{:else}
			<form method="POST" class="w-full" action="?/search">
				<label
					for="default-search"
					class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label
				>
				<div class="relative">
					<div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
						<svg
							class="w-4 h-4 text-gray-500 dark:text-gray-400"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 20 20"
						>
							<path
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
							/>
						</svg>
					</div>
					<input
						name="search"
						type="search"
						id="default-search"
						class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-violet-500 focus:border-violet-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500"
						placeholder="Search Products To Update"
						required
					/>
					<button
						type="submit"
						class="text-white absolute right-2.5 bottom-2.5 bg-violet-700 hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-violet-800"
						>Search</button
					>
				</div>
			</form>
		{/if}
	</div>
</div>
