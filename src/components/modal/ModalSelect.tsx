import Colors from '@app/assets/colors/Colors'
import { FontFamily } from '@app/constants'
import { height, moderateScale, scale, width } from '@app/utils/scale'
import React, { useEffect, useState } from 'react'
import { FlatList, Pressable, Text, View } from 'react-native'
import Modal from 'react-native-modal'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ManropeText } from '../text'

type ModalSelectProps = {
	visible: boolean
	onClose: () => void
	title?: string
	onPress?: any
	data: any
	selected: any
}

const ModalSelect = ({ visible, onClose, onPress, title, data, selected }: ModalSelectProps) => {
	const insets = useSafeAreaInsets()
	const [indexFocus, setIndexFocus] = useState<number>(0)

	const handleItem = (item: any) => {
		onPress(item)
		onCloseModal()
	}

	const onCloseModal = () => {
		onClose()
		setIndexFocus(0)
	}

	useEffect(() => {
		if (visible && data?.length > 8) {
			data?.map((item: any, index: number) => {
				if (item?.id == selected?.id) {
					setIndexFocus(index)
				}
			})
		}
	}, [visible])

	return (
		<Modal
			statusBarTranslucent
			isVisible={visible}
			deviceHeight={height}
			deviceWidth={width}
			backdropColor={Colors.textHeaderOpacity60}
			animationIn="slideInUp"
			animationOut="slideOutDown"
			coverScreen
			hideModalContentWhileAnimating
			propagateSwipe={true}
			swipeDirection="down"
			onSwipeComplete={onCloseModal}
			useNativeDriverForBackdrop
			onBackdropPress={onCloseModal}
			style={{
				flex: 1,
				justifyContent: 'flex-end',
				margin: 0,
			}}
		>
			<View
				style={[
					{
						backgroundColor: '#EDEDED',
						width: '100%',
						maxHeight: scale(420),
						position: 'absolute',
						paddingBottom: insets.bottom + 10,
						paddingTop: 10,
						borderTopLeftRadius: 20,
						borderTopRightRadius: 20,
						paddingHorizontal: scale(20),
					},
				]}
			>
				<View
					style={{
						width: scale(50),
						height: scale(5.5),
						borderRadius: 20,
						backgroundColor: Colors.gray30,
						alignSelf: 'center',
					}}
				/>
				<Text
					style={{
						fontSize: moderateScale(22),
						color: Colors.textHeader,
						fontFamily: FontFamily.Manrope500,
						marginTop: scale(20),
						marginBottom: scale(10),
					}}
				>
					{title}
				</Text>
				<FlatList
					style={{ flex: 1 }}
					data={data}
					keyExtractor={(_, index) => index.toString()}
					renderItem={({ item }) => {
						const isActive = item?.id == selected?.id
						return (
							<Pressable
								style={{
									height: scale(48),
									justifyContent: 'space-between',
									alignItems: 'center',
									flexDirection: 'row',
								}}
								onPress={() => handleItem(item)}
							>
								<View style={{ flexDirection: 'row' }}>
									<ManropeText
										style={{
											fontSize: moderateScale(20),
											color: isActive ? Colors.primaryColor : Colors.text,
										}}
									>
										{item.name}
									</ManropeText>
								</View>
								<View
									style={{
										width: scale(70),
										justifyContent: 'center',
										alignItems: 'center',
									}}
								>
									{/* {isActive && <IC_CHECK />} */}
								</View>
							</Pressable>
						)
					}}
					getItemLayout={(data, index) => ({
						length: scale(48), // Chiều cao của mỗi mục
						offset: scale(48) * index, // Vị trí bắt đầu của mục trong danh sách
						index,
					})}
					initialScrollIndex={indexFocus}
					initialNumToRender={indexFocus ? indexFocus + 8 : undefined}
				/>
			</View>
		</Modal>
	)
}

export default ModalSelect
