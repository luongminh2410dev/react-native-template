import Colors from '@app/assets/colors/Colors';
import { CHART_COLORS, FontFamily } from '@app/constants';
import { moderateScale, scale } from '@app/utils/scale';
import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { LineChart, lineDataItem } from "react-native-gifted-charts";

interface ChartLineProps {
    data1?: lineDataItem[]
    data2?: lineDataItem[]
    data3?: lineDataItem[]
    data4?: lineDataItem[]
    data5?: lineDataItem[]
    lineColor?: string;
    style?: StyleProp<ViewStyle>
}
const ChartLine = (props: ChartLineProps) => {
    const { data1, data2, data3, data4, data5, lineColor = CHART_COLORS[0], style = {} } = props;
    return (
        <View style={[styles.container, style]}>
            {/* <View style={{ width: '100%', overflow: 'hidden' }}> */}
            <LineChart
                data={data1}
                data2={data2}
                data3={data3}
                data4={data4}
                data5={data5}
                thickness={scale(2)}
                showVerticalLines
                verticalLinesColor="#CCCCCC80"
                verticalLinesThickness={scale(1)}
                yAxisColor="#CCCCCC80"
                xAxisColor="#CCCCCC80"
                xAxisLabelTextStyle={{
                    fontSize: moderateScale(10),
                    color: Colors.grayText,
                    fontFamily: FontFamily.Manrope500,
                }}
                yAxisTextStyle={{
                    fontSize: moderateScale(10),
                    color: Colors.grayText,
                    fontFamily: FontFamily.Manrope500,
                }}
                curved
                stepValue={50}
                noOfSections={5}
                focusEnabled
                showStripOnFocus={false}
                dataPointsRadius={scale(3)}
                color1={lineColor}
                dataPointsColor1={lineColor}
                color2={CHART_COLORS[1]}
                dataPointsColor2={CHART_COLORS[1]}
                color3={CHART_COLORS[2]}
                dataPointsColor3={CHART_COLORS[2]}
                color4={CHART_COLORS[3]}
                dataPointsColor4={CHART_COLORS[3]}
                color5={CHART_COLORS[4]}
                dataPointsColor5={CHART_COLORS[4]}
                spacing={scale(34)}
            />
            {/* </View> */}
        </View>
    )
}

export default ChartLine

const styles = StyleSheet.create({
    container: {
        width: scale(398),
        alignSelf: 'center',
        backgroundColor: Colors.white,
        borderWidth: scale(1),
        borderColor: '#CCCCCC80',
        borderRadius: scale(10),
        paddingTop: scale(14),
        paddingBottom: scale(18),
        // paddingRight: scale(12),
        overflow: 'hidden'
    },
    chartView: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: scale(12),
        backgroundColor: Colors.white,
        borderWidth: scale(1),
        borderColor: '#CCCCCC80',
        borderRadius: scale(10),
        overflow: 'hidden'
    }
})