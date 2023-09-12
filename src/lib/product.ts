import { redirect } from '@sveltejs/kit';
import { prisma } from './db';
import { cacheData, getCachedData } from './cache';

export const getProduct = async (product_id: string) => {
	try {

        const isCached = await getCachedData(`product:${product_id}`);

        if (isCached) return isCached;

		const product = await prisma.product.findUnique({
			where: {
				id: product_id
			}
		});

        await cacheData(`product:${product.id}`, product);
		return product;
	} catch (error) {
		console.log(error);
		throw redirect(303, '/');
	}
};

export const getInitialProducts = async (page: number, nthInitial: number) => {
	try {

        const isInitial = await getCachedData(`initial`);

        if (isInitial && nthInitial < 5) return isInitial;

		const products = await prisma.product.findMany({
			take: 9,
			skip: 9 * page,
			orderBy: {
				createdAt: 'desc'
			}
        });

        await cacheData(`initial`, products, 60 * 60 * 2);

		return products;
	} catch (error) {
		console.log(error);
		throw redirect(303, '/');
	}
};

export const getSearchProducts = async (search: string, page: number) => {
	try {
		const products = await prisma.product.findMany({
			where: {
				OR: [
					{
						name: {
							contains: search,
							mode: 'insensitive'
						}
					},
					{
						description: {
							contains: search,
							mode: 'insensitive'
						}
					}
				]
			},
			take: 9,
			skip: 9 * page,
			orderBy: {
				createdAt: 'desc'
			}
		});
		return products;
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

        await cacheData(`product:${product.id}`, product);
		return product;
	} catch (e) {
		console.log(e);
		return null;
	}
};
