import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { CheckInUseCase } from '../check-in'

export function makeCreateCheckInUseCase() {
	const checkInRepository = new PrismaCheckInsRepository()
	const checkInUseCase = new CheckInUseCase(checkInRepository)

	return checkInUseCase
}
