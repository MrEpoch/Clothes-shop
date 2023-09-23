import { fail, type Actions } from '@sveltejs/kit';
import { z } from 'zod';
import { makeOrder } from '$lib/order';
import { countries } from './countries';

export const actions: Actions = {
	default: async ({ locals: { getSession }, request, cookies }) => {
		const data = await request.formData();

		const standardString = z.string().min(2);
		const standardEmail = z.string().email();
		const standardPhone = z.string().min(7);
		const standardPostcode = z.string().regex(/^\d{5}$/);

		const email = standardEmail.safeParse(data.get('email'));
		const phone = standardPhone.safeParse(data.get('phone'));
		const name = standardString.safeParse(data.get('full_name'));
		const address = standardString.safeParse(data.get('address'));
		const country = standardString.safeParse(data.get('country'));
		const city = standardString.safeParse(data.get('city'));
		const postalcode = standardPostcode.safeParse(data.get('postal_code'));
		const cart = data.get('cart') as string;

		if (typeof cart !== 'string') {
			return fail(400, { message: 'Order failed', failed: true });
		}

		if (
			!email.success ||
			!phone.success ||
			!name.success ||
			!address.success ||
			!country.success ||
			!city.success ||
			!postalcode.success
		) {
			return fail(400, { message: 'Order failed', failed: true });
		}

		if (countries.indexOf(country.data) === -1) {
			return fail(400, { message: 'Order failed', failed: true });
		}

		try {
			const cart_items = JSON.parse(cart);

			if (cart_items.length === 0) {
				return fail(400, { message: 'Order failed', failed: true });
			}

			const orderId =
				Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

			const order = await makeOrder(
				cart_items,
				email.data,
				phone.data,
				address.data,
				country.data,
				city.data,
				postalcode.data,
				name.data,
				orderId
			);
			if (!order) {
				return fail(400, { message: 'Order failed', failed: true });
			}

			return {
				url: order.url,
				failed: false,
				success: true
			};
		} catch (e) {
			console.log(e);
			return fail(400, { message: 'Order failed', failed: true });
		}
	}
};
