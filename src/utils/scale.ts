import { Dimensions, Platform } from 'react-native'
import { isTablet as _isTablet } from 'react-native-device-info'
const { width, height } = Dimensions.get('window')
const [shortDimension, longDimension] = width < height ? [width, height] : [height, width]
const isTabletDevices = () => {
	if (Platform.OS === 'android' && longDimension / shortDimension <= 1.6) {
		return true
	}
	return _isTablet()
}
const isTablet = isTabletDevices()
const isAndroid = Platform.OS === 'android'
//Guideline sizes are based on standard ~5" screen mobile device and 7,9" screen tablet & ipad
const guidelineBaseWidth = isTablet ? 768 : 430
const guidelineBaseHeight = isTablet ? 1024 : 933

const scale = (size: number) => (shortDimension / guidelineBaseWidth) * size
const verticalScale = (size: number) => (longDimension / guidelineBaseHeight) * size
const moderateScale = (size: number, factor = 0.5) => size + (scale(size) - size) * factor
const ratioW = (size: number) => (shortDimension * size) / 100

const fontCheck = (font: number) => {
	return isTablet ? moderateScale(font * 1.2) : scale(font)
}
const fontCheck1 = (font: number) => {
	return isTablet ? moderateScale(font * 1.2) : scale(font * 1.2)
}

const hitSlop = {
	top: scale(10),
	right: scale(10),
	bottom: scale(10),
	left: scale(10),
}

export {
	scale,
	verticalScale,
	moderateScale,
	ratioW,
	width,
	height,
	isTabletDevices,
	isTablet,
	isAndroid,
	fontCheck,
	fontCheck1,
	hitSlop,
}
