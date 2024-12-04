import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import React, { forwardRef } from "react";

interface TxtInputProps extends TextInputProps {}

const TxtInput = forwardRef<TextInput, TxtInputProps>((props, ref) => {
  return (
    <TextInput
      {...props}
      ref={ref}
      style={{ fontFamily: "Montserrat" }}
      className="border border-gray-400 px-4 py-4 rounded-md"
    />
  );
});

export default TxtInput;

const styles = StyleSheet.create({});
