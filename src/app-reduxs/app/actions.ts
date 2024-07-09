import makeActionCreator from '@app/app-reduxs/actionMaker'
export const SAVE_TOKEN = 'SAVE_TOKEN'
export const REMOVE_TOKEN = 'REMOVE_TOKEN'
export const UPDATE_CONNECTION_STATUS = 'UPDATE_CONNECTION_STATUS'
export const SET_LOADING_VISIBLE = 'SET_LOADING_VISIBLE'
export const INIT_BIOMETRIC_TYPE = 'INIT_BIOMETRIC_TYPE'
export const UPDATE_BIOMETRIC_KEY_STATUS = 'UPDATE_BIOMETRIC_KEY_STATUS'

export const saveTokenAction = makeActionCreator(SAVE_TOKEN, 'data')

export const removeTokenAction = makeActionCreator(REMOVE_TOKEN)

export const setLoadingVisibleAction = makeActionCreator(SET_LOADING_VISIBLE, 'data')

export const updateConnectionStatus = makeActionCreator(UPDATE_CONNECTION_STATUS, 'data')

export const initBiometricTypeAction = makeActionCreator(INIT_BIOMETRIC_TYPE, 'data')

export const updateBiometricKeyStatusAction = makeActionCreator(UPDATE_BIOMETRIC_KEY_STATUS, 'data')

const AppActions = {
	saveTokenAction,
	removeTokenAction,
	updateConnectionStatus,
	updateBiometricKeyStatusAction,
}
export default AppActions
