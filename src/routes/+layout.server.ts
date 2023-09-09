import type { LayoutServerLoad } from './(auth)/$types';

export const load: LayoutServerLoad = async ({ locals: { getSession } }) => {
	return {
		session: await getSession()
	};
};
