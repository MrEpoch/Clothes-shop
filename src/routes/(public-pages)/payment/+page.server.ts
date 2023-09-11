import { fail, type Actions } from '@sveltejs/kit';
import { z } from 'zod';
import { makeOrder } from '$lib/order';
import { countries } from './countries';

export const actions: Actions = {
	default: async ({ locals: { getSession }, request }) => {
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
			const order = await makeOrder(
				await getSession(),
				JSON.parse(cart),
				email.data,
				phone.data,
				address.data,
				country.data,
				city.data,
				postalcode.data,
				name.data
			);
			if (!order) {
				return fail(400, { message: 'Order failed', failed: true });
			}

			return {
				url: order,
				failed: false,
				success: true
			};
        } catch (e) {
			console.log(e);
			return fail(400, { message: 'Order failed', failed: true });
		}
	}
};
