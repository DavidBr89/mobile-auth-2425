import { StyleSheet, Text, TextProps, View } from "react-native";
import React from "react";

interface StyledTextProps extends TextProps {}

const StyledText = (props: StyledTextProps) => {
  return (
    <Text {...props} style={{ fontFamily: "Montserrat" }}>
      {props.children}
    </Text>
  );
};

export default StyledText;
