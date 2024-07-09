import Colors from "@app/assets/colors/Colors";
import { FontFamily } from "@app/constants";
import { moderateScale, scale } from "@app/utils/scale";
import React from "react";
import {
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ManropeText } from "../text";

type ModalImagePickerProps = {
  visible: boolean;
  onClose: () => void;
  title?: string;
  onLibraryPress: () => void;
  onCameraPress: () => void;
};

const ModalImagePicker = ({
  visible,
  onClose,
  onLibraryPress,
  onCameraPress,
  title,
}: ModalImagePickerProps) => {
  const insets = useSafeAreaInsets();
  return (
    <Modal
      statusBarTranslucent
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <Pressable
          onPress={onClose}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
          }}
        ></Pressable>
        <View
          style={{
            borderTopLeftRadius: scale(30),
            borderTopRightRadius: scale(30),
            width: "100%",
            backgroundColor: Colors.white,
            paddingBottom: insets.bottom,
            paddingHorizontal: scale(20),
          }}
        >
          <Text
            style={{
              alignSelf: "center",
              marginTop: scale(20),
              fontSize: moderateScale(18),
              color: "#282828",
              fontFamily: FontFamily.Manrope700,
            }}
          >
            {title || "Vui lòng tải lên một hình ảnh"}
          </Text>
          <View
            style={{
              height: scale(1),
              backgroundColor: Colors.gray2,
              opacity: 0.45,
              width: "100%",
              marginVertical: scale(20),
            }}
          />
          <TouchableOpacity onPress={onCameraPress}>
            <ManropeText
              style={{ color: "#282828", fontSize: moderateScale(16) }}
            >
              Sử dụng camera
            </ManropeText>
          </TouchableOpacity>
          <View
            style={{
              height: scale(1),
              backgroundColor: Colors.gray2,
              width: "100%",
              marginVertical: scale(20),
              opacity: 0.45,
            }}
          />
          <TouchableOpacity onPress={onLibraryPress} style={{}}>
            <ManropeText
              style={{
                color: "#282828",
                paddingBottom: scale(20),
                fontSize: moderateScale(16),
              }}
            >
              Lấy ảnh từ thiết bị
            </ManropeText>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
export default ModalImagePicker;
