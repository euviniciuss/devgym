import { hash } from 'bcryptjs'
import type { IUsersRepository } from '@/repositories/types/users-repository'

interface IRegisterUseCase {
	name: string
	email: string
	password: string
}

export class RegisterUseCase {
	constructor(private usersRepository: IUsersRepository) {}

	async execute({ name, email, password }: IRegisterUseCase) {
		const password_hash = await hash(password, 6)

		const userWithSameEmail = await this.usersRepository.findByEmail(email)

		if (userWithSameEmail) {
			throw new Error('Email already in use.')
		}

		return this.usersRepository.create({
			name,
			email,
			password_hash,
		})
	}
}
