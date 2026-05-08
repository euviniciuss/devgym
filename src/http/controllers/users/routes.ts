import type { FastifyInstance } from 'fastify'
import { verifyJWT } from '@/middlewares/verify-jwt'
import { authenticate, profile, register } from '.'

export async function usersRoutes(app: FastifyInstance) {
	app.post('/users', register)
	app.post('/sessions', authenticate)

	// Protected routes
	app.get('/me', { onRequest: [verifyJWT] }, profile)
}
