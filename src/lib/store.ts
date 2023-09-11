import { persisted } from 'svelte-local-storage-store';
import type { CartItem } from 'types/product';

export const theme = persisted('theme', 'dark');

export const cart = persisted('cart_clothes', [] as CartItem[]);
