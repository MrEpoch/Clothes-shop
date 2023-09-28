import type { Product } from '@prisma/client';
import { type Actions, fail } from '@sveltejs/kit';
import { getInitialProducts, getSearchProducts } from 'lib/product';

export const load = async () => {
	const initial = getInitialProducts(0, 15);

	return { initial };
};

export const actions: Actions = {
	search: async ({ request, locals: { supabase } }) => {
		try {
			const data = await request.formData();
			const search = String(data.get('search'));
			const search_data = await getSearchProducts(search, 0);
			let errorHappened = false;
			const productsWithImages = await Promise.all(
				search_data.map(async (product: Product) => {
					const { data, error } = await supabase.storage
						.from('velvet-line')
						.getPublicUrl(`images/${product.image}`, {
							format: 'webp'
						});
					if (error) {
						errorHappened = true;
					} else {
						product.image = data.publicUrl;
						return product;
					}
				})
			);
			if (errorHappened) return fail(400, { error: true });

			return {
				data: productsWithImages,
				success: true
			};
		} catch (error) {
			console.log(error);
			return fail(400, { error: true });
		}
	}
};
