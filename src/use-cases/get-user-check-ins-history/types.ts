import type { CheckIn } from '../../../generated/prisma/browser'

export type IGetUserCheckInsHistoryRequest = {
	userId: string
	page?: number
}

export interface IGetUserCheckInsHistoryResponse {
	checkIns: CheckIn[]
}
