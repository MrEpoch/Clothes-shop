import type { Product as ProductDb } from '@prisma/client';

export enum categories {
	women,
	men,
	kids,
	shoes
}

export interface CategoryLanding {
	category: string;
	img: string;
}

export interface Product {
	id: string;
	name: string;
	price: number;
	description: string;
	category: categories;
	image: string;
	stripeProductId: string;
}

export interface CartItem extends Product {
	quantity: number;
}

export interface RedisOrder {
	address: string;
	country: string;
	email: string;
	city: string;
	postalCode: string;
	phone: string;
	FullName: string;
	order: CartItem[];
	products: ProductDb[];
}

export interface OrderStripe {
	price: string;
	quantity: number;
}
