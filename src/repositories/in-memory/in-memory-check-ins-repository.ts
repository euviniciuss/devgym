import { randomUUID } from 'node:crypto'
import type { CheckIn } from '../../../generated/prisma/browser'
import type { CheckInUncheckedCreateInput } from '../../../generated/prisma/models'
import type { ICheckInsRespository } from '../types/check-ins-repository'

export class InMemorCheckInsRepository implements ICheckInsRespository {
	public registers: CheckIn[] = []

	async create(data: CheckInUncheckedCreateInput) {
		const checkIn = {
			id: randomUUID(),
			user_id: data.user_id,
			gym_id: data.gym_id,
			created_at: new Date(),
			validated_at: data.validated_at ? new Date(data.validated_at) : null,
		} as CheckIn

		this.registers.push(checkIn)

		return checkIn
	}
}
