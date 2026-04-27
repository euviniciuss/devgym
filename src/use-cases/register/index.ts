import { hash } from 'bcryptjs'
import type { IUsersRepository } from '@/repositories/types/users-repository'
import { UserAlreadyExistsError } from '../errors/user-already-exists-error'
import type { IRegisterUseCase, IRegisterUseCaseResponse } from './types'

export class RegisterUseCase {
	constructor(private usersRepository: IUsersRepository) {}

	async execute({
		name,
		email,
		password,
	}: IRegisterUseCase): Promise<IRegisterUseCaseResponse> {
		const password_hash = await hash(password, 6)

		const userWithSameEmail = await this.usersRepository.findByEmail(email)

		if (userWithSameEmail) {
			throw new UserAlreadyExistsError()
		}

		const user = await this.usersRepository.create({
			name,
			email,
			password_hash,
		})

		return { user }
	}
}
