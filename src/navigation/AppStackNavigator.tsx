import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CoursesScreen from "../screens/CoursesScreen";

const AppStack = createStackNavigator();

const AppStackNavigator = () => {
  return (
    <AppStack.Navigator
      screenOptions={{
        headerTitleStyle: { fontFamily: "Montserrat", color: "white" },
        headerStyle: { backgroundColor: "black" },
        headerTintColor: "white",
      }}>
      <AppStack.Screen
        name="courses"
        component={CoursesScreen}
        options={{
          title: "Vakken",
        }}
      />
    </AppStack.Navigator>
  );
};

export default AppStackNavigator;
