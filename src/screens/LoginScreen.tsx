import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef } from "react";
import TxtInput from "../components/TxtInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import StyledButton from "../components/StyledButton";
import HogentLogo from "../assets/logo.png";
import StyledText from "../components/StyledText";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { useNavigation } from "@react-navigation/native";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Geen geldig emailadres.")
    .required("Email is verplicht!"),
  password: Yup.string()
    .required("Wachtwoord is verplicht!")
    .min(8, "Wachtwoord moet minstens uit 8 tekens bestaan."),
});

const LoginScreen = () => {
  const passwordRef = useRef<TextInput>(null);
  const navigation = useNavigation();

  const { handleChange, handleBlur, handleSubmit, errors, touched } = useFormik(
    {
      initialValues: {
        email: "",
        password: "",
      },
      onSubmit: async ({ email, password }) => {
        try {
          const user = await signInWithEmailAndPassword(auth, email, password);
          // Navigeer nu naar CoursesScreen
          console.log(user);
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
        Inloggen
      </StyledText>
      <KeyboardAvoidingView
        className="gap-6"
        behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <TxtInput
          error={touched.email && errors.email !== undefined}
          errorLabel={errors.email}
          placeholder="Email"
          onSubmitEditing={() => {
            passwordRef.current?.focus();
          }}
          returnKeyType="next"
          autoCapitalize="none"
          autoComplete="email"
          onChangeText={handleChange("email")}
          onBlur={handleBlur("email")}
        />
        <TxtInput
          error={touched.password && errors.password !== undefined}
          errorLabel={errors.password}
          ref={passwordRef}
          placeholder="Wachtwoord"
          secureTextEntry
          autoCapitalize="none"
          autoComplete="current-password"
          onChangeText={handleChange("password")}
          onBlur={handleBlur("password")}
        />
      </KeyboardAvoidingView>
      <TouchableOpacity
        className="ml-auto"
        onPress={() => {
          navigation.navigate("register");
        }}>
        <StyledText className="font-thin">Nog geen account?</StyledText>
      </TouchableOpacity>
      <StyledButton onPress={() => handleSubmit()}>
        <StyledText className="text-white uppercase font-black text-center">
          Inloggen
        </StyledText>
      </StyledButton>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
