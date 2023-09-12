import Redis from 'ioredis';
import { REDIS_URL } from '$env/static/private';

export const PRODUCT_IDS_KEY = 'product_ids';

export default REDIS_URL ? new Redis(REDIS_URL) : new Redis();
