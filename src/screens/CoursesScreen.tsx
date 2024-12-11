import { Alert, FlatList, View } from "react-native";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import StyledText from "../components/StyledText";
import StyledButton from "../components/StyledButton";
import { auth, db } from "../config/firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  Unsubscribe,
  where,
} from "firebase/firestore";

import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AppTabParamsList, AppTabScreenProps } from "../../hogent-app-env";

interface Docent {
  name: string;
}
interface Course {
  id: string;
  name: string;
  ects: number;
  description?: string;
  docents: Docent[];
}

// Registratie van het vak voor een gebruiker -> subcollection
const addCourseToUser = async (course: Course) => {
  try {
    if (auth.currentUser) {
      const userId = auth.currentUser.uid;

      const registrationCollectionRef = collection(
        db,
        "users",
        userId,
        "registrations"
      );
      const registrationDocRef = doc(registrationCollectionRef, course.id);
      // Controle of het document al bestaat
      const registrationSnapshot = await getDoc(registrationDocRef);

      if (registrationSnapshot.exists()) {
        Alert.alert("Fout", "Inschrijving bestaat al!");
        return;
      }

      // Nieuw document aan te maken - Meestal met unieke gegenereerde id
      // addDoc();

      // Een document gaan updaten als deze bestaat, of een nieuw document aanmaken als deze nog niet bestaat
      await setDoc(registrationDocRef, {
        name: course.name,
        createdAt: serverTimestamp(),
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// Registratie van een registrations collection (root collection)
const addRegistration = async (
  course: Course,
  setExists: Dispatch<SetStateAction<boolean>>
) => {
  try {
    if (auth.currentUser) {
      const userId = auth.currentUser.uid;

      const collectionRef = collection(db, "registrations");

      const registrationQuery = query(
        collectionRef,
        where("userId", "==", userId),
        where("courseId", "==", course.id)
      );

      const registrationQuerySnapshot = await getDocs(registrationQuery);

      if (!registrationQuerySnapshot.empty) {
        setExists(true);
        Alert.alert("Fout", "Inschrijving bestaat al!");
        return;
      }

      await addDoc(collectionRef, {
        userId: userId,
        courseId: course.id,
        name: course.name,
        createdAt: serverTimestamp(),
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const CoursesScreen = () => {
  const [registrationExists, setRegistrationExists] = useState(false);

  const navigation =
    useNavigation<AppTabScreenProps<"cartStack">["navigation"]>();

  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    // Dit is maar 1 keer de data opvragen vanuit de Firestore
    // const getCourses = async () => {
    //   try {
    //     const q = query(collection(db, "courses"));
    //     const qs = await getDocs(q);

    //     setCourses(
    //       qs.docs.map((ds) => ({ id: ds.id, ...ds.data() } as Course))
    //     );
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };

    // getCourses();

    let unsubscribe: Unsubscribe | undefined;

    const listenToCourses = async () => {
      try {
        const q = query(collection(db, "courses"));

        unsubscribe = onSnapshot(q, (qs) => {
          setCourses(
            qs.docs.map((ds) => ({ id: ds.id, ...ds.data() } as Course))
          );
        });
      } catch (error) {
        console.log(error);
      }
    };

    listenToCourses();

    return unsubscribe;
  }, []);

  return (
    <View className="flex-1 justify-center p-8 bg-white">
      <FlatList
        data={courses}
        renderItem={({ item }) => {
          return (
            <View className="py-4 flex flex-row items-center  justify-between">
              <View>
                <StyledText className="font-black text-2xl">
                  {item.name}
                </StyledText>
                <StyledText className="text-2xl font-bold">
                  {item.ects} SP
                </StyledText>
                <StyledText className="font-light text-sm">
                  {item.description}
                </StyledText>
              </View>

              <StyledButton
                onPress={async () => {
                  // addCourseToUser(item);
                  await addRegistration(item, setRegistrationExists);

                  if (!registrationExists) {
                    navigation.navigate("cartStack");
                  }
                }}>
                <Feather name="plus" color="white" size={18} />
              </StyledButton>
            </View>
          );
        }}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default CoursesScreen;
