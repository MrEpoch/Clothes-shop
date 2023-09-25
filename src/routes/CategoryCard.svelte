<script lang="ts">
	import { lazyLoad } from 'lib';
	import type { CategoryLanding } from 'types/product';

	export let category: CategoryLanding;
	let isAnimating = true;
</script>

<a
	href={`/catalog?category=${category.category.toLowerCase()}`}
	class={` ${isAnimating ? 'animate-pulse' : ''}
    w-full sm:w-[calc(50%-10px)] relative aspect-square h-full hover:scale-[1.02] transition-transform duration-300
    bg-gray-300 dark:bg-gray-800`}
>
	<img
		use:lazyLoad={category.img}
		alt={category.category}
		on:load={() => (isAnimating = false)}
		class="
    w-full brightness-50 opacity-0 h-full object-cover bg-no-repeat"
	/>
	<h3
		class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-white"
	>
		{category.category}
	</h3>
</a>
