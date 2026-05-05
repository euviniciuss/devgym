import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymsUseCase } from '.'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Search Gyms Use Case', () => {
	beforeEach(() => {
		gymsRepository = new InMemoryGymsRepository()
		sut = new SearchGymsUseCase(gymsRepository)
	})

	it('should be able to get gym search', async () => {
		await gymsRepository.create({
			title: 'JavaScript Gym',
			description: '',
			phone: '',
			latitude: -23.6821608,
			longitude: -46.5957695,
		})

		await gymsRepository.create({
			title: 'Typescript Gym',
			description: '',
			phone: '',
			latitude: -23.6821608,
			longitude: -46.5957695,
		})

		const { gyms } = await sut.execute({ query: 'JavaScript', page: 1 })

		expect(gyms).toHaveLength(1)
		expect(gyms).toEqual([expect.objectContaining({ title: 'JavaScript Gym' })])
	})

	it('should be able to get paginated gyms search', async () => {
		for (let i = 1; i <= 22; i++) {
			await gymsRepository.create({
				title: `JavaScript Gym ${i}`,
				description: '',
				phone: '',
				latitude: -23.6821608,
				longitude: -46.5957695,
			})
		}

		const { gyms } = await sut.execute({ query: 'JavaScript Gym', page: 2 })

		expect(gyms).toHaveLength(2)
		expect(gyms).toEqual([
			expect.objectContaining({ title: 'JavaScript Gym 21' }),
			expect.objectContaining({ title: 'JavaScript Gym 22' }),
		])
	})
})
