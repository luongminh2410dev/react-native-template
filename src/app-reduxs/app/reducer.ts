import {
	INIT_BIOMETRIC_TYPE,
	REMOVE_TOKEN,
	SAVE_TOKEN,
	SET_LOADING_VISIBLE,
	UPDATE_BIOMETRIC_KEY_STATUS,
	UPDATE_CONNECTION_STATUS,
} from './actions'

const initState = {
	access_token: null,
	is_loading: false,
	is_connected: true,
	biometric: {
		biometric_type: null,
		biometric_key_exist: false,
	},
}
function appReducer(state = initState, action: any) {
	switch (action.type) {
		case SAVE_TOKEN:
			return {
				...state,
				access_token: action.data,
			}
		case REMOVE_TOKEN:
			return {
				...state,
				access_token: null,
			}
		case SET_LOADING_VISIBLE:
			return {
				...state,
				is_loading: action.data,
			}
		case UPDATE_CONNECTION_STATUS:
			return {
				...state,
				is_connected: action.data,
			}
		case INIT_BIOMETRIC_TYPE:
			return {
				...state,
				biometric: {
					...state.biometric,
					biometric_type: action.data,
				},
			}
		case UPDATE_BIOMETRIC_KEY_STATUS:
			return {
				...state,
				biometric: {
					...state.biometric,
					biometric_key_exist: action.data,
				},
			}
		default:
			return state
	}
}

export default appReducer
