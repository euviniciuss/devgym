import type { Gym } from '../../../generated/prisma/browser'

export type IGetNearbyGymsRequest = {
	userLatitude: number
	userLongitude: number
}

export interface IGetNearbyGymsResponse {
	gyms: Gym[]
}
