import {
	HomeScreen,
} from '@app/screens'
import { Storage, StorageKeys } from '@app/utils/storage'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import Routes from './Routes'

const MainStack = createNativeStackNavigator()

const MainNavigator = () => {
	const accessToken = Storage.getString(StorageKeys.accessToken)

	return (
		<>
			<MainStack.Navigator
				screenOptions={{
					headerShown: false,
				}}
				initialRouteName={accessToken ? Routes.HOME_SCREEN : Routes.LOGIN_SCREEN}
			>
				<MainStack.Screen name={Routes.LOGIN_SCREEN} component={HomeScreen} />
				<MainStack.Screen name={Routes.HOME_SCREEN} component={HomeScreen} />
				<MainStack.Screen
					name={Routes.WEB_VIEW_SCREEN}
					component={HomeScreen}
					options={{ animation: 'fade_from_bottom' }}
				/>
			</MainStack.Navigator>
		</>
	)
}

export default MainNavigator
