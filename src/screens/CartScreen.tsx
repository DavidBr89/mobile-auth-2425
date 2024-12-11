import { FlatList, StyleSheet, View } from "react-native";
import React from "react";
import StyledText from "../components/StyledText";
import StyledButton from "../components/StyledButton";

const CartScreen = () => {
  return (
    <View className="flex-1 bg-white p-8">
      <View className="flex-1 justify-between">
        <StyledText className="font-black uppercase text-xl">
          Inschrijvingen
        </StyledText>
        <FlatList className="bg-red-300 my-4" data={[]} renderItem={null} />
        <StyledButton>
          <StyledText className="text-white uppercase font-black text-center">
            Bevestig
          </StyledText>
        </StyledButton>
      </View>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
