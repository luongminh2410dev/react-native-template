import { setLoadingVisibleAction } from '@app/app-reduxs/app/actions'
import { images } from '@app/assets/images'
import { navigate } from '@app/navigators/rootNavigation'
import Routes from '@app/navigators/Routes'
import { scale } from '@app/utils/scale'
import React, { useEffect } from 'react'
import {
	StatusBar,
	Text,
	TouchableOpacity,
	View
} from 'react-native'
import FastImage from 'react-native-fast-image'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useDispatch } from 'react-redux'
import styles from './styles'
import { FontFamily } from '@app/constants'

const HomeScreen = () => {
	const dispatch = useDispatch()
	const insets = useSafeAreaInsets()

	useEffect(() => {
		dispatch(setLoadingVisibleAction(true))
		setTimeout(() => {
			dispatch(setLoadingVisibleAction(false))
		}, 2000);
	}, [])

	return (
		<View style={styles.container}>
			<StatusBar translucent backgroundColor={'transparent'} barStyle={'dark-content'} />
			<View style={{ flex: 1 }}>
				<View
					style={{
						marginTop: scale(insets?.top + scale(24)),
						flexDirection: 'row',
						alignItems: 'center',
						columnGap: scale(16),
						paddingHorizontal: scale(16),
					}}
				>
					<Text style={{ fontFamily: FontFamily.Manrope700 }}>
						Hello world
					</Text>
				</View>
			</View>
		</View>
	)
}

export default HomeScreen
