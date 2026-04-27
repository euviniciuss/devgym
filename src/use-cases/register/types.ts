import type { User } from '../../../generated/prisma/browser'

export interface IRegisterUseCase {
	name: string
	email: string
	password: string
}

export interface IRegisterUseCaseResponse {
	user: User
}
