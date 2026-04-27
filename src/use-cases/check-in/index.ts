import type { ICheckInsRespository } from '@/repositories/types/check-ins-repository'
import type { ICheckInRequest, ICheckInResponse } from './types'

export class CheckInUseCase {
	constructor(private checkInsRepository: ICheckInsRespository) {}

	async execute({ userId, gymId }: ICheckInRequest): Promise<ICheckInResponse> {
		const checkIn = await this.checkInsRepository.create({
			user_id: userId,
			gym_id: gymId,
		})

		return {
			checkIn,
		}
	}
}
