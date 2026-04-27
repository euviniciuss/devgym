import { compare } from 'bcryptjs'
import type { IUsersRepository } from '@/repositories/types/users-repository'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'
import type { IAuthenticateRequest, IAuthenticateResponse } from './types'

export class AuthenticateUseCase {
	constructor(private userRepository: IUsersRepository) {}

	async execute({
		email,
		password,
	}: IAuthenticateRequest): Promise<IAuthenticateResponse> {
		const user = await this.userRepository.findByEmail(email)

		if (!user) {
			throw new InvalidCredentialsError()
		}

		const doesPasswordMatches = await compare(password, user.password_hash)

		if (!doesPasswordMatches) {
			throw new InvalidCredentialsError()
		}

		return {
			user,
		}
	}
}
