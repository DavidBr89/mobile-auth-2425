import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import StyledText from "../components/StyledText";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
  Unsubscribe,
  where,
} from "firebase/firestore";
import { auth, db } from "../config/firebase";

interface Registration {
  id: string;
  name: string;
  createdAt: Timestamp;
}

const CartScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [registrations, setRegistrations] = useState<Registration[]>([]);

  useEffect(() => {
    setIsLoading(true);
    let unsubscribe: Unsubscribe | undefined;

    if (auth.currentUser) {
      const userId = auth.currentUser.uid;

      // Querien op subcollection
      // (async () => {
      //   try {
      //     const registrationCollectionRef = collection(
      //       db,
      //       "users",
      //       userId,
      //       "registrations"
      //     );

      //     unsubscribe = onSnapshot(registrationCollectionRef, (snapshot) => {
      //       setRegistrations(
      //         snapshot.docs.map(
      //           (ds) => ({ id: ds.id, ...ds.data() } as Registration)
      //         )
      //       );
      //     });
      //   } catch (error) {
      //     console.log(error);
      //   } finally {
      //     setIsLoading(false);
      //   }
      // })();

      // Querien op root collection

      (async () => {
        try {
          const collectionRef = collection(db, "registrations");
          const registrationQuery = query(
            collectionRef,
            where("userId", "==", userId),
            orderBy("name", "desc")
          );

          unsubscribe = onSnapshot(registrationQuery, (qs) => {
            setRegistrations(
              qs.docs.map((ds) => ({ id: ds.id, ...ds.data() } as Registration))
            );
          });
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      })();
    }

    return unsubscribe;
  }, [auth.currentUser?.uid]);

  if (isLoading) {
    return (
      <View className="flex-1 bg-white justify-center items-center">
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white p-8">
      <View className="flex-1 justify-between">
        <StyledText className="font-black uppercase text-xl">
          Inschrijvingen
        </StyledText>

        <FlatList
          className="my-4"
          data={registrations}
          renderItem={({ item }) => {
            return (
              <View className="py-4 flex flex-row items-center  justify-between">
                <StyledText className="font-black text-2xl">
                  {item.name}
                </StyledText>
              </View>
            );
          }}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={() => (
            <StyledText className="uppercase text-center font-semibold">
              Geen inschrijvingen gevonden.
            </StyledText>
          )}
        />
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
