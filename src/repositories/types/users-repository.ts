import type { User } from '../../../generated/prisma/browser'
import type { UserCreateInput } from '../../../generated/prisma/models'

export interface IUsersRepository {
	findById(id: string): Promise<User | null>
	findByEmail(email: string): Promise<User | null>
	create(data: UserCreateInput): Promise<User>
}
