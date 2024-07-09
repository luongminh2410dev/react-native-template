import React, { useEffect, useState } from 'react';
import { TextInput, TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {
  _onChangeText: (text: string) => void;
  trimSpacesOnBlur?: boolean;
  initValue?: string
};
const Input = (props: InputProps) => {
  const { _onChangeText, defaultValue = '', trimSpacesOnBlur = false, initValue = '' } = props;
  const [text, setText] = useState(defaultValue);

  useEffect(() => {
    if (initValue) {
      setText(initValue)
    }
  }, [initValue])

  return (
    <TextInput
      placeholderTextColor="#B9C0C3"
      {...props}
      value={text}
      onChangeText={(txt) => {
        setText(txt)
        _onChangeText(txt)
      }}
      onBlur={(e) => {
        if (trimSpacesOnBlur) {
          setText(text.trim());
          _onChangeText(text.trim());
        }
        props?.onBlur && props?.onBlur(e);
      }}
    />
  );
};

export default Input;
