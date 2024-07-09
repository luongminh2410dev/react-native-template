import React from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import Colors from '../../assets/colors/Colors'

const LoadingAbsolute = () => {
	return (
		<View style={styles.container}>
			<ActivityIndicator size="large" color={Colors.primaryColor} />
		</View>
	)
}

export default LoadingAbsolute
const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		backgroundColor: Colors.loadingLogin,
		alignItems: 'center',
		justifyContent: 'center',
	},
	indicatorDefault: {},
})
