import { getProduct } from "lib/product";

export const load = async ({ params }: { params: { id: string } }) => {
    const productId = params.id;

    const product = await getProduct(productId);

    return {
        product
    }
} 
