import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import React, { useRef } from "react";
import TxtInput from "../components/TxtInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import StyledButton from "../components/StyledButton";
import HogentLogo from "../assets/logo.png";
import StyledText from "../components/StyledText";

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required().min(8),
});

const LoginScreen = () => {
  const passwordRef = useRef<TextInput>(null);

  const { handleChange, handleBlur, handleSubmit, errors, touched } = useFormik(
    {
      initialValues: {
        email: "",
        password: "",
      },
      onSubmit: (values) => {
        console.log(values);
      },
      validationSchema: validationSchema,
    }
  );

  return (
    <View className="gap-6 p-8 flex flex-col justify-center flex-1">
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
