import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import { AuthStackParamsList } from "../../hogent-app-env";

const AuthStack = createStackNavigator<AuthStackParamsList>();

const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="login" component={LoginScreen} />
      <AuthStack.Screen name="register" component={RegisterScreen} />
    </AuthStack.Navigator>
  );
};

export default AuthStackNavigator;
