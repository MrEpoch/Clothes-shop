import type { Session } from '@supabase/supabase-js';
import type { LayoutServerLoad } from './(auth)/$types';

export const load: LayoutServerLoad = async ({
	locals: { getSession }
}: {
	locals: { getSession: () => Promise<Session> };
}) => {
	return {
		session: await getSession()
	};
};
