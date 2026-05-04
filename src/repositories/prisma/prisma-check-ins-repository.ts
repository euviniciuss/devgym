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

	async findByUserIdOnDate(userId: string, date: Date) {
		const startOfDay = new Date(date)
		startOfDay.setHours(0, 0, 0, 0)

		const endOfDay = new Date(date)
		endOfDay.setHours(23, 59, 59, 999)

		const checkIn = await prisma.checkIn.findFirst({
			where: {
				user_id: userId,
				created_at: {
					gte: startOfDay,
					lte: endOfDay,
				},
			},
		})

		return checkIn
	}
}
