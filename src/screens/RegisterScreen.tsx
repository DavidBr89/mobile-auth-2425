import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useRef } from "react";
import StyledText from "../components/StyledText";
import TxtInput from "../components/TxtInput";
import StyledButton from "../components/StyledButton";
import HogentLogo from "../assets/logo.png";

const RegisterScreen = () => {
  const emailInputRef = useRef<TextInput>(null);
  const passwordFirstRef = useRef<TextInput>(null);
  const passwordSecondRef = useRef<TextInput>(null);

  return (
    <View className="gap-6 p-8 flex flex-col justify-center flex-1">
      <Image
        source={HogentLogo}
        className="mx-auto"
        style={{ width: 200, height: 200 }}
        resizeMode="contain"
      />
      <StyledText className="font-black uppercase text-3xl text-center">
        Registreren
      </StyledText>
      <KeyboardAvoidingView
        className="gap-6"
        behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <TxtInput
          placeholder="Naam"
          autoComplete="name"
          onSubmitEditing={() => {
            emailInputRef.current?.focus();
          }}
          returnKeyType="next"
        />
        <TxtInput
          placeholder="Email"
          autoCapitalize="none"
          autoComplete="email"
          ref={emailInputRef}
          onSubmitEditing={() => {
            passwordFirstRef.current?.focus();
          }}
          returnKeyType="next"
          keyboardType="email-address"
        />
        <TxtInput
          ref={passwordFirstRef}
          placeholder="Nieuw wachtwoord"
          autoCapitalize="none"
          autoComplete="new-password"
          secureTextEntry
          onSubmitEditing={() => {
            passwordSecondRef.current?.focus();
          }}
          returnKeyType="next"
        />
        <TxtInput
          ref={passwordSecondRef}
          placeholder="Herhaal wachtwoord"
          autoCapitalize="none"
          autoComplete="new-password"
          secureTextEntry
        />
      </KeyboardAvoidingView>
      <StyledButton>
        <StyledText className="text-white uppercase font-black text-center">
          Registreren
        </StyledText>
      </StyledButton>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
