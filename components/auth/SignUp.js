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
} from "react-native";
import DatePicker from "react-native-modern-datepicker";

import styles from "./SignIn/styles";
import firebase from "firebase";
import { StackActions, useNavigation } from "@react-navigation/native";
import Svg, { G, Path } from "react-native-svg";
import { primary } from "../colors";
import { FIREBASE_PATH_USERS } from "../../constants/firebase";

const SignUp = () => {
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
      Alert.alert("Username must be at least 3 characters.");
    } else if (password !== passwordRepeat) {
      Alert.alert("Password and password repeat must be equal");
    } else if (password.length < 8) {
      Alert.alert("Password must be at least 8 characters long");
    } else if (!(code.length > 0)) {
      Alert.alert("Enter the teacher code");
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
          <Text style={styles.title}>Sign Up</Text>

          <View>
            <View style={styles.textInputContainer}>
              <Text style={styles.textInputLabel}>Username</Text>
              <TextInput onChangeText={setUsername} style={styles.textInput} />
            </View>
            <View style={styles.textInputContainer}>
              <Text style={styles.textInputLabel}>Teacher Code</Text>
              <TextInput onChangeText={setCode} style={styles.textInput} />
            </View>
            <View style={styles.textInputContainer}>
              <Text style={styles.textInputLabel}>Birthday</Text>

              <DatePicker
                mode="monthYear"
                onSelectedChange={(date) => setDate(date)}
              />
            </View>

            <View style={styles.textInputContainer}>
              <Text style={styles.textInputLabel}>Password</Text>
              <TextInput
                onChangeText={setPassword}
                secureTextEntry
                style={styles.textInput}
              />
            </View>
            <View style={styles.textInputContainer}>
              <Text style={styles.textInputLabel}>Password Repeat</Text>
              <TextInput
                onChangeText={setPasswordRepeat}
                secureTextEntry
                style={styles.textInput}
              />
            </View>

            <TouchableOpacity style={styles.btn} onPress={signUpUser}>
              <Text style={styles.btnText}>Sign Up</Text>
            </TouchableOpacity>
          </View>

          <TouchableWithoutFeedback onPress={navToSignIn}>
            <Text
              style={{
                color: "black",
                alignSelf: "center",
              }}
            >
              Have an account? <Text style={{ color: primary }}>Sign In</Text>
            </Text>
          </TouchableWithoutFeedback>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
