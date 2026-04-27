import { randomUUID } from 'node:crypto'
import type { User } from '../../../generated/prisma/browser'
import type { UserCreateInput } from '../../../generated/prisma/models'
import type { IUsersRepository } from '../types/users-repository'

export class InMemorUsersRepository implements IUsersRepository {
	public registers: User[] = []

	async findById(id: string) {
		const user = this.registers.find((user) => user.id === id)

		if (!user) return null

		return user
	}

	async findByEmail(email: string) {
		const user = this.registers.find((user) => user.email === email)

		if (!user) return null

		return user
	}

	async create(data: UserCreateInput) {
		const user = {
			id: randomUUID(),
			name: data.name,
			email: data.email,
			password_hash: data.password_hash,
			created_at: new Date(),
		} as User

		this.registers.push(user)

		return user
	}
}
