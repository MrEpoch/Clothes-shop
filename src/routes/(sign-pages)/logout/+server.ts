import type { Session, SupabaseClient } from '@supabase/supabase-js';

export async function GET({
	locals: { getSession, supabase }
}: {
	locals: { getSession: () => Promise<Session>; supabase: SupabaseClient };
}) {
	const session = await getSession();
	if (!session) {
		return new Response(null, {
			status: 302,
			headers: {
				Location: '/'
			}
		});
	}
	await supabase.auth.signOut();
	return new Response(null, {
		status: 302,
		headers: {
			Location: '/'
		}
	});
}
