/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import store from '@app/app-reduxs/store'
import AppContainer from '@app/navigators/AppContainer'
import React, { useEffect } from 'react'
import { StatusBar, StyleSheet } from 'react-native'
import Orientation from 'react-native-orientation-locker'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'

const App = () => {
	useEffect(() => {
		Orientation.lockToPortrait()
	}, [])

	return (
		<Provider store={store}>
			<StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
			<SafeAreaProvider>
				<SafeAreaView edges={[]} style={styles.container}>
					<AppContainer />
				</SafeAreaView>
			</SafeAreaProvider>
		</Provider>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFF',
	},
})
export default App
