import type { Gym } from '../../../generated/prisma/browser'

export interface ISearchGymsUseCase {
	query: string
	page: number
}

export interface ISearchGymsUseCaseResponse {
	gyms: Gym[]
}
