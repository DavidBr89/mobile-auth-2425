import "./global.css";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import LoginScreen from "./src/screens/LoginScreen";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import AuthStackNavigator from "./src/navigation/AuthStackNavigator";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./src/config/firebase";
import AppStackNavigator from "./src/navigation/AppStackNavigator";
import AppTabNavigator from "./src/navigation/AppTabNavigator";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  const [loaded, error] = useFonts({
    Montserrat: require("./assets/fonts/Montserrat.ttf"),
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // De user bestaat is dus ingelogd!
        console.log("Wel ingelogd!", user);
        setUser(user);
      } else {
        // Gebruiker niet ingelogd
        console.log("Niet ingelogd!");
        setUser(null);
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <NavigationContainer>
      {/* Conditioneel renderen */}
      {user !== null ? <AppTabNavigator /> : <AuthStackNavigator />}
      <StatusBar style="light" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});
