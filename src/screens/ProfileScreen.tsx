import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import StyledButton from "../components/StyledButton";
import StyledText from "../components/StyledText";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import AvatarImage from "../components/AvatarImage";

const DEFAULT_URL =
  "https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg";

const ProfileScreen = () => {
  return (
    <View className="flex-1 bg-white p-8 justify-between">
      {auth.currentUser ? (
        <View>
          <AvatarImage
            source={{
              uri: auth.currentUser.photoURL ?? DEFAULT_URL,
            }}
          />

          <View className="gap-4">
            <StyledText>{auth.currentUser.displayName}</StyledText>
            <StyledText>{auth.currentUser.email}</StyledText>
            <StyledText>{auth.currentUser.uid}</StyledText>
          </View>
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
