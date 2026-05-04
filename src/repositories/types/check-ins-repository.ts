import type { CheckIn } from '../../../generated/prisma/browser'
import type { CheckInUncheckedCreateInput } from '../../../generated/prisma/models'

export interface ICheckInsRespository {
	findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
	findManyUserByUserId(user: string): Promise<CheckIn[]>
	create(data: CheckInUncheckedCreateInput): Promise<CheckIn>
}
