import { randomUUID } from 'node:crypto'
import type { Gym } from '../../../generated/prisma/browser'
import type { GymUncheckedCreateInput } from '../../../generated/prisma/models'

import type { IGymsRepository } from '../types/gyms-repository'

export class InMemoryGymsRepository implements IGymsRepository {
	public registers: Gym[] = []

	async findById(id: string) {
		const gym = this.registers.find((gym) => gym.id === id)

		if (!gym) return null

		return gym
	}

	async searchMany(query: string, page: number) {
		return this.registers
			.filter((gym) => gym.title.toLowerCase().includes(query.toLowerCase()))
			.slice((page - 1) * 20, page * 20)
	}

	async create(data: GymUncheckedCreateInput) {
		const gym = {
			id: data.id ?? randomUUID(),
			title: data.title,
			description: data.description,
			phone: data.phone,
			latitude: data.latitude,
			longitude: data.longitude,
		} as Gym

		this.registers.push(gym)

		return gym
	}
}
