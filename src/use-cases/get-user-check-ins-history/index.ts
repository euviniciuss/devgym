import type { ICheckInsRespository } from '@/repositories/types/check-ins-repository'
import type {
	IGetUserCheckInsHistoryRequest,
	IGetUserCheckInsHistoryResponse,
} from './types'

export class GetUserCheckInsHistoryUseCase {
	constructor(private checkInsRepository: ICheckInsRespository) {}

	async execute({
		userId,
	}: IGetUserCheckInsHistoryRequest): Promise<IGetUserCheckInsHistoryResponse> {
		const checkIns = await this.checkInsRepository.findManyUserByUserId(userId)

		return { checkIns }
	}
}
