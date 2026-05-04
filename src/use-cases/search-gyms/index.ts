import type { IGymsRepository } from '@/repositories/types/gyms-repository'

import type { ISearchGymsUseCase, ISearchGymsUseCaseResponse } from './types'

export class SearchGymsUseCase {
	constructor(private gymsRepository: IGymsRepository) {}

	async execute({
		query,
		page = 1,
	}: ISearchGymsUseCase): Promise<ISearchGymsUseCaseResponse> {
		const gyms = await this.gymsRepository.searchMany(query, page)

		return { gyms }
	}
}
