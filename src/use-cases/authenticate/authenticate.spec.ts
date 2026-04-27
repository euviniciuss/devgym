import { hash } from 'bcryptjs'
import { describe, expect, it } from 'vitest'
import { InMemorUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'
import { AuthenticateUseCase } from '.'

describe('Authenticate Use Case', () => {
	it('should be able to authenticate', async () => {
		const usersRepository = new InMemorUsersRepository()
		const sut = new AuthenticateUseCase(usersRepository)

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
		const usersRepository = new InMemorUsersRepository()
		const sut = new AuthenticateUseCase(usersRepository)

		const mockUser = {
			email: 'test@gmail.com',
			password: '123456',
		}

		expect(() => sut.execute(mockUser)).rejects.toBeInstanceOf(
			InvalidCredentialsError,
		)
	})

	it('should not be able to authenticate with wrong password', async () => {
		const usersRepository = new InMemorUsersRepository()
		const sut = new AuthenticateUseCase(usersRepository)

		const mockUser = {
			name: 'Jhon Doe',
			email: 'test@gmail.com',
			password_hash: await hash('123456', 6),
		}

		await usersRepository.create(mockUser)

		expect(() =>
			sut.execute({ email: mockUser.email, password: '1242142' }),
		).rejects.toBeInstanceOf(InvalidCredentialsError)
	})
})
