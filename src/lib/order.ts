import { STRIPE_SECRET_KEY } from '$env/static/private';
import { cacheData, getCachedData } from './cache';
import { prisma } from './db';
import Stripe from 'stripe';

const stripe = new Stripe(STRIPE_SECRET_KEY, {
	apiVersion: '2023-08-16'
});

async function mapOverOrders(orders: any) {
	const ordersWithProducts = await Promise.all(
		orders.map(async (order: any) => {
			const product = await prisma.product.findUnique({
				where: {
					id: order.id
				}
			});
			return product;
		})
	);
	return ordersWithProducts;
}

export const makeOrder = async (
	order: any,
	email: string,
	phone: string,
	address: string,
	country: string,
	city: string,
	postalcode: string,
    name: string,
    orderId: string
) => {
	try {
		const products = await mapOverOrders(order);
		const orders = order.map((item: any) => {
			const product = products.find((product: any) => product.id === item.id);
			if (!product) {
				return;
			}
			return {
				price: product.stripeProductId,
				quantity: item.quantity
			};
		});

		const session = await stripe.checkout.sessions.create(
			{
				line_items: orders,
				mode: 'payment',
				success_url: 'http://localhost:5173/payment/success',
				cancel_url: 'http://localhost:5173/payment/cancel'
			},
			{
				apiKey: STRIPE_SECRET_KEY
			}
		);

        await cacheData(`order:${orderId}`, {
            address,
            country,
            email,
            city,
            postalCode: postalcode,
            phone,
            FullName: name,
            order,
            products
        }, 60 * 60);

        return {
            url: session.url,
        }
	} catch (e) {
		console.log(e);
		return null;
	}
};

export const TrueDbOrder = async (orderId: string, session_auth: any) => {
    const orderCached = await getCachedData(`order:${orderId}`);
    
    if (!orderCached) {
        return null;
    }

    const order_db = await prisma.order.create({
			data: {
                address: orderCached.address,
                country: orderCached.country,
                email: orderCached.email,
                city: orderCached.city,
                postalCode: orderCached.postalCode,
                phone: orderCached.phone,
				FullName: orderCached.FullName,
				orderItems: {
					create: orderCached.products.map((item: any) => {
						return {
							quantity: orderCached.order.find((order: any) => order.id === item.id).quantity,
							Product: {
								connect: {
									id: item.id
								}
							}
						};
					})
				}
			}
		});

		if (session_auth && session_auth.user) {
            const user = await prisma.user.findUnique({
                where: {
                    supabaseUserId: session_auth.user.id
                }
            })

            if (user) {
                await prisma.order.update({
                    where: {
                        id: order_db.id
                    },
                    data: {
                        userId: user.id
                    }
                });
            }
		}

    return order_db;
}

export const deleteOrder = async (orderId: string) => {
    try {
        await prisma.orderItem.deleteMany({
            where: {
                orderId: orderId
            }
        })

        await prisma.order.delete({
            where: {
                id: orderId
            }
        });

        return true;
    } catch (e) {
        console.log(e);
        return null;
    }
}
