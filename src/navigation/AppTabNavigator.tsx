import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AppStackNavigator from "./AppStackNavigator";
import ProfileScreen from "../screens/ProfileScreen";

import { Feather } from "@expo/vector-icons";

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
        options={{
          headerShown: false,
          title: "Vakken",
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" color={color} size={size} />
          ),
        }}
      />
      <AppTab.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          title: "Profiel",
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" color={color} size={size} />
          ),
        }}
      />
    </AppTab.Navigator>
  );
};

export default AppTabNavigator;
