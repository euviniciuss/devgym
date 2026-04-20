import type { User } from '../../../generated/prisma/browser'
import type { UserCreateInput } from '../../../generated/prisma/models'
import type { IUsersRepository } from '../types/users-repository'

export class InMemorUsersRepository implements IUsersRepository {
	public registers: User[] = []

	async findByEmail(email: string) {
		const user = this.registers.find((user) => user.email === email)

		if (!user) return null

		return user
	}

	async create(data: UserCreateInput) {
		const user = {
			id: 'mock-id-1',
			name: data.name,
			email: data.email,
			password_hash: data.password_hash,
			created_at: new Date(),
		} as User

		this.registers.push(user)

		return user
	}
}
