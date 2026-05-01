import type { ICheckInsRespository } from '@/repositories/types/check-ins-repository'
import type { IGymsRepository } from '@/repositories/types/gyms-repository'
import { getDistanceBetweenCoordinates } from '@/utils'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
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
			throw new Error()
		}

		const checkInOnSameDate = await this.checkInsRepository.findByUserIdOnDate(
			userId,
			new Date(),
		)

		if (checkInOnSameDate) {
			throw new Error()
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
