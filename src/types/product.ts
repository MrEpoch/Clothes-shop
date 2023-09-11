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
