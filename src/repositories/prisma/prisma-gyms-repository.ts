import { prisma } from '@/lib/prisma'
import type { GymUncheckedCreateInput } from '../../../generated/prisma/models'
import type {
	IFindManyNearbyParams,
	IGymsRepository,
} from '../types/gyms-repository'

export class PrismaGymsRepository implements IGymsRepository {
	async findById(id: string) {
		const gym = await prisma.gym.findUnique({
			where: {
				id,
			},
		})

		return gym
	}

	async findManyNearby({ latitude, longitude }: IFindManyNearbyParams) {
		const gyms = await prisma.gym.findMany()

		return gyms.filter((gym) => {
			const distance = 6371 * Math.acos(
				Math.cos((latitude * Math.PI) / 180) *
					Math.cos((Number(gym.latitude) * Math.PI) / 180) *
					Math.cos(
						(Number(gym.longitude) * Math.PI) / 180 -
							(longitude * Math.PI) / 180,
					) +
					Math.sin((latitude * Math.PI) / 180) *
						Math.sin((Number(gym.latitude) * Math.PI) / 180),
			)

			return distance <= 10
		})
	}

	async searchMany(query: string, page: number) {
		const gyms = await prisma.gym.findMany({
			where: {
				title: {
					contains: query,
				},
			},
			take: 20,
			skip: (page - 1) * 20,
		})

		return gyms
	}

	async create(data: GymUncheckedCreateInput) {
		const gym = await prisma.gym.create({
			data,
		})

		return gym
	}
}
