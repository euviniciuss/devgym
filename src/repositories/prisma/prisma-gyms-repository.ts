import { prisma } from '@/lib/prisma'
import type { GymUncheckedCreateInput } from '../../../generated/prisma/models'
import type { IGymsRepository } from '../types/gyms-repository'

export class PrismaGymsRepository implements IGymsRepository {
	async findById(id: string) {
		const gym = await prisma.gym.findUnique({
			where: {
				id,
			},
		})

		return gym
	}

	async create(data: GymUncheckedCreateInput) {
		const gym = await prisma.gym.create({
			data,
		})

		return gym
	}
}
