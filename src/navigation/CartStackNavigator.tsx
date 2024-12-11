import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CartScreen from "../screens/CartScreen";
import { CartStackParamsList } from "../../hogent-app-env";

const CartStack = createStackNavigator<CartStackParamsList>();

const CartStackNavigator = () => {
  return (
    <CartStack.Navigator
      screenOptions={{
        headerTitleStyle: { fontFamily: "Montserrat", color: "white" },
        headerStyle: { backgroundColor: "black" },
        headerTintColor: "white",
      }}>
      <CartStack.Screen
        name="cart"
        options={{
          title: "Inschrijving",
        }}
        component={CartScreen}
      />
    </CartStack.Navigator>
  );
};

export default CartStackNavigator;
