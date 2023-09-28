<script lang="ts">
	export let card: { image: string; Text: string };
	export let ind: number;
</script>

<div
	class={`w-full h-full items-center flex ${ind % 2 === 0 ? 'xl:flex-row' : 'xl:flex-row-reverse'} 
    flex-col xl:gap-5 gap-[5rem]`}
>
	<div
		class="rounded-xl w-[80%] sm:w-1/2 mr-10 mt-[5rem] max-w-[800px] aspect-video bg-gradient-to-r from-violet-500 to-pink-500 h-full"
	>
		<img
			src={card.image}
			alt="Who We Are"
			class={`translate-y-5 rounded-xl ${ind % 2 === 0 ? '-rotate-6' : 'rotate-6'} w-full
h-full object-cover translate-x-5`}
		/>
	</div>
	<p class="text-base sm:w-1/2 leading-relaxed text-gray-500 dark:text-gray-400">{card.Text}</p>
</div>
