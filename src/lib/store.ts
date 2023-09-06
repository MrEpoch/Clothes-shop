import { persisted } from "svelte-local-storage-store";

export const theme = persisted("theme", "dark");

export const cart = persisted("cart_clothes", []);
