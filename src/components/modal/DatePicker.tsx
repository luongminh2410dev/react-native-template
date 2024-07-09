import Colors from '@app/assets/colors/Colors'
import { FontFamily } from '@app/constants'
import { height, moderateScale, scale, width } from '@app/utils/scale'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import {
	StyleProp,
	StyleSheet,
	Text,
	TextInputProps,
	TouchableOpacity,
	View,
	ViewStyle
} from 'react-native'
import DatePicker from 'react-native-date-picker'
import Modal from "react-native-modal"

interface IProps extends TextInputProps {
	isVisible: boolean
	value: any
	style?: StyleProp<ViewStyle>
	mode?: 'time' | 'date' | 'datetime' | undefined
	maxDate?: any
	minDate?: any
	textPlaceholder?: string
	onClose?: any
	onConfirm?: any
}
const DEFAULT_MIN_DATE = moment('01/01/1900', 'DD/MM/YYYY').toDate();
const FormDatePicker = (props: IProps) => {
	const { isVisible, value, maxDate, minDate, onClose, onConfirm } = props
	const [date, setDate] = useState(new Date())

	useEffect(() => {
		if (value) {
			setDate(new Date(value))
		} else {
			setDate(new Date())
		}
	}, [value])

	return (
		<Modal
			statusBarTranslucent
			isVisible={isVisible}
			deviceHeight={height}
			deviceWidth={width}
			backdropColor={Colors.textHeaderOpacity60}
			animationIn='fadeIn'
			animationOut='fadeOut'
			animationInTiming={250}
			animationOutTiming={250}
			coverScreen
			hideModalContentWhileAnimating
			useNativeDriver
			useNativeDriverForBackdrop
			onBackdropPress={onClose}
			style={styles.viewContain}
		>
			<View style={styles.viewModal}>
				<DatePicker
					open
					theme='light'
					date={date}
					onDateChange={setDate}
					onCancel={onClose}
					mode={props.mode || 'date'}
					minimumDate={minDate || DEFAULT_MIN_DATE}
					maximumDate={maxDate}
					locale='vi'
					timeZoneOffsetInMinutes={-7 * 60} // set timezone to 0
				/>
				<View style={styles.vBtn}>
					<TouchableOpacity style={styles.btn} onPress={onClose}>
						<Text style={styles.textBtn}>Bỏ qua</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={[styles.btn, { borderLeftWidth: 1, borderLeftColor: '#CCCCCC' }]}
						onPress={() => {
							onClose()
							onConfirm(date)
						}}
					>
						<Text style={styles.textBtn}>Chọn</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	)
}
const styles = StyleSheet.create({
	textTitleInput: {
		fontSize: moderateScale(16),
		color: Colors.grayOpacity80,
		alignSelf: 'flex-start',
		fontWeight: '500',
		marginBottom: 10,
	},
	textError: {
		color: Colors.primaryRed,
	},
	vPicker: {
		height: scale(48),
		width: scale(514),
		paddingHorizontal: scale(10),
		borderWidth: 1,
		justifyContent: 'space-between',
		alignItems: 'center',
		flexDirection: 'row',
		borderColor: '#C6C6C6',
		marginTop: scale(10),
	},
	textPicker: {
		color: '#B2B1B1',
		fontSize: moderateScale(20),
		fontWeight: '400',
		maxWidth: scale(310),
	},
	viewModal: {
		backgroundColor: '#FFFFFF',
		width: scale(400),
		position: 'absolute',
		alignItems: 'center',
		borderRadius: 14,
	},
	viewContain: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	textBtn: {
		color: '#007AFF',
		fontSize: moderateScale(16),
		lineHeight: moderateScale(24),
		fontFamily: FontFamily.Manrope600,
	},
	vBtn: {
		height: scale(70),
		width: '100%',
		borderTopWidth: 1,
		borderTopColor: '#CCCCCC',
		flexDirection: 'row',
	},
	btn: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	text: {
		color: '#000000',
		fontSize: moderateScale(20),
		maxWidth: scale(310),
	},
})
export default FormDatePicker
