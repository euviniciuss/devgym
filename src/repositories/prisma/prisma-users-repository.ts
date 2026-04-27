import { prisma } from '@/lib/prisma'
import type { UserCreateInput } from '../../../generated/prisma/models'
import type { IUsersRepository } from '../types/users-repository'

export class PrismaUsersRepository implements IUsersRepository {
	async findById(id: string) {
		const user = await prisma.user.findUnique({
			where: {
				id,
			},
		})

		return user
	}

	async findByEmail(email: string) {
		const user = await prisma.user.findUnique({
			where: {
				email,
			},
		})

		return user
	}

	async create(data: UserCreateInput) {
		const user = await prisma.user.create({
			data,
		})

		return user
	}
}
