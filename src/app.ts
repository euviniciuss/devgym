import fastifyJwt from '@fastify/jwt'
import Fastify from 'fastify'
import { ZodError, z } from 'zod'
import { env } from './env'
import { appRoutes } from './http/routes'

export const app = Fastify({
	logger: false,
})

app.register(fastifyJwt, {
	secret: env.JWT_SECRET,
})

app.register(appRoutes)

app.setErrorHandler((error, _request, reply) => {
	if (error instanceof ZodError) {
		return reply.status(400).send({
			message: 'Validation error',
			issues: z.treeifyError(error),
		})
	}

	if (env.NODE_ENV !== 'production') {
		console.error(error)
	}

	return reply.status(500).send({
		message: 'Internal server error',
	})
})
