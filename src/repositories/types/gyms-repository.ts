import type { Gym } from '../../../generated/prisma/browser'
import type { GymUncheckedCreateInput } from '../../../generated/prisma/models'

export interface IFindManyNearbyParams {
	latitude: number
	longitude: number
}

export interface IGymsRepository {
	findById(id: string): Promise<Gym | null>
	findManyNearby(params: IFindManyNearbyParams): Promise<Gym[]>
	searchMany(query: string, page: number): Promise<Gym[]>
	create(data: GymUncheckedCreateInput): Promise<Gym>
}
