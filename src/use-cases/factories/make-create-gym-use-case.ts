import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { CreateGymUseCase } from '../create-gym'

export function makeCreateGymUseCaseUseCase() {
	const gymsRepository = new PrismaGymsRepository()
	const createGymUseCaseUseCase = new CreateGymUseCase(gymsRepository)

	return createGymUseCaseUseCase
}
