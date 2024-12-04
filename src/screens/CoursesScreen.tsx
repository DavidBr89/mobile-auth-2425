import { StyleSheet, Text, View } from "react-native";
import React from "react";
import StyledText from "../components/StyledText";
import StyledButton from "../components/StyledButton";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";

const CoursesScreen = () => {
  return (
    <View className="flex-1 justify-center p-8">
      <StyledText>CoursesScreen</StyledText>
      <StyledButton
        onPress={async () => {
          await signOut(auth);
        }}>
        <StyledText className="text-white text-center font-black uppercase">
          Uitloggen
        </StyledText>
      </StyledButton>
    </View>
  );
};

export default CoursesScreen;
