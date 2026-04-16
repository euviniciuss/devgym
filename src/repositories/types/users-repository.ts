import type { User } from '../../../generated/prisma/browser'
import type { UserCreateInput } from '../../../generated/prisma/models'

export interface IUsersRepository {
	findByEmail(email: string): Promise<User | null>
	create(data: UserCreateInput): Promise<User>
}
