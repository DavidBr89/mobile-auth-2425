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

import * as Yup from "yup";
import { useFormik } from "formik";
import {
  createUserWithEmailAndPassword,
  updateCurrentUser,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../config/firebase";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Naam is verplicht!"),
  email: Yup.string()
    .email("Geen geldig email adres!")
    .required("Email is verplicht!"),
  newPassword: Yup.string()
    .required("Wachtwoord is verplicht!")
    .min(8, "Wachtwoord moet minstens uit 8 tekens bestaan."),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Wachtwoorden komen niet overeen.")
    .required("Wachtwoord bevestiging is verplicht."),
});

const RegisterScreen = () => {
  const emailInputRef = useRef<TextInput>(null);
  const passwordFirstRef = useRef<TextInput>(null);
  const passwordSecondRef = useRef<TextInput>(null);

  const { handleChange, handleBlur, handleSubmit, touched, errors } = useFormik(
    {
      initialValues: {
        name: "",
        email: "",
        newPassword: "",
        confirmPassword: "",
      },
      onSubmit: async ({ name, email, newPassword }) => {
        try {
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            newPassword
          );

          await updateProfile(userCredential.user, { displayName: name });

          // Wachtwoord wijzigen van de gebruiker
          // await updatePassword(userCredential.user, newPassword)
        } catch (error) {
          console.log(error);
        }
      },
      validationSchema: validationSchema,
    }
  );

  return (
    <View className="gap-6 p-8 flex flex-col justify-center flex-1 bg-white">
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
          error={touched.name && errors.name != null}
          errorLabel={errors.name}
          placeholder="Naam"
          autoComplete="name"
          onSubmitEditing={() => {
            emailInputRef.current?.focus();
          }}
          returnKeyType="next"
          onChangeText={handleChange("name")}
          onBlur={handleBlur("name")}
        />
        <TxtInput
          error={touched.email && errors.email !== undefined}
          errorLabel={errors.email}
          placeholder="Email"
          autoCapitalize="none"
          autoComplete="email"
          ref={emailInputRef}
          onSubmitEditing={() => {
            passwordFirstRef.current?.focus();
          }}
          returnKeyType="next"
          keyboardType="email-address"
          onChangeText={handleChange("email")}
          onBlur={handleBlur("email")}
        />
        <TxtInput
          error={touched.newPassword && errors.newPassword !== undefined}
          errorLabel={errors.newPassword}
          ref={passwordFirstRef}
          placeholder="Nieuw wachtwoord"
          autoCapitalize="none"
          autoComplete="new-password"
          secureTextEntry
          onSubmitEditing={() => {
            passwordSecondRef.current?.focus();
          }}
          returnKeyType="next"
          onChangeText={handleChange("newPassword")}
          onBlur={handleBlur("newPassword")}
        />
        <TxtInput
          error={
            touched.confirmPassword && errors.confirmPassword !== undefined
          }
          errorLabel={errors.confirmPassword}
          ref={passwordSecondRef}
          placeholder="Herhaal wachtwoord"
          autoCapitalize="none"
          autoComplete="new-password"
          secureTextEntry
          onChangeText={handleChange("confirmPassword")}
          onBlur={handleBlur("confirmPassword")}
        />
      </KeyboardAvoidingView>
      <StyledButton onPress={() => handleSubmit()}>
        <StyledText className="text-white uppercase font-black text-center">
          Registreren
        </StyledText>
      </StyledButton>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
