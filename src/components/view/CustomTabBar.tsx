import Colors from '@app/assets/colors/Colors';
import { FontFamily } from '@app/constants';
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import React, { createRef } from 'react';
import { FlatList, Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { moderateScale, scale, verticalScale } from '../../utils/scale';

interface TabBarProps extends MaterialTopTabBarProps {
    buttonStyle?: StyleProp<ViewStyle>
}
const CustomTabBar = (props: TabBarProps) => {
    const { state, descriptors, navigation, buttonStyle } = props;
    const refFlatList = createRef<FlatList>()
    return (
        (
            <View style={styles.tabContainer}>
                <FlatList
                    ref={refFlatList}
                    data={state.routes}
                    horizontal
                    style={styles.tabBody}
                    contentContainerStyle={{ padding: scale(2) }}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(_, index) => `${index}`}
                    renderItem={({ item: route, index }: any) => {
                        const { options } = descriptors[route.key];
                        const isFocused = state.index === index;

                        const label =
                            options.tabBarLabel !== undefined
                                ? options.tabBarLabel
                                : route.name;

                        return (
                            <Pressable
                                key={index}
                                onPress={() => {
                                    navigation.navigate(route.name)
                                    refFlatList.current?.scrollToIndex({
                                        index,
                                        animated: true,
                                        viewPosition: 1
                                    })
                                }}
                                style={[styles.tabItem, isFocused && { backgroundColor: Colors.primaryColor }, buttonStyle]}
                            >
                                <Text
                                    style={[
                                        styles.tabItemLabel,
                                        { color: isFocused ? Colors.white : Colors.primaryColor },
                                    ]}
                                >
                                    {label}
                                </Text>
                            </Pressable>
                        );
                    }}
                />
            </View>
        )
    )
}

export default CustomTabBar

const styles = StyleSheet.create({
    tabContainer: {
        position: 'relative',
        paddingHorizontal: scale(16),
        paddingBottom: scale(16),
        zIndex: 1,
    },
    tabBody: {
        width: '100%',
        height: verticalScale(52),
        backgroundColor: Colors.white,
        borderRadius: scale(10)
    },
    tabItem: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: scale(12),
        borderRadius: scale(10),
    },
    tabItemLabel: {
        color: Colors.primaryColor,
        fontSize: moderateScale(16),
        lineHeight: moderateScale(24),
        fontFamily: FontFamily.Manrope500
    },
})