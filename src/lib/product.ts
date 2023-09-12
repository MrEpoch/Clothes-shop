import { redirect } from '@sveltejs/kit';
import { prisma } from './db';
import { cacheData, getCachedData, removeFromCachedProducts } from './cache';

export const getProduct = async (product_name: string) => {
	try {
        const isCached = await getCachedData(`product:${product_name}`);

        if (isCached) return isCached;

		const product = await prisma.product.findUnique({
			where: {
				name: product_name
			}
		});

        if (product) await cacheData(`product:${product.name}`, product);
		return product;
	} catch (error) {
		console.log(error);
		throw redirect(303, '/');
	}
};

export const getProductCount = async () => {
	try {
        const cachedProductCount = await getCachedData('count');
		if (cachedProductCount) {
			return cachedProductCount;
		}

		const productCount = await prisma.product.count();

		await cacheData('count', productCount, 60 * 60 * 2);

		return productCount;
	} catch (err) {
		console.log(err);
		return;
	}
}

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
        await removeFromCachedProducts(`initial`);
        await removeFromCachedProducts('count');
        return product;
	} catch (e) {
		console.log(e);
		return null;
	}
};

export const deleteProduct = async (id: string) => {
    try {
        const deleted = await prisma.product.delete({
            where: {
                id
            }
        });

        await removeFromCachedProducts(`product:${id}`);
        await removeFromCachedProducts(`initial`);
        await removeFromCachedProducts('count');
        return deleted;
    } catch (e) {
        console.log(e);
        return null;
    }
}
