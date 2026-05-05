import type { CheckIn } from '../../../generated/prisma/browser'

export interface IValidateCheckInRequest {
	checkInId: string
}

export interface IValidateCheckInResponse {
	checkIn: CheckIn
}
