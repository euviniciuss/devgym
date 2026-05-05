import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { GetNearbyGymsUseCase } from '@/use-cases/get-nearby-gyms'

export function makeGetNearbyGymsUseCase() {
	const gymsRepository = new PrismaGymsRepository()
	const getNearbyGymsUseCase = new GetNearbyGymsUseCase(gymsRepository)

	return getNearbyGymsUseCase
}
