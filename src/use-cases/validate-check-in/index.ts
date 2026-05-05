import dayjs from 'dayjs'
import type { ICheckInsRespository } from '@/repositories/types/check-ins-repository'
import { LateCheckInValidationError, ResourceNotFoundError } from '../errors'
import type { IValidateCheckInRequest, IValidateCheckInResponse } from './types'

export class ValidateCheckInUseCase {
	constructor(private checkInsRepository: ICheckInsRespository) {}

	async execute({
		checkInId,
	}: IValidateCheckInRequest): Promise<IValidateCheckInResponse> {
		const checkIn = await this.checkInsRepository.findById(checkInId)

		if (!checkIn) {
			throw new ResourceNotFoundError()
		}

		const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
			checkIn.created_at,
			'minutes',
		)

		if (distanceInMinutesFromCheckInCreation > 20) {
			throw new LateCheckInValidationError()
		}

		checkIn.validated_at = new Date()

		await this.checkInsRepository.save(checkIn)

		return { checkIn }
	}
}
