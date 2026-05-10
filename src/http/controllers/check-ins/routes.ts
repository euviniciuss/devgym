import type { FastifyInstance } from 'fastify'
import { verifyJWT } from '@/middlewares/verify-jwt'
import { verifyUserRole } from '@/middlewares/verify-user-role'
import { create, history, metrics, validate } from '.'

export async function checkInsRoutes(app: FastifyInstance) {
	app.addHook('onRequest', verifyJWT)

	app.get('/check-ins/history', history)
	app.get('/check-ins/metrics', metrics)

	app.post('/gyms/:gymId/check-ins', create)
	app.patch(
		'/check-ins/:checkInId/validate',
		{ onRequest: [verifyUserRole('ADMIN')] },
		validate,
	)
}
