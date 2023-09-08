import { PrismaClient } from '@prisma/client';
import { NODE_ENV } from '$env/static/private';

const globalForPrisma = globalThis as unknown as {
	prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ log: ['query'] });

if (NODE_ENV !== 'production') {
	globalForPrisma.prisma = prisma;
}
