import { redirect } from "@sveltejs/kit";
import { getProduct } from "lib/product";

export const load = async ({ url }: { url: URL }) => {
    const product = url.searchParams.get("product") ?? "";

    const product_item = await getProduct(product);

    if (!product_item) throw redirect(303, "/");

    return {
        product: product_item
    }
}
