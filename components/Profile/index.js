import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
} from "react-native";
import styles from "./styles";
import firebase from "firebase";
import { FIREBASE_PATH_USERS } from "../../constants/firebase";
import { Feather } from "expo-vector-icons";
import { primary, secondary } from "../colors";
import { StackActions, useNavigation } from "@react-navigation/native";
import { StreamChat } from "stream-chat";
import t from "../../i18n";
const client = StreamChat.getInstance("48v2teztftmy");

const Index = () => {
  const nav = useNavigation();
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

  function navToSettings() {
    nav.dispatch(StackActions.push("Settings"));
  }

  if (user) {
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          style={{
            position: "absolute",
            right: 30,
            top: 30,
          }}
          onPress={navToSettings}
        >
          <Feather name="settings" size={28} color={"darkgrey"} />
        </TouchableOpacity>
        <Image
          source={{
            uri:
              "https://avatars.dicebear.com/api/initials/" +
              user.username +
              ".png",
          }}
          style={{
            width: 70,
            height: 70,
            alignSelf: "center",
            borderRadius: 999999999,
          }}
        />

        <View style={styles.inputView}>
          <Text style={styles.inputLabel}>{t("username")}</Text>
          <View style={styles.input}>
            <Text style={{ color: "#A9A9A9" }}>{user.username}</Text>
          </View>
        </View>
        <View style={styles.inputView}>
          <Text style={styles.inputLabel}>Role</Text>
          <View style={styles.input}>
            <Text style={{ color: "#A9A9A9" }}>
              {user.isTeacher
                ? t("teacher")
                : user.isPsych
                ? t("psychologist")
                : t("student")}
            </Text>
          </View>
        </View>
        <View style={styles.inputView}>
          <Text style={styles.inputLabel}>{t("birthday")}</Text>
          <View style={styles.input}>
            <Text style={{ color: "#A9A9A9" }}>{user.dateOfBirth}</Text>
          </View>
        </View>
        <View style={styles.inputView}>
          <Text style={styles.inputLabel}>{t("password")}</Text>
          <TextInput style={styles.notDisabled} />
        </View>

        <TouchableOpacity
          onPress={async () => {
            await client.disconnectUser();
            await firebase.auth().signOut();
          }}
          style={styles.signOutBtn}
        >
          <Text style={styles.signOutText}>{t("signout")}</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  } else {
    return <></>;
  }
};

export default Index;
