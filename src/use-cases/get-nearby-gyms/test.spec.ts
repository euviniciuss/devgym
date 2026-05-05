import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { GetNearbyGymsUseCase } from '.'

let gymsRepository: InMemoryGymsRepository
let sut: GetNearbyGymsUseCase

describe('Get Nearby Gyms Use Case', () => {
	beforeEach(() => {
		gymsRepository = new InMemoryGymsRepository()
		sut = new GetNearbyGymsUseCase(gymsRepository)
	})

	it('should be able to get nearby gyms', async () => {
		await gymsRepository.create({
			title: 'Near Gym',
			description: '',
			phone: '',
			latitude: -23.6821608,
			longitude: -46.5957695,
		})

		await gymsRepository.create({
			title: 'Far Gym',
			description: '',
			phone: '',
			latitude: -3.5437486,
			longitude: -43.9156371,
		})

		const { gyms } = await sut.execute({
			userLatitude: -23.6821608,
			userLongitude: -46.5957695,
		})

		expect(gyms).toHaveLength(1)
		expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
	})
})
