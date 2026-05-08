import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreateGymUseCaseUseCase } from '@/factories'

export async function create(request: FastifyRequest, reply: FastifyReply) {
	const createBodySchema = z.object({
		title: z.string(),
		description: z.string().nullable(),
		phone: z.string().nullable(),
		latitude: z.number().refine((value) => {
			return Math.abs(value) <= 90
		}),
		longitude: z.number().refine((value) => {
			return Math.abs(value) <= 180
		}),
	})

	const { title, description, phone, latitude, longitude } =
		createBodySchema.parse(request.body)

	const createGymUseCase = makeCreateGymUseCaseUseCase()

	await createGymUseCase.execute({
		title,
		description,
		phone,
		latitude,
		longitude,
	})

	return reply.status(201).send()
}
