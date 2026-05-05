import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { LateCheckInValidationError, ResourceNotFoundError } from '../errors'
import { ValidateCheckInUseCase } from '.'

let checkInsRepository: InMemoryCheckInsRepository
let sut: ValidateCheckInUseCase

describe('Validate Check-in Use Case', () => {
	beforeEach(async () => {
		checkInsRepository = new InMemoryCheckInsRepository()
		sut = new ValidateCheckInUseCase(checkInsRepository)

		vi.useFakeTimers()
	})

	afterEach(() => {
		vi.useRealTimers()
	})

	it('should be able to validate to check-in', async () => {
		const createdCheckIn = await checkInsRepository.create({
			gym_id: 'gym-01',
			user_id: 'user-01',
		})

		await sut.execute({ checkInId: createdCheckIn.id })

		expect(createdCheckIn.validated_at).toEqual(expect.any(Date))
		expect(checkInsRepository.registers[0].validated_at).toEqual(
			expect.any(Date),
		)
	})

	it('should not be able to validate an inexistent check-in', async () => {
		await expect(() =>
			sut.execute({ checkInId: 'inexistent-check-in-id' }),
		).rejects.toBeInstanceOf(ResourceNotFoundError)
	})

	it('should not be able to validate the check-in after 20 minutes of its creation', async () => {
		vi.setSystemTime(new Date(2023, 0, 1, 13, 40))

		const createdCheckIn = await checkInsRepository.create({
			gym_id: 'gym-01',
			user_id: 'user-01',
		})

		const TWENTY_ONE_MINUTES_IN_MS = 1000 * 60 * 21

		vi.advanceTimersByTime(TWENTY_ONE_MINUTES_IN_MS)

		await expect(() =>
			sut.execute({ checkInId: createdCheckIn.id }),
		).rejects.toBeInstanceOf(LateCheckInValidationError)
	})
})
