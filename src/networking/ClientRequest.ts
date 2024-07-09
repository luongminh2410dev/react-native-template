import AppActions from '@app/app-reduxs/app/actions'
import store from '@app/app-reduxs/store'
import { Storage, StorageKeys } from '@app/utils/storage'
import axios from 'axios'
import { Alert } from 'react-native'
import Config from 'react-native-config'
import { requestLog } from './apis/requestLog'

const timeout = 10000
let refreshTokenRequest: any = null
let dataRefresh: any = null
let isAuthAlertVisible = false

const excludeAuthUrls = ['login']

const callRefreshToken = async (refresh_token: string) => {
	if (!refresh_token) return null
	return axios.post(
		`${Config.BASE_URL}/refresh-jwt`,
		{ refresh_token },
		{
			headers: {
				'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
				'Access-Control-Allow-Headers':
					'append,delete,entries,foreach,get,has,keys,set,values,Authorization',
				'Content-Type': 'application/json',
			},
		},
	)
}

const instance = axios.create({
	baseURL: Config.BASE_URL,
	timeout,
})
instance.interceptors.request.use(
	async (config) => {
		if (__DEV__) {
			requestLog(config?.method!, config?.url!, config, 'req')
		}
		const access_token = Storage.getString(StorageKeys.accessToken)
		if (access_token && config.baseURL != 'https://cms.thienvanlichphap.vn') {
			// @ts-ignore
			config.headers['Authorization'] = `Bearer ${access_token}`
		}

		return config
	},
	(error) => {
		if (__DEV__) {
			requestLog(error?.method!, error?.url!, error!, 'err')
		}
		return Promise.reject(error)
	},
)
instance.interceptors.response.use(
	(response) => {
		if (__DEV__) {
			requestLog(response?.config?.method!, response?.config?.url!, response.data, 'res')
		}
		return response
	},
	async (error) => {
		if (__DEV__) {
			requestLog(error?.config?.method!, error?.config?.url!, error!, 'err')
		}
		const status = error?.response?.status || 500
		if (status == 401 && !excludeAuthUrls.includes(error.config.url)) {
			const refreshToken = Storage.getString(StorageKeys.refreshToken)
			refreshTokenRequest = refreshTokenRequest
				? refreshTokenRequest
				: callRefreshToken(refreshToken as string)
			if (dataRefresh == null) {
				try {
					dataRefresh = await refreshTokenRequest
					const data = dataRefresh?.data?.data
					Storage.set(StorageKeys.accessToken, data?.token)
					Storage.set(StorageKeys.refreshToken, data?.refresh_token)

					error.response.config.headers['Authorization'] = 'Bearer ' + data?.token
					return axios(error.response.config)
				} catch (err) {
					store.dispatch(AppActions.removeTokenAction())
					if (!isAuthAlertVisible) {
						isAuthAlertVisible = true
						Alert.alert(
							'Xác thực thất bại',
							'Phiên đăng nhập đã hết hạn, xin vui lòng đăng nhập lại',
						)
						const timeout = setTimeout(() => {
							isAuthAlertVisible = false
							clearTimeout(timeout)
						}, 1000)
					}
				} finally {
					refreshTokenRequest = null
					dataRefresh = null
				}
			}
		}
		return Promise.reject(error)
	},
)

export default instance
