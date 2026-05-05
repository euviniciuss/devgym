import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'
import { AuthenticateUseCase } from '.'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository()
		sut = new AuthenticateUseCase(usersRepository)
	})

	it('should be able to authenticate', async () => {
		const mockUser = {
			name: 'Jhon Doe',
			email: 'test@gmail.com',
			password_hash: await hash('123456', 6),
		}

		await usersRepository.create(mockUser)

		const { user } = await sut.execute({
			email: mockUser.email,
			password: '123456',
		})

		expect(user.id).toEqual(expect.any(String))
	})

	it('should not be able to authenticate with wrong email', async () => {
		const mockUser = {
			email: 'test@gmail.com',
			password: '123456',
		}

		await expect(() => sut.execute(mockUser)).rejects.toBeInstanceOf(
			InvalidCredentialsError,
		)
	})

	it('should not be able to authenticate with wrong password', async () => {
		const mockUser = {
			name: 'Jhon Doe',
			email: 'test@gmail.com',
			password_hash: await hash('123456', 6),
		}

		await usersRepository.create(mockUser)

		await expect(() =>
			sut.execute({ email: mockUser.email, password: '1242142' }),
		).rejects.toBeInstanceOf(InvalidCredentialsError)
	})
})
