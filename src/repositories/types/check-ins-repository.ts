import type { CheckIn } from '../../../generated/prisma/browser'
import type { CheckInUncheckedCreateInput } from '../../../generated/prisma/models'

export interface ICheckInsRespository {
	findById(id: string): Promise<CheckIn | null>
	findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
	findManyUserByUserId(userId: string, page: number): Promise<CheckIn[]>
	countByUserId(userId: string): Promise<number>
	create(data: CheckInUncheckedCreateInput): Promise<CheckIn>
	save(checkIn: CheckIn): Promise<CheckIn>
}
