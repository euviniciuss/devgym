import { compare } from 'bcryptjs'
import { describe, expect, it } from 'vitest'
import { InMemorUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { RegisterUseCase } from './register'

describe('Register Use Case', () => {
	it('should be able to register a new user', async () => {
		const usersRepository = new InMemorUsersRepository()
		const registerUseCase = new RegisterUseCase(usersRepository)

		const mockUser = {
			name: 'Jhon Doe',
			email: 'test@gmail.com',
			password: '123456',
		}

		const { user } = await registerUseCase.execute(mockUser)

		expect(user.id).toEqual(expect.any(String))
	})

	it('should hash user password upon registration', async () => {
		const usersRepository = new InMemorUsersRepository()
		const registerUseCase = new RegisterUseCase(usersRepository)

		const mockUser = {
			name: 'Jhon Doe',
			email: 'test@gmail.com',
			password: '123456',
		}

		const { user } = await registerUseCase.execute(mockUser)

		const isPasswordCorrectlyHashed = await compare(
			mockUser.password,
			user.password_hash,
		)

		expect(isPasswordCorrectlyHashed).toBe(true)
	})

	it('should not be able to register with same email twice', async () => {
		const usersRepository = new InMemorUsersRepository()
		const registerUseCase = new RegisterUseCase(usersRepository)

		const mockUser = {
			name: 'Jhon Doe',
			email: 'test@gmail.com',
			password: '123456',
		}

		await registerUseCase.execute(mockUser)

		expect(() => registerUseCase.execute(mockUser)).rejects.toBeInstanceOf(
			UserAlreadyExistsError,
		)
	})
})
