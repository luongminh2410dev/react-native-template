import Colors from '@app/assets/colors/Colors'
import { FontFamily } from '@app/constants'
import { height, hitSlop, isAndroid, moderateScale, scale, width } from '@app/utils/scale'
import React, { ReactNode } from 'react'
import {
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
	ViewStyle
} from 'react-native'
import Modal from 'react-native-modal'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ManropeText } from '../text'

interface SlideUpModalProps {
	isVisible?: boolean
	onClose: () => void
	containerStyles?: ViewStyle
	title?: ReactNode
	children?: ReactNode
	propagateSwipe?: boolean
}

const SlideUpModal = (props: SlideUpModalProps) => {
	const insets = useSafeAreaInsets()
	const { isVisible, containerStyles = {}, onClose, children = null, title, propagateSwipe = false } = props

	return (
		<Modal
			isVisible={isVisible}
			backdropOpacity={0.5}
			coverScreen={!isAndroid}
			style={styles.modal}
			deviceHeight={height}
			deviceWidth={width}
			onBackdropPress={onClose}
			useNativeDriverForBackdrop
			statusBarTranslucent
			swipeDirection='down'
			animationOut='slideOutDown'
			propagateSwipe={propagateSwipe}
			onSwipeComplete={onClose}
		>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<KeyboardAvoidingView
					behavior='padding'
					keyboardVerticalOffset={-scale(32)}
					enabled={!isAndroid}
				>
					<View
						style={[
							styles.container,
							{ paddingBottom: Platform.OS == 'ios' ? insets.bottom : scale(20) },
							containerStyles,
						]}
					>
						<TouchableOpacity
							hitSlop={hitSlop}
							style={{
								position: 'absolute',
								right: scale(30),
								top: scale(30),
								zIndex: 10,
							}}
							onPress={onClose}
						>
							{/* <IconX color="#181818" /> */}
						</TouchableOpacity>
						<View style={styles.handle_bar} />

						<ManropeText style={styles.title}>{title}</ManropeText>
						{children}
						{/* {
							isAndroid && <KeyboardSpacer />
						} */}
					</View>
				</KeyboardAvoidingView>
			</TouchableWithoutFeedback>
		</Modal>
	)
}

export default SlideUpModal

const styles = StyleSheet.create({
	modal: {
		flex: 1,
		justifyContent: 'flex-end',
		margin: 0,
	},
	container: {
		width: '100%',
		minHeight: scale(310),
		borderTopLeftRadius: scale(40),
		borderTopRightRadius: scale(40),
		paddingHorizontal: scale(20),
		backgroundColor: Colors.white,
		overflow: 'hidden',
	},
	handle_bar: {
		width: scale(70),
		height: scale(5),
		borderRadius: scale(20),
		marginTop: scale(8),
		marginBottom: scale(10),
		backgroundColor: Colors.gray,
		alignSelf: 'center',
	},
	title: {
		fontFamily: FontFamily.Manrope600,
		fontSize: moderateScale(28),
		lineHeight: moderateScale(42),
		textAlign: 'center',
	},
})
