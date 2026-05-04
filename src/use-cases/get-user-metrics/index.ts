import type { ICheckInsRespository } from '@/repositories/types/check-ins-repository'
import type { IGetUserMetricsRequest, IGetUserMetricsResponse } from './types'

export class GetUserMetricsUseCase {
	constructor(private checkInsRepository: ICheckInsRespository) {}

	async execute({
		userId,
	}: IGetUserMetricsRequest): Promise<IGetUserMetricsResponse> {
		const checkInsCount = await this.checkInsRepository.countByUserId(userId)

		return { checkInsCount }
	}
}
