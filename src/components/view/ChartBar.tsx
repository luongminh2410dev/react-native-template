import Colors from '@app/assets/colors/Colors';
import { FontFamily } from '@app/constants';
import { moderateScale, scale } from '@app/utils/scale';
import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { BarChart, barDataItem } from "react-native-gifted-charts";
interface ChartBarProps {
    data: barDataItem[],
    style?: StyleProp<ViewStyle>
}
const ChartBar = (props: ChartBarProps) => {
    const { data, style = {} } = props;
    return (
        <View style={[styles.chartView, style]}>
            <View style={{ width: '100%', overflow: 'hidden' }}>
                <BarChart
                    width={scale(372)}
                    height={scale(305)}
                    barWidth={scale(26)}
                    barBorderTopLeftRadius={scale(10)}
                    barBorderTopRightRadius={scale(10)}
                    frontColor={Colors.primaryColor}
                    data={data}
                    yAxisThickness={0}
                    xAxisThickness={1}
                    disableScroll
                    yAxisTextStyle={{
                        fontSize: moderateScale(12),
                        fontFamily: FontFamily.Manrope400,
                        fontWeight: '400',
                        color: '#15141F80'
                    }}
                    xAxisLabelTextStyle={{
                        fontSize: moderateScale(12),
                        fontFamily: FontFamily.Manrope600,
                        fontWeight: '600',
                        color: '#15141F80'
                    }}
                    xAxisColor={'#CCCCCC80'}
                    initialSpacing={scale(16)}
                    spacing={scale(46)}
                    endSpacing={0}
                    maxValue={70}
                    noOfSections={7}
                />
            </View>
        </View>
    )
}

export default ChartBar

const styles = StyleSheet.create({
    chartView: {
        width: scale(398),
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: scale(14),
        paddingBottom: scale(18),
        marginTop: scale(32),
        backgroundColor: Colors.white,
        borderWidth: scale(1),
        borderColor: '#CCCCCC80',
        borderRadius: scale(10),
        paddingRight: scale(12),
    }
})