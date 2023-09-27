import { redirect, type Actions, fail } from "@sveltejs/kit";
import { getProduct, updateProduct } from "lib/product";
import type { categories } from "types/product";
import { z } from "zod";

export const load = async ({ params, locals: { supabase } }: { params: { id: string }, locals: { supabase: any } }) => {
    const productId = String(params.id);
    const product = await getProduct(productId);

    if (!product) {
        throw redirect(303, "/update-product");
    }

    const imagename = product.image;
    const { data, error } = await supabase.storage
        .from('velvet-line')
        .getPublicUrl(`images/${product.image}`, {
            format: 'webp'
        });
    product.image = data.publicUrl;

    return {
        product,
        imagename
    }
} 

export const actions: Actions = {
    update: async ({ request, locals: { supabase }, params }) => {
		try {
			const data = await request.formData();

			const normal_check = z.string().min(1);

            const id = String(params.id);
			const name = normal_check.safeParse(data.get('name'));
			const description = normal_check.safeParse(data.get('description'));
			const price = normal_check.safeParse(data.get('price'));
			const image = data.get('image') as File;
			const category = normal_check.safeParse(data.get('category'));
			const stripeId = normal_check.safeParse(data.get('stripeId'));
            const isimage = data.get('isimage');
            let imagename = String(data.get('imagename'));

			if (
				!name.success ||
				!description.success ||
				!price.success ||
				!category.success ||
				!stripeId.success
			) {
				return fail(400, {
					error: true,
					message: 'You must provide valid data'
				});
			}

			if (
				category.data !== 'men' &&
				category.data !== 'women' &&
				category.data !== 'kids' &&
				category.data !== 'shoes'
			) {
				return fail(400, {
					error: true,
					message: 'You must provide a valid category'
				});
			}


            if (isimage === 'true') {
                const img_ext = image?.name.split('.').pop();

                if (img_ext === undefined) {
                    return fail(400, {
                        error: true,
                        message: 'You must provide an image file'
                    });
                }

                const new_image_name = Math.random().toString(36).substring(2, 15) + '.' + img_ext;
                if (!['jpg', 'jpeg', 'png', 'webp'].includes(img_ext)) {
                    return fail(400, {
                        error: true,
                        message: 'You must provide a valid image file'
                    });
                }

                const newImage = await image.arrayBuffer();

                const { error } = await supabase.storage
                    .from('velvet-line')
                    .upload(`images/${new_image_name}`, newImage, {
                        cacheControl: '3600'
                    });

                if (error) {
                    return fail(500, {
                        error: true,
                        message: 'Error uploading image'
                    });
                }
                imagename = new_image_name;
            }

			if (Number.isNaN(Number.parseFloat(price.data))) {
				return fail(400, {
					error: true,
					message: 'You must provide a valid price'
				});
			}

			const new_price: number = parseFloat(parseFloat(price.data).toFixed(2));

			await updateProduct(
				name.data as string,
				description.data as string,
				category.data as categories,
				new_price,
				stripeId.data as string,
                imagename,
                id
			);
		} catch (error) {
			console.log(error);
			return fail(500, {
				error: true,
				message: 'Something went wrong'
			});
		}
		throw redirect(303, '/update-product');
    },    
    delete: async ({ request, params }) => {

    }
}
