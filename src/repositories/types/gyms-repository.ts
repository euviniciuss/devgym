import type { Gym } from '../../../generated/prisma/browser'
import type { GymUncheckedCreateInput } from '../../../generated/prisma/models'

export interface IGymsRepository {
	findById(id: string): Promise<Gym | null>
	create(data: GymUncheckedCreateInput): Promise<Gym>
}
