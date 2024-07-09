import Colors from "@app/assets/colors/Colors";
import { FontFamily } from "@app/constants";
import { moderateScale, scale } from "@app/utils/scale";
import React from "react";
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";

interface ButtonProps extends TouchableOpacityProps {
  style?: ViewStyle | Array<ViewStyle>;
  onPress?: () => void;
  title?: string;
  textStyle?: TextStyle | Array<TextStyle>;
  disabled?: boolean;
}
const PrimaryButton = ({
  title,
  disabled = false,
  textStyle,
  onPress,
  style,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      {...{ onPress }}
      style={[
        disabled ? styles.defaultButtonDisabled : styles.defaultButton,
        style,
      ]}
    >
      <Text
        style={[
          styles.defaultText,
          textStyle
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  defaultButton: {
    width: "100%",
    height: scale(48),
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primaryColor,
    borderRadius: scale(10),
  },
  defaultButtonDisabled: {
    width: "100%",
    height: scale(48),
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4263EB4D",
    borderRadius: scale(10),
  },
  defaultText: {
    color: "#EDF0FF",
    fontFamily: FontFamily.Manrope500,
    fontSize: moderateScale(16),
    lineHeight: moderateScale(24),
  },
});
export default PrimaryButton;
