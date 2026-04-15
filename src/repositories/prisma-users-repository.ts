import { prisma } from '@/lib/prisma'

import type { UserCreateInput } from '../../generated/prisma/models'

export class PrismaUsersRepository {
	async create(data: UserCreateInput) {
		const user = await prisma.user.create({
			data,
		})

		return user
	}
}
