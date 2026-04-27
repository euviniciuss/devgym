import type { IUsersRepository } from '@/repositories/types/users-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import type { IGetUserProfileRequest, IGetUserProfileResponse } from './types'

export class GetUserProfileUseCase {
	constructor(private userRepository: IUsersRepository) {}

	async execute({
		userId,
	}: IGetUserProfileRequest): Promise<IGetUserProfileResponse> {
		const user = await this.userRepository.findById(userId)

		if (!user) {
			throw new ResourceNotFoundError()
		}

		return { user }
	}
}
