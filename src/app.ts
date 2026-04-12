import { PrismaPg } from '@prisma/adapter-pg'
import Fastify from 'fastify'
import { env } from '@/env'
import { PrismaClient } from '../generated/prisma/client'

export const app = Fastify({
	logger: false,
})

export const schema =
	new URL(env.DATABASE_URL).searchParams.get('schema') || 'public'

const adapter = new PrismaPg({ connectionString: env.DATABASE_URL }, { schema })

const prisma = new PrismaClient({
	adapter,
	log: env.NODE_ENV === 'dev' ? ['query'] : [],
})

prisma.user.create({
	data: {
		name: 'Marcus Vinicius',
		email: 'teste@gmail.com',
	},
})
