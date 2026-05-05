import type { FastifyInstance } from 'fastify'
import { verifyJWT } from '@/middlewares/verify-jwt'
import { authenticate, profile, register } from './controllers'

export async function appRoutes(app: FastifyInstance) {
	app.post('/users', register)
	app.post('/sessions', authenticate)

	// Protected routes
	app.get('/me', { onRequest: [verifyJWT] }, profile)
}
