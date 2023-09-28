import type { Session } from '@supabase/supabase-js';
import { redirect } from '@sveltejs/kit';
import { handleUser } from 'lib/user';

export const load = async ({
	locals: { getSession }
}: {
	locals: { getSession: () => Promise<Session> };
}) => {
	const session = await getSession();

	if (!session) throw redirect(302, '/');
	const user = await handleUser(session.user);

	if (user.role !== 'ADMIN') throw redirect(302, '/account');

	return {};
};
