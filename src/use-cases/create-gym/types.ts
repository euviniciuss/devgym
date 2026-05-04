import type { Gym } from '../../../generated/prisma/browser'

export interface ICreateGymUseCase {
	title: string
	description: string | null
	phone: string | null
	latitude: number
	longitude: number
}

export interface ICreateGymUseCaseResponse {
	gym: Gym
}
