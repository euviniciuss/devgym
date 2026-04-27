import type { User } from '../../../generated/prisma/browser'

export type IGetUserProfileRequest = {
	userId: string
}

export interface IGetUserProfileResponse {
	user: User
}
