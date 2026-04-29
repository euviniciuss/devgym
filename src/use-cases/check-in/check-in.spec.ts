import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { InMemorCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from '.'

let checkInsRepository: InMemorCheckInsRepository
let sut: CheckInUseCase

describe('Check-in Use Case', () => {
	beforeEach(() => {
		checkInsRepository = new InMemorCheckInsRepository()
		sut = new CheckInUseCase(checkInsRepository)

		vi.useFakeTimers()
	})

	afterEach(() => {
		vi.useRealTimers()
	})

	it('should be able to check in', async () => {
		const mockCheckIn = {
			gymId: 'gym-01',
			userId: 'user-01',
		}

		const { checkIn } = await sut.execute(mockCheckIn)

		expect(checkIn.id).toEqual(expect.any(String))
	})

	it('should not be able to check in twice in the same day', async () => {
		vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0)) // 20 de janeiro de 2022 às 08:00:00

		const mockCheckIn = {
			gymId: 'gym-01',
			userId: 'user-01',
		}

		await sut.execute(mockCheckIn)

		await expect(sut.execute(mockCheckIn)).rejects.toBeInstanceOf(Error)
	})

	it('should be able to check in twice but in different days', async () => {
		vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0)) // 20 de janeiro de 2022 às 08:00:00

		const mockCheckIn = {
			gymId: 'gym-01',
			userId: 'user-01',
		}

		await sut.execute(mockCheckIn)

		vi.setSystemTime(new Date(2022, 0, 25, 8, 0, 0)) // 21 de janeiro de 2022 às 08:00:00

		const { checkIn } = await sut.execute(mockCheckIn)

		expect(checkIn.id).toEqual(expect.any(String))
	})
})
