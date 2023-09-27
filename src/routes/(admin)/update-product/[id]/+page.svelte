<script lang="ts">
    export let data;

    const { product }: { product: import("@prisma/client").Product } = data;

	let image: null | File[] = null;
    export let form: { error: null | string, message: null | string };
</script>

<div class="min-h-screen dark:bg-black/10 dark:text-white/90">
	{#if form?.error}
		<p class="text-red-500">{form.message}</p>
	{/if}
	<div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
		<h2 class="mb-4 text-2xl font-bold text-gray-900 dark:text-white">Add a new product</h2>
		<form action="?/update" method="POST" enctype="multipart/form-data">
			<div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
				<div class="sm:col-span-2">
					<label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						>Product Name</label
					>
					<input
						type="text"
                        name="name"
                        value={product.name}
						id="name"
						class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
						placeholder="Type product name"
						required
					/>
				</div>
				<div class="w-full">
					<label for="StripeId" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						>Stripe Id</label
					>
					<input
						type="text"
                        value={product.stripeProductId}
						name="stripeId"
						id="stripeId"
						class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
						placeholder="Stripe Price Id"
						required
					/>
				</div>
				<div class="w-full">
					<label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						>Price</label
					>
					<input
						type="number"
						name="price"
                        step="0.01"
                        value={product.price}
						id="price"
						class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
						placeholder="$29"
						required
					/>
				</div>
				<div>
					<label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						>Category</label
					>
					<select
						id="category"
                        name="category"
                        value={product.category}
						class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
					>
						<option selected value="men">Men's</option>
						<option value="women">Women's</option>
						<option value="kids">Kid's</option>
						<option value="shoes">Shoes</option>
					</select>
				</div>
				<div class="sm:col-span-2">
					<label
						for="description"
						class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label
					>
					<textarea
                        value={product.description}
						id="description"
						name="description"
						rows="8"
						class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
						placeholder="Your description here"
					/>
				</div>
				<div class="h-80 group relative sm:col-span-2">
                    {#if image}
                        <input type="hidden" name="isimage" value="true" />
						<img
							class="rounded-lg group-hover:brightness-50 transition w-full h-full object-cover"
							src={URL.createObjectURL(image[1])}
							alt=""
						/>
					{:else}
                        <img
							class="rounded-lg group-hover:brightness-50 transition w-full h-full object-cover"
							src={product.image}
							alt=""
                        />
                        <h3 class="absolute group-hover:flex hidden transition top-2 h-full transition w-full items-center 
                        justify-center font-extrabold text-xl">Update Image</h3>
					{/if}
                    <input type="hidden" name="imagename" value={data?.imagename} />
                    <input
                        value={image}
						type="file"
						bind:files={image}
						class="absolute w-full h-full z-10 top-0 left-0 opacity-0 cursor-pointer"
						name="image"
					/>
				</div>
			</div>
			<button
				type="submit"
				class="w-full items-center
                px-5 py-3 mt-4 sm:mt-6 text-sm font-medium text-center
                text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200
                dark:focus:ring-blue-900 hover:bg-blue-800"
			>
				Update product
			</button>
		</form>
	</div>
</div>
