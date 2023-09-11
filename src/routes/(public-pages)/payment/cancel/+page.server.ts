import { deleteOrder } from "lib/order";
import type { PageServerLoad } from "../$types";

export const load: PageServerLoad = async ({ cookies }) => {
    const orderId = cookies.get('order');
    if (orderId) {
        await deleteOrder(orderId);
    }

    return {};
}
