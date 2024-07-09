import * as React from "react";
import Svg, { Line, Path } from "react-native-svg";

interface IIcon {
    width: number,
    height: number,
    color?: string,
}
const IconClose = (props: IIcon) => {
    const { width, height, color = "#FFFFFF" } = props;
    return (
        <Svg width={width} height={height} viewBox="0 0 12 12" fill="none">
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.00007 4.90931L1.09087 0L0 1.09089L4.9092 6.0002L0.000473563 10.909L1.09134 11.9999L6.00007 7.09109L10.9087 11.9998L11.9995 10.9089L7.09094 6.0002L12 1.09102L10.9091 0.000133791L6.00007 4.90931Z" fill={color}
            />
        </Svg>
    )
}
export default IconClose;




