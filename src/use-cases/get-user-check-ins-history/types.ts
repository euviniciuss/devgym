import type { CheckIn } from '../../../generated/prisma/browser'

export type IGetUserCheckInsHistoryRequest = {
	userId: string
}

export interface IGetUserCheckInsHistoryResponse {
	checkIns: CheckIn[]
}
