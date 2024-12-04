import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import React, { forwardRef } from "react";
import StyledText from "./StyledText";

interface TxtInputProps extends TextInputProps {
  error?: boolean;
  errorLabel?: string;
}

const TxtInput = forwardRef<TextInput, TxtInputProps>((props, ref) => {
  return (
    <View>
      <TextInput
        {...props}
        ref={ref}
        style={{ fontFamily: "Montserrat" }}
        className={`border px-4 py-4 rounded-md ${
          props.error ? "border-red-600" : "border-gray-400"
        }`}
      />
      {props.errorLabel && props.error ? (
        <StyledText className="text-red-600 text-sm mt-2">
          {props.errorLabel}
        </StyledText>
      ) : null}
    </View>
  );
});

export default TxtInput;

const styles = StyleSheet.create({});
