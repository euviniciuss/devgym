import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUseCase } from '.'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Create Gym Use Case', () => {
	beforeEach(() => {
		gymsRepository = new InMemoryGymsRepository()
		sut = new CreateGymUseCase(gymsRepository)
	})

	it('should be able to create a new gym', async () => {
		const mockGym = {
			title: 'Gym Name',
			description: 'Gym Description',
			phone: '123456789',
			latitude: 12.3456,
			longitude: 78.9012,
		}

		const { gym } = await sut.execute(mockGym)

		console.log({ gym })

		expect(gym.id).toEqual(expect.any(String))
	})
})
