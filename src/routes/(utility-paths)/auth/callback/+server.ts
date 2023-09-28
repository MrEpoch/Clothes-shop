import type { SupabaseClient } from '@supabase/supabase-js';
import { redirect } from '@sveltejs/kit';

export const GET = async ({
	url,
	locals: { supabase }
}: {
	url: URL;
	locals: { supabase: SupabaseClient };
}) => {
	const code = url.searchParams.get('code');

	if (code) {
		await supabase.auth.exchangeCodeForSession(code);
	}

	throw redirect(303, '/account');
};
