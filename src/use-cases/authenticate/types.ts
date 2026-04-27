import type { User } from '../../../generated/prisma/browser'

export interface IAuthenticateRequest {
	email: string
	password: string
}

export interface IAuthenticateResponse {
	user: User
}
