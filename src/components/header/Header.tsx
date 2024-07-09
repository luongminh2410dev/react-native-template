import { moderateScale, scale, verticalScale } from "@app/utils/scale";
import { useNavigation } from "@react-navigation/core";
import React, { ReactElement } from "react";
import {
  StatusBar,
  StatusBarStyle,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Colors from "../../assets/colors/Colors";
import { goBack } from "@app/navigators/rootNavigation";
import { IC_BACK } from "@app/assets/icons";
import { FontFamily } from "@app/constants";

type HeaderProps = {
  title?: string;
  titleStyle?: TextStyle;
  statusBarStyle?: StatusBarStyle;
  backButtonEnable?: boolean;
  onLeftButtonPress?: () => void;
};
export default ({
  title,
  titleStyle = {},
  statusBarStyle,
  backButtonEnable = true,
  onLeftButtonPress,
}: HeaderProps) => {
  const insets = useSafeAreaInsets();
  return (
    <>
      <StatusBar
        translucent
        backgroundColor={"transparent"}
        barStyle={statusBarStyle || "dark-content"}
      />
      <View
        style={[
          styles.container,
          {
            marginTop: insets.top + scale(16),
          },
        ]}
      >
        {backButtonEnable && (
          <TouchableOpacity
            onPress={onLeftButtonPress ? onLeftButtonPress : goBack}
            style={styles.headerButton}
          >
            <View style={{ transform: [{ translateX: -2 }] }}>
              <IC_BACK />
            </View>
          </TouchableOpacity>
        )}
        <Text numberOfLines={1} style={[styles.titleStyle, titleStyle]}>
          {title}
        </Text>
        <View style={[styles.headerButton, { opacity: 0 }]} />
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.transparent,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: scale(16),
    paddingBottom: scale(10),
    zIndex: 1,
  },
  titleStyle: {
    flex: 1,
    textAlign: "center",
    fontSize: moderateScale(22),
    lineHeight: moderateScale(33),
    color: Colors.text,
    fontFamily: FontFamily.Manrope700,
  },
  headerButton: {
    width: scale(44),
    height: scale(44),
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white,
  },
});
