import { json } from "@sveltejs/kit";
import { getInitialProducts, getSearchProducts } from "lib/product";
import { Readable } from "stream";

export const GET = async ({ locals: { supabase }, url }: { locals: any, url: URL }) => {
    const search = url.searchParams.get('search');
    const page = url.searchParams.get('page') ?? '0';
    let skip = 0;
    let errorHappened = false;

    if (Number.isNaN(Number.parseInt(page))) {
        skip = 0;
    } else {
        skip = Number.parseInt(page);
    }

    const products = search ? await getInitialProducts(skip) : await getSearchProducts(search as string, skip);

    const productsWithImages = await Promise.all(products.map(async (product) => {
                const { data, error } = await supabase.storage.from('velvet-line').download(`images/${product.image}`);
                console.log(data);
                if (error) {
                    errorHappened = true
                } else {
                    const new_productImg = await blobToBase64(data);
                    product.image = new_productImg;
                    return product;
                }
    }))

    if (errorHappened) {
        return json({ error: true, products: [] });
    }

    return json({ error: false, products: productsWithImages });
}

function blobToBase64(blob) {
  // Create a readable stream from the Blob data
  const stream = new Readable();
  stream.push(blob);
  stream.push(null); // End the stream

  // Create a promise to read the stream and convert it to a Base64-encoded string
  return new Promise((resolve, reject) => {
    const chunks = [];
    stream.on('data', (chunk) => {
      chunks.push(chunk);
    });
    stream.on('end', () => {
      const buffer = Buffer.concat(chunks);
      const base64String = buffer.toString('base64');
      resolve(base64String);
    });
    stream.on('error', (error) => {
      reject(error);
    });
  });
}


