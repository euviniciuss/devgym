import { randomUUID } from 'node:crypto'
import dayjs from 'dayjs'
import type { CheckIn } from '../../../generated/prisma/browser'
import type { CheckInUncheckedCreateInput } from '../../../generated/prisma/models'
import type { ICheckInsRespository } from '../types/check-ins-repository'

export class InMemoryCheckInsRepository implements ICheckInsRespository {
	public registers: CheckIn[] = []

	async findById(id: string) {
		const checkIn = this.registers.find((checkIn) => checkIn.id === id)

		if (!checkIn) return null

		return checkIn
	}

	async findByUserIdOnDate(userId: string, date: Date) {
		const startOfTheDay = dayjs(date).startOf('date')
		const endOfTheDay = dayjs(date).endOf('date')

		const checkInOnSameDate = this.registers.find((checkIn) => {
			const checkInDate = dayjs(checkIn.created_at)

			const isOnSameDate =
				checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay)

			return checkIn.user_id === userId && isOnSameDate
		})

		if (!checkInOnSameDate) return null

		return checkInOnSameDate
	}

	async findManyUserByUserId(userId: string, page: number) {
		return this.registers
			.filter((checkIn) => checkIn.user_id === userId)
			.slice((page - 1) * 20, page * 20)
	}

	async countByUserId(userId: string) {
		return this.registers.filter((checkIn) => checkIn.user_id === userId).length
	}

	async save(checkIn: CheckIn) {
		const checkInIndex = this.registers.findIndex(
			(item) => item.id === checkIn.id,
		)

		if (checkInIndex >= 0) {
			this.registers[checkInIndex] = checkIn
		}

		return checkIn
	}

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
