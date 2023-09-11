import Redis from '@upstash/redis';
import { REDIS_URL } from '$env/static/private';

export const PRODUCT_IDS_KEY = 'product_ids';

export default new Redis({
    url: REDIS_URL
});
