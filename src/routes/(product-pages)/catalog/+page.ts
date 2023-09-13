import { redirect } from '@sveltejs/kit';
import { writable } from 'svelte/store';

export const load = async ({ url, depends, fetch }: { url: URL; depends: any }) => {
	depends('products:data');
	try {
		const search = url.searchParams.get('search');
		const page = url.searchParams.get('page') ?? '0';
		const category = url.searchParams.get('category') ?? 'all';

		const resp = await fetch(`/search?search=${search}&page=${page}`);
		const products = await resp.json();
		if (products.error) throw redirect(303, '/');

		return {
			category,
			products: writable(products.products)
		};
	} catch (error) {
		console.log(error);
		throw redirect(303, '/');
	}
};
