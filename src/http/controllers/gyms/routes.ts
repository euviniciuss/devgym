import type { FastifyInstance } from 'fastify'
import { verifyJWT } from '@/middlewares/verify-jwt'
import { verifyUserRole } from '@/middlewares/verify-user-role'
import { create, nearby, search } from '.'

export async function gymsRoutes(app: FastifyInstance) {
	app.addHook('onRequest', verifyJWT)

	app.get('/gyms/search', search)
	app.get('/gyms/nearby', nearby)

	app.post('/gyms', { onRequest: [verifyUserRole('ADMIN')] }, create)
}
