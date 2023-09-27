import { redirect, type Actions, fail } from '@sveltejs/kit';
import { getProduct, getSearchProducts } from 'lib/product';
import { categories, createProduct } from 'lib/product';
import { z } from 'zod';

export const load = async ({ url }: { url: URL }) => {
};



export const actions: Actions = {
    search: async ({ request, locals: { supabase } }) => {
        try {
            const data = await request.formData();
            const search = String(data.get('search'));
            const search_data = await getSearchProducts(search, 0);
            let errorHappened = false;
            const productsWithImages = await Promise.all(
                search_data.map(async (product: any) => {
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
            )
            if (errorHappened) return fail(400, { error: true });

            return {
                data: productsWithImages,
                success: true
            }
        } catch (error) {
            console.log(error);
            return fail(400, { error: true });
        }
    },
	
	delete: async ({ request, locals: { supabase } }) => {}
};
