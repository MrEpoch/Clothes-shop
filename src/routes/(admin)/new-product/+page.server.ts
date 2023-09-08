import type { Actions } from "@sveltejs/kit";
import { categories, createProduct } from "lib/product";
import { addImage } from "lib/storage";

export const actions: Actions = {
    default: async ({ request, locals: { supabase } }) => {
        const data = await request.formData();
        const name = data.get("name");
        const description = data.get("description");
        const price = data.get("price");
        const image = data.get("image");
        const category = data.get("category");
        const stripeId = data.get("stripeId");

        const new_image_name = 
            Math.random().toString(36).substring(2, 15) + image.name.split(".").pop();
        const image_file = new Uint8Array(await image.arrayBuffer());

        const uploaded = await addImage(image_file, new_image_name, supabase); 
        if (!uploaded) return;

        const product = await createProduct(name as string, 
            description as string, category as categories, price as number, stripeId as string, new_image_name as string);
    }
}
