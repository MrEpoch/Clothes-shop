import { redirect } from '@sveltejs/kit';
import { prisma } from './db';

export const getProduct = async (product_id: string) => {
	try {
		const product = await prisma.product.findUnique({
			where: {
				id: product_id
			}
		});

		return product;
	} catch (error) {
		console.log(error);
		throw redirect(303, '/');
	}
};

export enum categories {
	women = 'women',
	men = 'men',
	kids = 'kids',
	shoes = 'shoes'
}

export const createProduct = async (
	name: string,
	description: string,
	category: categories,
	price: number,
	stripeId: string,
	image_name: string
) => {
	try {
		const product = await prisma.product.create({
			data: {
				name,
				description,
				category,
				price,
				stripeProductId: stripeId,
				image: image_name
			}
		});

		return product;
	} catch (e) {
		console.log(e);
		return null;
	}
};
