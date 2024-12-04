import { StyleSheet, Text, View } from "react-native";
import React from "react";
import StyledButton from "../components/StyledButton";
import StyledText from "../components/StyledText";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";

const ProfileScreen = () => {
  return (
    <View className="flex-1 bg-white p-8 justify-between">
      {auth.currentUser ? (
        <View className="gap-4">
          <StyledText>{auth.currentUser.displayName}</StyledText>
          <StyledText>{auth.currentUser.email}</StyledText>
          <StyledText>{auth.currentUser.uid}</StyledText>
        </View>
      ) : null}
      <StyledButton
        onPress={async () => {
          try {
            await signOut(auth);
          } catch (error) {
            console.log(error);
          }
        }}>
        <StyledText className="text-white uppercase font-black text-center">
          Uitloggen
        </StyledText>
      </StyledButton>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
