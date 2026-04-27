import type { CheckIn } from '../../../generated/prisma/browser'

export interface ICheckInRequest {
	userId: string
	gymId: string
}

export interface ICheckInResponse {
	checkIn: CheckIn
}
