import React, { ReactElement } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  View,
  ViewStyle
} from "react-native";
import Colors from "../../assets/colors/Colors";

type LoadingProps = {
  children?: ReactElement | any;
  style?: ViewStyle | Array<ViewStyle>;
  color?: string;
  indicatorStyle?: ViewStyle | Array<ViewStyle>;
  size?: "small" | "large";
};
const LoadingView = ({
  children,
  style,
  color = Colors.secondaryColor,
  indicatorStyle,
  size = "small",
}: LoadingProps) => {
  return (
    <>
      <View style={[styles.container, style]}>
        <ActivityIndicator
          size={size}
          color={color}
          style={[styles.indicatorDefault, indicatorStyle]}
        />
      </View>
    </>
  );
};

export default LoadingView;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white,
  },
  indicatorDefault: {},
});
