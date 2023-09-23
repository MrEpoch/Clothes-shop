<script lang="ts">
	import ProductCard from './ProductCard.svelte';
	import type { categories } from 'types/product';
	import { page } from '$app/stores';

	$: ({ products, category } = $page.data);
	$: searchTerm = $page.url.searchParams.get('search') || '';

	let selected: categories = category as unknown as categories;

	function searchChange(evt) {
		searchTerm = evt.target.value;
	}
</script>

<div class="min-h-screen gap-[3rem] flex flex-col dark:bg-black/10 dark:text-white/90">
	<h2
		class="text-5xl mx-auto w-full py-8 px-2 max-w-5xl mb-6 font-medium text-center font-eczar pt-[2rem]"
	>
		Our Products
	</h2>
	<div
		class="flex flex-col gap-[2rem] mb-[4rem] pt-[2rem] justify-between sm:flex-row
        items-center min-h-16 max-h-20 h-full w-full max-w-5xl mx-auto py-8 px-4"
	>
		<select
			bind:value={selected}
			id="category"
			name="category"
			class="bg-gray-50 border border-gray-300 sm:w-fit w-full
            text-gray-900 text-sm rounded focus:ring-primary-500 focus:border-primary-500
            block p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
            dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
		>
			<option selected={category.length === 0} value="all">All</option>
			<option selected={category === 'men'} value="men">Men's</option>
			<option selected={category === 'women'} value="women">Women's</option>
			<option selected={category === 'kids'} value="kids">Kid's</option>
			<option selected={category === 'shoes'} value="shoes">Shoes</option>
		</select>
		<form action="/catalog" class="w-full max-w-[400px]">
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
					on:change={searchChange}
					type="search"
					value={searchTerm}
					class="block
                w-full p-4 pl-10 text-[9px] sm:text-sm
                text-gray-900 border border-gray-300 rounded bg-gray-50 focus:ring-blue-500
                focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					placeholder="Search products"
				/>
				<button
					type="submit"
					class="text-white absolute right-2.5 sm:bottom-2.5
                    bottom-[0.4rem] bg-gradient-to-r dark:from-violet-800 from-violet-500 to-pink-400
                    dark:to-pink-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300
                    font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700
                dark:focus:ring-blue-800">Search</button
				>
			</div>
		</form>
	</div>
	<div
		class="min-h-full pb-[5rem] w-full flex max-w-7xl flex-wrap justify-center gap-[3rem] mx-auto py-8 px-4"
	>
		{#each $products as product}
			<ProductCard {product} {selected} />
		{/each}
	</div>
</div>
