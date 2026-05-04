import type { ICheckInsRespository } from '@/repositories/types/check-ins-repository'
import type { IGymsRepository } from '@/repositories/types/gyms-repository'
import { getDistanceBetweenCoordinates } from '@/utils'
import {
	MaxDistanceError,
	MaxNumberOfCheckInsError,
	ResourceNotFoundError,
} from '../errors'

import { MAX_DISTANCE_IN_KILOMETERS } from './constants'
import type { ICheckInRequest, ICheckInResponse } from './types'

export class CheckInUseCase {
	constructor(
		private checkInsRepository: ICheckInsRespository,
		private gymsRepository: IGymsRepository,
	) {}

	async execute({
		userId,
		gymId,
		userLatitude,
		userLongitude,
	}: ICheckInRequest): Promise<ICheckInResponse> {
		const gym = await this.gymsRepository.findById(gymId)

		if (!gym) {
			throw new ResourceNotFoundError()
		}

		const distance = getDistanceBetweenCoordinates(
			{
				latitude: Number(gym.latitude),
				longitude: Number(gym.longitude),
			},
			{
				latitude: userLatitude,
				longitude: userLongitude,
			},
		)

		if (distance > MAX_DISTANCE_IN_KILOMETERS) {
			throw new MaxDistanceError()
		}

		const checkInOnSameDate = await this.checkInsRepository.findByUserIdOnDate(
			userId,
			new Date(),
		)

		if (checkInOnSameDate) {
			throw new MaxNumberOfCheckInsError()
		}

		const checkIn = await this.checkInsRepository.create({
			user_id: userId,
			gym_id: gymId,
		})

		return {
			checkIn,
		}
	}
}
