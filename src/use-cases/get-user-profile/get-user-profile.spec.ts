import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'

import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { GetUserProfileUseCase } from '.'

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('Authenticate Use Case', () => {
	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository()
		sut = new GetUserProfileUseCase(usersRepository)
	})

	it('should be able to get user profile', async () => {
		const mockUser = {
			name: 'Jhon Doe',
			email: 'test@gmail.com',
			password_hash: await hash('123456', 6),
		}

		const createdUser = await usersRepository.create(mockUser)

		const { user } = await sut.execute({
			userId: createdUser.id,
		})

		expect(user.name).toEqual(mockUser.name)
	})

	it('should not be able to get user profile with wrong id', async () => {
		await expect(() =>
			sut.execute({ userId: 'not-existing-id' }),
		).rejects.toBeInstanceOf(ResourceNotFoundError)
	})
})
