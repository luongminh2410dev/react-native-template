import makeActionCreator from '@app/app-reduxs/actionMaker'
export const INIT_USER_PROFILE = 'INIT_USER_PROFILE'
export const UPDATE_USER_PROFILE = 'UPDATE_USER_PROFILE'
export const DELETE_USER_PROFILE = 'DELETE_USER_PROFILE'

export const initProfileAction = makeActionCreator(INIT_USER_PROFILE, 'data')
export const updateProfileAction = makeActionCreator(UPDATE_USER_PROFILE, 'data')
export const deleteProfileAction = makeActionCreator(DELETE_USER_PROFILE)
const ProfileActions = {
	initProfileAction,
	updateProfileAction,
	deleteProfileAction,
}
export default ProfileActions
