import type { IGymsRepository } from '@/repositories/types/gyms-repository'

import type { ICreateGymUseCase, ICreateGymUseCaseResponse } from './types'

export class CreateGymUseCase {
	constructor(private gymsRepository: IGymsRepository) {}

	async execute({
		title,
		description,
		phone,
		latitude,
		longitude,
	}: ICreateGymUseCase): Promise<ICreateGymUseCaseResponse> {
		const gym = await this.gymsRepository.create({
			title,
			description,
			phone,
			latitude,
			longitude,
		})

		return { gym }
	}
}
