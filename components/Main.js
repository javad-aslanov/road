import React, { useState, useEffect } from "react";
import { View, StyleSheet, SafeAreaView, Text } from "react-native";
import firebase from "firebase";
import { FIREBASE_PATH_USERS } from "../constants/firebase";
const Main = () => {
  const [user, setUser] = useState();
  useEffect(() => {
    const unsub = firebase
      .firestore()
      .collection(FIREBASE_PATH_USERS)
      .doc(firebase.auth().currentUser.uid)
      .onSnapshot((snap) => {
        setUser({ ...snap.data() });
      });
    return unsub;
  }, []);
  return (
    <SafeAreaView style={{ backgroundColor: "#121B44", flex: 1 }}>
      {user ? (
        <View
          style={{
            flex: 1,
            justifyContent: "space-around",
          }}
        >
          {user.scores.map((x) => (
            <Text
              style={{
                fontFamily: "roboto_bold",
                color: "white",
                fontSize: 20,
              }}
            >
              {x.category + ": " + x.weight + " " + x.level}
            </Text>
          ))}
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default Main;
