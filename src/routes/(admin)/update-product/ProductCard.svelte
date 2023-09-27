<script lang="ts">
    export let product: import("@prisma/client").Product;
</script>

<a href={`/update-product/${product.id}`} class="relative transition group aspect-square max-w-[300px] w-full">
    <img src={product.image} alt="" class="w-full transition duration-300 h-full object-cover object-center group-hover:opacity-50" />
    <h3 class="absolute group-hover:flex hidden top-2 h-full transition w-full items-center justify-center
    font-extrabold text-xl">{product.name}</h3>
</a>

