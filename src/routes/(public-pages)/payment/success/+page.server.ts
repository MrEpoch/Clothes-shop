import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";
import { TrueDbOrder } from "lib/order";

export const load: PageServerLoad = async ({ url, locals: { getSession }}) => {
    const orderSuccess = url.searchParams.get("order");

    if (!orderSuccess) {
        throw redirect(303, "/payment");
    }

    await TrueDbOrder(orderSuccess, await getSession());
}
