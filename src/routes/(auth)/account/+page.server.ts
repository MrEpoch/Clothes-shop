import { redirect, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
	logout: async ({ locals: { supabase, getSession } }) => {
		const session = await getSession();

		if (session) {
			await supabase.auth.signOut();
			throw redirect(303, '/');
		}
	}
};
