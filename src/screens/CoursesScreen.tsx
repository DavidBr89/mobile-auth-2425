import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import StyledText from "../components/StyledText";
import StyledButton from "../components/StyledButton";
import { signOut } from "firebase/auth";
import { auth, db } from "../config/firebase";
import {
  collection,
  DocumentData,
  getDocs,
  onSnapshot,
  query,
  Unsubscribe,
} from "firebase/firestore";

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

const CoursesScreen = () => {
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
      <StyledText>CoursesScreen</StyledText>
      <FlatList
        data={courses}
        renderItem={({ item }) => {
          return (
            <View className="py-4 flex flex-row items-center justify-between">
              <View>
                <StyledText className="font-bold text-2xl">
                  {item.name}
                </StyledText>
                <StyledText className="font-light text-sm">
                  {item.description}
                </StyledText>
              </View>
              <StyledText className="text-3xl font-black">
                {item.ects} SP
              </StyledText>
            </View>
          );
        }}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default CoursesScreen;
