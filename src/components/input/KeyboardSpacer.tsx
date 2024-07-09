import React, { useLayoutEffect, useState } from "react";
import {
    Keyboard,
    KeyboardEvent,
    View
} from "react-native";
const KeyboardSpacerView: React.FC<any> = () => {
    const [height, setHeight] = useState<number>(0);

    useLayoutEffect(() => {
        let keyboardListener1 = Keyboard.addListener('keyboardDidShow', keyboardWillShow);
        let keyboardListener2 = Keyboard.addListener('keyboardDidHide', keyboardWillHide);

        return () => {
            keyboardListener1.remove()
            keyboardListener2.remove()
        }
    }, [])

    const keyboardWillShow = (event: KeyboardEvent) => {
        setHeight(event.endCoordinates.height);
    }

    const keyboardWillHide = (event: KeyboardEvent) => {
        // setHeight(0);
    }

    return (
        <View style={{
            width: '100%',
            height: height
        }} />
    );
}

export default KeyboardSpacerView