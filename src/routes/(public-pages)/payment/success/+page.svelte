<script lang="ts">
	import { cart } from 'lib/store';
	import { onMount } from 'svelte';

	onMount(() => {
		cart.set([]);
	});
</script>

<div
	class="min-h-screen items-center
    justify-center dark:bg-black/10 dark:text-white/90 flex flex-col"
>
	<div
		class="flex flex-col border-[3px] h-full aspect-square p-[2rem] sm:p-[4rem] rounded-[100%] border-green-300 gap-[2rem] md:gap-[4rem] items-center justify-center"
	>
		<h2
			class="text-5xl mx-auto w-full py-8 px-2 max-w-5xl mb-6
            font-medium text-center font-eczar pt-[2rem]"
		>
			Order Payment Success
		</h2>
		<svg class="text-green-700 w-10 md:w-16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
			><title>check</title><path
				fill="currentColor"
				d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"
			/></svg
		>
	</div>
</div>
