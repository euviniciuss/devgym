import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { GetUserCheckInsHistoryUseCase } from '@/use-cases/get-user-check-ins-history'

export function makeGetUserCheckInsHistoryUseCase() {
	const checkInRepository = new PrismaCheckInsRepository()
	const getUserCheckInsHistoryUseCase = new GetUserCheckInsHistoryUseCase(
		checkInRepository,
	)

	return getUserCheckInsHistoryUseCase
}
