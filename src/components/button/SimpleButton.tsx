import Colors from "@app/assets/colors/Colors";
import { FontFamily } from "@app/constants";
import { scale } from "@app/utils/scale";
import React, { ReactElement } from "react";
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";

interface ButtonProps extends TouchableOpacityProps {
  children?: ReactElement | any;
  style?: ViewStyle | Array<ViewStyle>;
  onPress?: () => void;
  title?: string;
  textStyle?: TextStyle | Array<TextStyle>;
  disabled?: boolean;
}
const SimpleButton = ({
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
      style={[styles.defaultButton, style]}
    >
      <Text style={[styles.defaultText, textStyle]}>{title}</Text>
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
    backgroundColor: "#EDEDED",
    borderRadius: scale(10),
  },
  defaultText: {
    color: "#000000",
    fontSize: 15,
    fontFamily: FontFamily.Manrope500,
  },
});
export default SimpleButton;
