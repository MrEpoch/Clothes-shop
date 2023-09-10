<script lang="ts">
	import KidClothes from 'assets/kid-clothes.webp';
	import ProductCard from './ProductCard.svelte';
    import type { TempProduct, categories } from 'types/product';
    import { page } from '$app/stores';

	let selected: categories = 'men' as unknown as categories;
    $: ({ products } = $page.data);
	$: searchTerm = $page.url.searchParams.get('search') || '';

	const fake_products: TempProduct[] = [
		{
			name: 'T-shirt',
			image: KidClothes,
			price: 29,
			category: 'men' as unknown as TempProduct['category']
		},
		{
			name: 'T-shirt',
			image: KidClothes,
			price: 29,
			category: 'men' as unknown as TempProduct['category']
		},
		{
			name: 'T-shirt',
			image: KidClothes,
			price: 29,
			category: 'men' as unknown as TempProduct['category']
		},
		{
			name: 'T-shirt',
			image: KidClothes,
			price: 29,
			category: 'men' as unknown as TempProduct['category']
		},
		{
			name: 'T-shirt',
			image: KidClothes,
			price: 29,
			category: 'men' as unknown as TempProduct['category']
		},
		{
			name: 'T-shirt',
			image: KidClothes,
			price: 29,
			category: 'men' as unknown as TempProduct['category']
		},
		{
			name: 'T-shirt',
			image: KidClothes,
			price: 29,
			category: 'men' as unknown as TempProduct['category']
		},
		{
			name: 'T-shirt',
			image: KidClothes,
			price: 29,
			category: 'men' as unknown as TempProduct['category']
		},
		{
			name: 'T-shirt',
			image: KidClothes,
			price: 29,
			category: 'men' as unknown as TempProduct['category']
		}
	];
</script>

<div class="min-h-screen gap-[3rem] flex flex-col dark:bg-black/10 dark:text-white/90">
	<div
		class="flex flex-col gap-[2rem] mb-[4rem] pt-[2rem] justify-between sm:flex-row items-center min-h-16 max-h-20 h-full w-full max-w-5xl mx-auto py-8 px-4"
	>
		<select
			bind:value={selected}
			id="category"
			name="category"
			class="bg-gray-50 border border-gray-300 max-w-[300px]
            text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500
            block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
            dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
		>
			<option selected value="men">Men's</option>
			<option value="women">Women's</option>
			<option value="kids">Kid's</option>
			<option value="shoes">Shoes</option>
		</select>
        <form class="w-full max-w-[400px]">
            <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div class="relative">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                <input type="search" value={searchTerm} class="block w-full p-4 pl-10 text-[9px] sm:text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required>
                <button type="submit" class="text-white absolute right-2.5 sm:bottom-2.5 bottom-[0.4rem] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
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
