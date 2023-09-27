import { redirect, type Actions, fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { z } from 'zod';

export const load: PageServerLoad = async ({ url, locals: { getSession } }) => {
	const session = await getSession();
	if (session) {
		throw redirect(303, '/account');
	}

	return { url: url.origin };
};

export const actions: Actions = {
    default: async ({ request, locals: { supabase }, url }) => {
        try {
            const data = await request.formData();
            const zodEmail = z.string().email();
            const zodPassword = z.string().min(8);

            const email = zodEmail.safeParse(data.get('email'));
            const password = zodPassword.safeParse(data.get('password'));

            if (!email.success || !password.success) {
                return fail(400, { message: 'You must provide valid data', error: true });
            }

            const { error } = await supabase.auth.signInWithPassword({
                email: email.data,
                password: password.data,
            })

            if (error) {
                console.log(error);
                return fail(400, { message: "Error logging in", error: true });
            }

        } catch (error) {
            console.log(error);
            return fail(400, { message: "Error logging in", error: true });
        }

        throw redirect(303, "/account");
    }
}
