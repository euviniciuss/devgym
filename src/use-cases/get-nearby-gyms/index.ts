import type { IGymsRepository } from '@/repositories/types/gyms-repository'
import type { IGetNearbyGymsRequest, IGetNearbyGymsResponse } from './types'

export class GetNearbyGymsUseCase {
	constructor(private gymsRepository: IGymsRepository) {}

	async execute({
		userLatitude,
		userLongitude,
	}: IGetNearbyGymsRequest): Promise<IGetNearbyGymsResponse> {
		const gyms = await this.gymsRepository.findManyNearby({
			latitude: userLatitude,
			longitude: userLongitude,
		})

		return { gyms }
	}
}
