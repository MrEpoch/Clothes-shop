import redis from "./redis";


export async function cacheData(key: string, data: any, expiration = 60 * 60 * 24) {
    try {
        await redis.setex(key, expiration, JSON.stringify(data));
    } catch (error) {
        console.error(error);
    }
}

export async function getCachedData(key: string) {
    try {
        const cached = await redis.get(key);
        if (cached) return JSON.parse(cached);
        return null;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function searchCachedData(key: string, count: number) {
    try {
        const data: any[] = [];
		const cache = redis.scanStream({
			match: key,
			type: 'string',
			count
		});
		for await (const key of cache) {
			await Promise.all(
                await key.map(async (product: any) => {
                    const product_redis = await redis.get(product);
                    if (product_redis) data.push(JSON.parse(product_redis));
				})
			);
        }
        if (data.length > 0) return data;
        return null;
    } catch (error) {
        console.error(error);
        return null;
    }
}
