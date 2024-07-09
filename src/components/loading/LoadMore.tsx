import Colors from "@app/assets/colors/Colors";
import { isEqual } from "lodash";
import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

interface IProps {
  visible: boolean;
  defaultHeight?: number;
}

const LoadMoreComponent = (props: IProps) => {
  const { visible, defaultHeight } = props;
  return visible ? (
    <View style={styles.container}>
      <ActivityIndicator color={Colors.primaryColor} size={"small"} />
    </View>
  ) : (
    <View style={{ height: defaultHeight ? defaultHeight : 30 }} />
  );
};

export const LoadMore = React.memo(LoadMoreComponent, (prevProps, nextProps) =>
  isEqual(prevProps, nextProps),
);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    height: 30,
  },
});
