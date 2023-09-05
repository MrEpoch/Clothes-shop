<script lang="ts">
    import BuyingClothes from "assets/buying-clothes.webp";
    import Sale from "assets/fall-deal.webp";
    import { lazyLoad } from "lib";
    import KidClothes from "assets/kid-clothes.webp";
    import WomanClothes from "assets/women-clothes.webp";
    import MenShirt from "assets/men-shirt.webp";
    import Shoes from "assets/shoes.webp";
	import CategoryCard from "./CategoryCard.svelte";

    const ad_info = {
        title: "Grand discount",
        subtitle: "Up to 50% off",
        image: Sale
    }

    const categories = [
        {
            category: "Men",
            img: MenShirt,
        },
        {
            category: "Women",
            img: WomanClothes,
        },
        {
            category: "Kids",
            img: KidClothes,
        },
        {
            category: "Shoes",
            img: Shoes,
        }
    ];

    let isAnimating = true;
</script>

<div class="min-h-screen flex flex-col items-center justify-center dark:bg-black/10 dark:text-white/90">
    <div class={`min-h-screen flex w-full absolute z-[-1] top-0 bg-gray-200 dark:bg-gray-800 ${isAnimating ? "animate-pulse" : ""}`}>
        <img on:load={() => isAnimating = false} use:lazyLoad={BuyingClothes} alt="Buying Clothes" class="
         opacity-0 min-h-full w-full object-cover" />
    </div>
    <section class="mt-[10rem] min-h-screen flex w-full p-10 flex-col">
        <div class="py-8 bg-white/70 dark:bg-black/50 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
            <div class="blur-sm w-full h-full z-10"></div>
            <h1 class="mb-4 sm:text-4xl text-2xl font-extrabold tracking-tight leading-none text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
                Discover Fashion that Defines You
            </h1>
            <p class="mb-8 text-sm sm:text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">
                Step into a world where style isn't just clothing; it's an expression of who you are. 
                <span class="hidden sm:block">Explore our curated collections and find fashion that mirrors your unique personality and taste.</span> 
            </p>
            <div class="flex flex-col space-y-4 items-center sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                <a href="/catalog" class="inline-flex justify-center items-center py-3 
                    px-5 text-base font-medium max-w-[200px] text-center text-white rounded-lg 
                    bg-gradient-to-r from-violet-400 to-pink-400 hover:bg-blue-800 
                    focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
                    Catalog
                    <svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                </a>
            </div>
        </div>
    </section>
    <div class="min-h-screen flex items-center justify-center flex-col mt-[5rem] w-full">
        <div id="great-deal" class="px-4 align-center min-h-[200px] w-[calc(100%-75px)] items-center flex flex-col justify-center
            h-full relative mx-auto max-w-screen-lg lg:py-24">
            <img class="w-full z-[-1] min-h-full h-full object-cover absolute" src={Sale} alt="Buying Clothes" />
            <div class="min-h-full w-full flex flex-col items-center justify-around">
                <h2 class="mb-4 text-4xl font-bold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                    {ad_info.title}
                </h2>
                <p class="mb-8 text-lg dark:text-white font-bold lg:text-xl sm:px-16 lg:px-48">
                    {ad_info.subtitle}
                </p>
                <button class="bg-gradient-to-r from-violet-400 to-pink-400
                    hover:bg-blue-800 focus:ring-4 text-white focus:ring-blue-300 font-medium 
                    rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-blue-900">        
                    Buy Now
                </button>
            </div>
        </div>
    </div>
    <div class="min-h-screen flex items-start flex-col pb-[8rem] w-full">
        <div class="flex gap-[2rem] flex-wrap justify-center max-w-screen-xl mx-auto">
            {#each categories as category}
                <CategoryCard {category} />
            {/each}
        </div>
    </div>
</div>
