import React, { useEffect, useState } from "react";
import Admin from "../Admin";
import { primary } from "../colors";
import {
  View,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import styles from "./styles";
import firebase from "firebase";
import { FIREBASE_PATH_USERS } from "../../constants/firebase";
const Index = () => {
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
  if (user) return <Admin user={user} />;
  else return <ActivityIndicator animating size="large" color={primary} />;
};

export default Index;
