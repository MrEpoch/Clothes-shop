import { redirect } from '@sveltejs/kit';
import { handleUser } from 'lib/user';

export const load = async ({ locals: { getSession } }) => {
	const session = await getSession();

	if (!session) throw redirect(302, '/');
	const user = await handleUser(session.user);

	if (user.role !== 'ADMIN') throw redirect(302, '/account');

	return {};
};
