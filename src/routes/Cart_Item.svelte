<script lang="ts">
    import Clothes from "assets/kid-clothes.webp";

    export let cart_item: any;
    const fake_item = {
        name: "Sunny Clothes",
        description: "Best for sunny days",
        price: "19.99",
        amount: 2,
        image: Clothes
    }
</script>

<div class="flex w-full min-h-[10rem]">
    <div class="min-h-full w-1/4">
        <img src={fake_item.image} class="aspect-square object-cover" alt={fake_item.name} />
    </div>
    <div class="w-1/2 flex flex-col p-4 gap-3">
        <p class="font-bold text-lg">{fake_item.name}</p>
        <p class="text-sm text-gray-400">{fake_item.description}</p>
        <p class="font-normal text-lg">{fake_item.amount}x</p>
    </div>
    <div class="min-h-full flex flex-col items-center justify-around w-1/4">
        <p class="font-bold text-xl">${fake_item.price}</p>
        <button class="text-blue-700 mb-2 text-lg font-semibold">Remove</button>
    </div>
</div>
