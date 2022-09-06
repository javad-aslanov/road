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
import DatePicker from "react-native-datepicker";

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
  const [date, setDate] = useState(
    new Date().getFullYear() -
      17 +
      "-" +
      (new Date().getMonth() < 10
        ? "0" + new Date().getMonth()
        : new Date().getMonth()) +
      "-" +
      (new Date().getDay() < 10
        ? "0" + new Date().getDay()
        : new Date().getDay())
  );
  const [code, setCode] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const signUpUser = async () => {
    if (username.length <= 3) {
      Alert.alert("İstifadəçi adı ən azı 3 simvol uzunluğunda olmalıdır.");
    } else if (password !== passwordRepeat) {
      Alert.alert("Şifrə və şifrənin təkrarı eyni dəyərdə olmalıdır");
    } else if (password.length < 8) {
      Alert.alert("Şifrə ən azı 8 simvol uzunluğunda olmalıdır");
    } else if (!(code.length > 0)) {
      Alert.alert("Məktəb kodunu daxil edin");
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
        });
    }
  };
  const navToSignIn = () => {
    nav.dispatch(StackActions.replace("Sign In"));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <View style={{ flex: 1, padding: 10, justifyContent: "space-evenly" }}>
          <Text style={styles.title}>Qeydiyyat</Text>

          <View>
            <View style={styles.textInputContainer}>
              <Text style={styles.textInputLabel}>İstifadəçi adı</Text>
              <TextInput onChangeText={setUsername} style={styles.textInput} />
            </View>
            <View style={styles.textInputContainer}>
              <Text style={styles.textInputLabel}>Müəllim kodu</Text>
              <TextInput onChangeText={setCode} style={styles.textInput} />
            </View>
            <View style={styles.textInputContainer}>
              <Text style={styles.textInputLabel}>Doğum tarixi</Text>

              <DatePicker
                style={{ width: 200, paddingVertical: 7 }}
                date={date}
                mode="date"
                format="YYYY-MM-DD"
                minDate={
                  new Date().getFullYear() -
                  17 +
                  "-" +
                  new Date().getMonth() +
                  "-" +
                  new Date().getDay()
                }
                maxDate={
                  new Date().getFullYear() -
                  13 +
                  "-" +
                  new Date().getMonth() +
                  "-" +
                  new Date().getDay()
                }
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                useNativeDriver={true}
                customStyles={{
                  dateIcon: {
                    opacity: 0,
                  },
                  dateInput: {
                    ...styles.textInput,
                  },
                  // ... You can check the source to find the other keys.
                }}
                onDateChange={(date) => setDate(date)}
              />
            </View>

            <View style={styles.textInputContainer}>
              <Text style={styles.textInputLabel}>Şifrə</Text>
              <TextInput
                onChangeText={setPassword}
                secureTextEntry
                style={styles.textInput}
              />
            </View>
            <View style={styles.textInputContainer}>
              <Text style={styles.textInputLabel}>Şifrə</Text>
              <TextInput
                onChangeText={setPasswordRepeat}
                secureTextEntry
                style={styles.textInput}
              />
            </View>

            <TouchableOpacity style={styles.btn} onPress={signUpUser}>
              <Text style={styles.btnText}>Təsdiq et</Text>
            </TouchableOpacity>
          </View>

          <TouchableWithoutFeedback onPress={navToSignIn}>
            <Text
              style={{
                color: "black",
                alignSelf: "center",
              }}
            >
              Hesabınız var? <Text style={{ color: primary }}>Giriş edin</Text>
            </Text>
          </TouchableWithoutFeedback>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
