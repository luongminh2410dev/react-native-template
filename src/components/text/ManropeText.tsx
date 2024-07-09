import { FontFamily } from "@app/constants";
import React from "react";
import { StyleSheet, Text, TextProps } from "react-native";

const ManropeText = (props: TextProps) => {
    const { children, style } = props;
    return (
        <Text {...props} style={[styles.text, style]}>
            {children}
        </Text>
    );
};

export default ManropeText;

const styles = StyleSheet.create({
    text: {
        fontFamily: FontFamily.Manrope400,
    },
});
