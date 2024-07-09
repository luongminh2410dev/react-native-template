import instance from '../ClientRequest'

const UserApi = {
	login: async (phone: string, password: string) => {
		const res = await instance.post('login', { phone, password })
		return res?.data
	},
	signUp: async (data: FormData) => {
		const res = await instance.post('users/sign-up', data, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
		return res?.data
	},
	logout: async () => {
		const res = await instance.post('logout')
		return res?.data
	},
}
export default UserApi
