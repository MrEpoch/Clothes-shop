<script lang="ts">
	import AboutCard from './AboutCard.svelte';
	import SuitsBunch from 'assets/suits-bunch.webp';
	import Choosing from 'assets/choosing-clothes.webp';
	import WomanLaughing from 'assets/woman-laughing.webp';

	const cards = [
		{
			image: WomanLaughing,
			Text: `Velvet Line was founded in 2023 by a group of fashion 
        enthusiasts who shared a common passion for helping people look and feel their best.
        Our journey began with a simple idea: to provide high-quality clothing that not only reflects the 
        latest fashion trends but also ensures comfort and affordability for our customers.`
		},
		{
			image: Choosing,
			Text: `Over the years, we've grown from a small startup to a 
            thriving company with a dedicated team of designers, fashion experts, 
            and customer service professionals. We take pride in curating a diverse 
            range of clothing options that cater to various styles, body types, and occasions.
        `
		},
		{
			image: SuitsBunch,
			Text: `At Velvet Line, we believe that everyone deserves to have access to fashionable 
        clothing that suits their unique preferences. We're committed to offering a wide selection 
        of clothing items that are not only on-trend but also made to last. Our dedication to 
        sustainability means we source eco-friendly materials and promote ethical 
        practices throughout our supply chain.
`
		}
	];
</script>

<div class="min-h-screen py-[10rem] dark:bg-black/10 dark:text-white/90 w-full">
	<section
		class="max-w-screen-2xl mb-[5rem] mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 flex flex-col gap-[5rem]"
	>
		<h1
			class="text-2xl text-center sm:text-4xl
            font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl
            lg:text-6xl dark:text-white"
		>
			Learn About Us!
		</h1>
		<div class="flex flex-col gap-[10rem]">
			{#each cards as item, index}
				<AboutCard card={item} ind={index} />
			{/each}
		</div>
	</section>
</div>
