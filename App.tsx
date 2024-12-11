import "./global.css";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import AuthStackNavigator from "./src/navigation/AuthStackNavigator";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./src/config/firebase";
import AppTabNavigator from "./src/navigation/AppTabNavigator";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const [loaded, error] = useFonts({
    Montserrat: require("./assets/fonts/Montserrat.ttf"),
  });

  useEffect(() => {
    // Gebruiker anoniem laten inloggen
    // (async () => {
    //   try {
    //      await signInAnonymously(auth);
    //   } catch (error) {
    //     console.log(error);

    //   }
    // })();

    setIsAuthLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // De user bestaat is dus ingelogd!
        setUser(user);
      } else {
        // Gebruiker niet ingelogd
        setUser(null);
      }
      setIsAuthLoading(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if ((loaded || error) && !isAuthLoading) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error, isAuthLoading]);

  if ((!loaded && !error) || isAuthLoading) {
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
