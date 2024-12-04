import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AppStackNavigator from "./AppStackNavigator";
import ProfileScreen from "../screens/ProfileScreen";

const AppTab = createBottomTabNavigator();

const AppTabNavigator = () => {
  return (
    <AppTab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: "black" },
        tabBarActiveTintColor: "white",
        tabBarLabelStyle: { fontFamily: "Montserrat", color: "white" },
        headerTitleStyle: { fontFamily: "Montserrat", color: "white" },
        headerStyle: { backgroundColor: "black" },
        headerTintColor: "white",
      }}>
      <AppTab.Screen
        name="home"
        component={AppStackNavigator}
        options={{ headerShown: false, title: "Vakken" }}
      />
      <AppTab.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          title: "Profiel",
        }}
      />
    </AppTab.Navigator>
  );
};

export default AppTabNavigator;
