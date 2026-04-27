import { beforeEach, describe, expect, it } from 'vitest'
import { InMemorCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'

import { CheckInUseCase } from '.'

let checkInsRepository: InMemorCheckInsRepository
let sut: CheckInUseCase

describe('Check-in Use Case', () => {
	beforeEach(() => {
		checkInsRepository = new InMemorCheckInsRepository()
		sut = new CheckInUseCase(checkInsRepository)
	})

	it('should be able to authenticate', async () => {
		const mockCheckIn = {
			gymId: 'gym-01',
			userId: 'user-01',
		}

		const { checkIn } = await sut.execute(mockCheckIn)

		expect(checkIn.id).toEqual(expect.any(String))
	})
})
