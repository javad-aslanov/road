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
import styles from "./SignIn/styles";
import firebase from "firebase";
import { StackActions, useNavigation } from "@react-navigation/native";
import Svg, { G, Path } from "react-native-svg";
import { primary } from "../colors";

const minAge = 13;
const maxAge = 17;

const SignUp = () => {
  function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const nav = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [age, setAge] = useState(0);
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const signUpUser = async () => {
    if (username.length <= 3) {
      Alert.alert("İstifadəçi adı ən azı 3 simvol uzunluğunda olmalıdır.");
    } else if (age < 13 || age > 17) {
      Alert.alert("Bu tətbiqin yaş tələblərinə uyğun deyilsiz");
    } else if (password !== passwordRepeat) {
      Alert.alert("Şifrə və şifrənin təkrarı eyni dəyərdə olmalıdır");
    } else if (password.length < 8) {
      Alert.alert("Şifrə ən azı 8 simvol uzunluğunda olmalıdır");
    } else if (!(code.length > 0)) {
      Alert.alert("Məktəb kodunu daxil edin");
    } else {
      setLoading(true);
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
          age: age,
          code: code,
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
              <Text style={styles.textInputLabel}>Məktəb kodu</Text>
              <TextInput onChangeText={setCode} style={styles.textInput} />
            </View>
            <View style={styles.textInputContainer}>
              <Text style={styles.textInputLabel}>Yaş</Text>
              <TextInput
                onChangeText={setAge}
                keyboardType="number-pad"
                style={styles.textInput}
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
