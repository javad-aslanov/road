import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  useColorScheme,
} from "react-native";
import DatePicker from "react-native-modern-datepicker";

import stylez from "./SignIn/styles";
import stylesdark from "./SignIn/stylesdark";
import firebase from "firebase";
import { StackActions, useNavigation } from "@react-navigation/native";
import Svg, { G, Path } from "react-native-svg";
import { primary } from "../colors";
import { FIREBASE_PATH_USERS } from "../../constants/firebase";
import t from "../../i18n";

const SignUp = () => {
  const scheme = useColorScheme();

  let styles = stylez;
  if (scheme === "dark") styles = stylesdark;
  function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const nav = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [date, setDate] = useState("");
  const [code, setCode] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const signUpUser = async () => {
    if (username.length <= 3) {
      Alert.alert(t("usernamemust"));
    } else if (password !== passwordRepeat) {
      Alert.alert(t("passeqpassrep"));
    } else if (password.length < 8) {
      Alert.alert(t("passchar"));
    } else if (!(code.length > 0)) {
      Alert.alert(t("enterpsych"));
    } else {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(username + "@gmail.com", password);

      await firebase
        .firestore()
        .collection(FIREBASE_PATH_USERS)
        .doc(firebase.auth().currentUser.uid)
        .set({
          uid: firebase.auth().currentUser.uid,
          username: username,
          dateOfBirth: date,
          teacherCode: code,
          completedTests: [],
          isTeacher: false,
          isPsych: false,
        });
    }
  };
  const navToSignIn = () => {
    nav.dispatch(StackActions.replace("Sign In"));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{}}>
        <View style={{ flex: 1, padding: 10, justifyContent: "space-evenly" }}>
          <Text style={[styles.title, styles.text]}>{t("signup")}</Text>

          <View>
            <View style={styles.textInputContainer}>
              <Text style={[styles.textInputLabel, styles.text]}>
                {t("username")}
              </Text>
              <TextInput onChangeText={setUsername} style={styles.textInput} />
            </View>
            <View style={styles.textInputContainer}>
              <Text style={[styles.textInputLabel, styles.text]}>
                {t("psychcode")}
              </Text>
              <TextInput onChangeText={setCode} style={styles.textInput} />
            </View>
            <View style={styles.textInputContainer}>
              <Text style={[styles.textInputLabel, styles.text]}>
                {t("birthday")}
              </Text>

              <DatePicker
                options={styles.datepicker}
                mode="monthYear"
                onSelectedChange={(date) => setDate(date)}
              />
            </View>

            <View style={styles.textInputContainer}>
              <Text style={[styles.textInputLabel, styles.text]}>
                {t("password")}
              </Text>
              <TextInput
                onChangeText={setPassword}
                secureTextEntry
                style={styles.textInput}
              />
            </View>
            <View style={styles.textInputContainer}>
              <Text style={[styles.textInputLabel, styles.text]}>
                {t("repeatpass")}
              </Text>
              <TextInput
                onChangeText={setPasswordRepeat}
                secureTextEntry
                style={styles.textInput}
              />
            </View>

            <TouchableOpacity style={styles.btn} onPress={signUpUser}>
              <Text style={styles.btnText}>{t("signup")}</Text>
            </TouchableOpacity>
          </View>

          <TouchableWithoutFeedback onPress={navToSignIn}>
            <Text
              style={[
                {
                  color: "black",
                  alignSelf: "center",
                },
                styles.text,
              ]}
            >
              <Text style={{ color: primary }}>{t("signin")}</Text>
            </Text>
          </TouchableWithoutFeedback>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
