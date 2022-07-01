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
        setUser(snap.data());
      });
    return unsub;
  }, []);
  return (
    <SafeAreaView>
      {user ? (
        <View
          style={{
            backgroundColor: "white",
            flex: 1,
            justifyContent: "space-around",
          }}
        >
          {user.scores.map((x) => (
            <Text style={{ fontFamily: "roboto_bold" }}>
              {x.category + ": " + x.weight}
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
