import { json, type Cookies } from '@sveltejs/kit';
import { getInitialProducts, getSearchProducts } from 'lib/product';

export const GET = async ({
	locals: { supabase },
	url,
	cookies
}: {
	locals: any;
	url: URL;
	cookise: Cookies;
}) => {
	const search = url.searchParams.get('search');
	const page = url.searchParams.get('page') ?? '0';
	let skip = 0;
	let errorHappened = false;

	let initialReload = await cookies.get('initialReload');
	if (!initialReload) {
		await cookies.set('initialReload', 0, {
			path: '/',
			maxAge: 60 * 60 * 2
		});
		initialReload = 0;
	}

	if (Number.isNaN(Number.parseInt(page))) {
		skip = 0;
	} else {
		skip = Number.parseInt(page);
	}

	let products;
	if (
		search !== null &&
		typeof search === 'string' &&
		search !== 'null' &&
		search !== 'undefined'
	) {
		products = await getSearchProducts(search as string, skip);
	} else {
		products = await getInitialProducts(
			skip,
			typeof initialReload === 'string' ? Number.parseInt(initialReload) : initialReload
		);
	}

	const productsWithImages = await Promise.all(
		products.map(async (product: any) => {
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

	if (errorHappened) {
		return json({ error: true, products: [] });
	}

	return json({ error: false, products: productsWithImages });
};
