import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { InMemorCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { InMemorGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CheckInUseCase } from '.'

let checkInsRepository: InMemorCheckInsRepository
let gymsRepository: InMemorGymsRepository
let sut: CheckInUseCase

describe('Check-in Use Case', () => {
	beforeEach(async () => {
		checkInsRepository = new InMemorCheckInsRepository()
		gymsRepository = new InMemorGymsRepository()
		sut = new CheckInUseCase(checkInsRepository, gymsRepository)

		await gymsRepository.create({
			id: 'gym-01',
			title: 'JavaScript Gym',
			description: '',
			phone: '',
			latitude: -23.6821608,
			longitude: -46.5957695,
		})

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
