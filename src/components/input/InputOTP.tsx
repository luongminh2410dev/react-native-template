import Colors from '@app/assets/colors/Colors';
import { FontFamily } from '@app/constants';
import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { OtpInput, OtpInputRef } from "react-native-otp-entry";
import { moderateScale, scale } from '../../utils/scale';
import { ManropeText } from '../text';

interface CustomOTPInputProps {
  errorMessage?: string;
  numberOfBox?: number
  onFilled?: (code: string) => void;
  onCodeChange?: (code: string) => void;
  style?: StyleProp<ViewStyle>;
  autoFocus?: boolean
  isSecure?: boolean
}

export type CustomOTPInputRef = {
  focus: () => void,
  clear: () => void
}

const CustomOTPInput = forwardRef<CustomOTPInputRef, CustomOTPInputProps>((props, ref) => {
  const {
    errorMessage,
    onFilled,
    onCodeChange,
    style = {},
    numberOfBox = 6,
    autoFocus = false,
    isSecure = false,
  } = props;
  const refOTPInput = useRef<OtpInputRef | null>()

  useImperativeHandle(ref, () => ({
    focus: () => {
      refOTPInput.current?.focus()
    },
    clear: () => {
      refOTPInput.current?.clear()
    }
  }))

  return (
    <>
      <View style={[styles.container, style]}>
        <OtpInput
          ref={ref => refOTPInput.current = ref}
          autoFocus={autoFocus}
          numberOfDigits={numberOfBox}
          focusColor="#4263EB"
          focusStickBlinkingDuration={800}
          onTextChange={(text) => onCodeChange?.(text)}
          onFilled={(text) => onFilled?.(text)}
          textInputProps={{
            accessibilityLabel: "One-Time Password",
            contextMenuHidden: true,
            caretHidden: true,
          }}
          secureTextEntry={isSecure}
          theme={{
            containerStyle: {
              width: '100%',
              height: scale(52)
            },
            pinCodeContainerStyle: styles.input,
            filledPinCodeContainerStyle: styles.input_highlight,
            focusedPinCodeContainerStyle: styles.input_highlight,
            pinCodeTextStyle: styles.input_text
          }}
        />
      </View>
      {
        !!errorMessage && (
          <ManropeText style={styles.textError}>{errorMessage}</ManropeText>
        )
      }
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: scale(8),
  },
  input: {
    width: scale(47.67),
    height: scale(52),
    padding: 0,
    margin: 0,
    borderWidth: scale(1),
    backgroundColor: Colors.white,
    borderColor: '#DDE4EE',
    textAlign: 'center',
    borderRadius: scale(8),
  },
  input_highlight: {
    borderColor: '#4263EB',
    shadowColor: '#4263EB47',
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: scale(1),
    },
    elevation: 2,
  },
  input_text: {
    color: Colors.text,
    fontFamily: FontFamily.Manrope600,
    fontSize: moderateScale(20),
    textAlign: 'center',
  },
  textError: {
    color: '#F80F63',
    fontSize: moderateScale(12),
    marginTop: scale(8),
    lineHeight: scale(16),
  },
});

export default CustomOTPInput;
