import { INIT_USER_PROFILE, UPDATE_USER_PROFILE, DELETE_USER_PROFILE } from './actions'

export interface TProfile {
	customer_onepay_id: number | string | null
	name: string | null
	phone: string
	user_id: number
	sex: 1 | 2
	image_url: string | null
	thumbnail_url: string | null
	withdrawal_reason: string | null
	date_of_birth: string | null
	created_at: string
	last_login: string
	updated_at: string
}
const initState: TProfile | null = null
function profileReducer(state = initState, action: any) {
	switch (action.type) {
		case INIT_USER_PROFILE:
			return action.data as TProfile
		case UPDATE_USER_PROFILE:
			return {
				...state,
				...action.data,
			} as TProfile
		case DELETE_USER_PROFILE:
			return null
		default:
			return state
	}
}

export default profileReducer
