import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "../(sign-pages)/login/$types";

export const load: PageServerLoad = async ({ locals: { getSession }, url }) => {
    const session = await getSession();
    if (!session) {
        throw redirect(303, `/login?redirectTo=${url.pathname}`);
    }

    return {
        session
    }
}
