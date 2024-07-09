import { MMKV } from 'react-native-mmkv'

export const StorageKeys = {
	accessToken: 'access_token',
	refreshToken: 'refresh_token',
	activeBiometricPhone: 'active_biometric_phone',
}

export const Storage = new MMKV()
