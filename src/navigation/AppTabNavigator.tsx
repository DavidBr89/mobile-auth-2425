import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AppStackNavigator from "./AppStackNavigator";
import ProfileScreen from "../screens/ProfileScreen";

import { Feather } from "@expo/vector-icons";
import CartStackNavigator from "./CartStackNavigator";
import { AppTabParamsList } from "../../hogent-app-env";
import { collection, onSnapshot, Unsubscribe } from "firebase/firestore";
import { db } from "../config/firebase";

const AppTab = createBottomTabNavigator<AppTabParamsList>();

const AppTabNavigator = () => {
  const [registrationsCount, setRegistrationsCount] = useState(0);

  useEffect(() => {
    let unsubscribe: Unsubscribe | undefined;
    (async () => {
      try {
        const collectionRef = collection(db, "registrations");

        unsubscribe = onSnapshot(collectionRef, (qs) => {
          setRegistrationsCount(qs.size);
        });
      } catch (error) {
        console.log(error);
      }
    })();

    return unsubscribe;
  }, []);

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
        name="cartStack"
        component={CartStackNavigator}
        options={{
          headerShown: false,
          title: "Inschrijvingen",
          tabBarIcon: ({ color, size }) => (
            <Feather name="shopping-cart" color={color} size={size} />
          ),
          tabBarBadge: registrationsCount > 0 ? registrationsCount : undefined,
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
