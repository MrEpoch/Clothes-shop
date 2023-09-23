export async function GET({ locals: { getSession, supabase } }) {
    const session = await getSession()
    if (!session) {
        return new Response(null, {
            status: 302,
            headers: {
                Location: "/"
            }
        });
    }
    await supabase.auth.signOut();
	return new Response(null, {
		status: 302,
		headers: {
			Location: "/"
		}
	});
}
