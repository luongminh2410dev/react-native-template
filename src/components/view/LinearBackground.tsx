import { scale } from '@app/utils/scale'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import RadialGradient from 'react-native-radial-gradient'
import { ViewProps } from 'react-native-svg/lib/typescript/fabric/utils'
interface Iprops extends ViewProps {}

const LinearBackground = (props: Iprops) => {
	return (
		<View style={[{ position: 'absolute', top: 0, right: 0, zIndex: -1 }, props.style]}>
			<RadialGradient
				style={{ width: scale(500), height: scale(600) }}
				colors={['#4293EB40', '#fafafa']}
				stops={[0, 0.35]}
				center={[scale(400), scale(150)]}
				radius={scale(700)}
			></RadialGradient>
		</View>
	)
}

export default LinearBackground

export const LinearBackgroundCalendar = () => {
	return (
		<View
			style={[
				{
					position: 'absolute',
					top: 0,
					right: 0,
					zIndex: -1,
					transform: [{ rotateY: '180deg' }],
				},
			]}
		>
			<RadialGradient
				style={{ width: scale(500), height: scale(600) }}
				colors={['#E7EFF9', '#fafafa']}
				stops={[0, 0.65]}
				center={[scale(400), scale(150)]}
				radius={scale(700)}
			></RadialGradient>
		</View>
	)
}
