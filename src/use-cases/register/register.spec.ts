import { compare } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { InMemorUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from '../errors/user-already-exists-error'
import { RegisterUseCase } from '.'

let usersRepository: InMemorUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
	beforeEach(() => {
		usersRepository = new InMemorUsersRepository()
		sut = new RegisterUseCase(usersRepository)
	})

	it('should be able to register a new user', async () => {
		const mockUser = {
			name: 'Jhon Doe',
			email: 'test@gmail.com',
			password: '123456',
		}

		const { user } = await sut.execute(mockUser)

		expect(user.id).toEqual(expect.any(String))
	})

	it('should hash user password upon registration', async () => {
		const mockUser = {
			name: 'Jhon Doe',
			email: 'test@gmail.com',
			password: '123456',
		}

		const { user } = await sut.execute(mockUser)

		const isPasswordCorrectlyHashed = await compare(
			mockUser.password,
			user.password_hash,
		)

		expect(isPasswordCorrectlyHashed).toBe(true)
	})

	it('should not be able to register with same email twice', async () => {
		const mockUser = {
			name: 'Jhon Doe',
			email: 'test@gmail.com',
			password: '123456',
		}

		await sut.execute(mockUser)

		await expect(() => sut.execute(mockUser)).rejects.toBeInstanceOf(
			UserAlreadyExistsError,
		)
	})
})
