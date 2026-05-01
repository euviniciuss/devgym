import type { CheckIn } from '../../../generated/prisma/browser'

export interface ICheckInRequest {
	userId: string
	gymId: string
	userLatitude?: number
	userLongitude?: number
}

export interface ICheckInResponse {
	checkIn: CheckIn
}
