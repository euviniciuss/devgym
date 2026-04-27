import { prisma } from '@/lib/prisma'
import type { CheckInUncheckedCreateInput } from '../../../generated/prisma/models'
import type { ICheckInsRespository } from '../types/check-ins-repository'

export class PrismaCheckInsRepository implements ICheckInsRespository {
	async create(data: CheckInUncheckedCreateInput) {
		const checkIn = await prisma.checkIn.create({
			data,
		})

		return checkIn
	}
}
