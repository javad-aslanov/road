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
} from "react-native";
import stylez from "./styles";
import firebase from "firebase";
import { StackActions, useNavigation } from "@react-navigation/native";
import Svg, { G, Path } from "react-native-svg";
import { primary } from "../../colors";
import { useColorScheme } from "react-native";
import stylesdark from "./stylesdark";
import t from "../../../i18n";
const SignIn = () => {
  const scheme = useColorScheme();
  let styles = stylez;
  if (scheme === "dark") styles = stylesdark;
  const nav = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const signInUser = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(username + "@gmail.com", password)
      .catch((e) => {
        Alert.alert("Error", e.message);
      });
  };
  const navToSignUp = () => {
    nav.dispatch(StackActions.replace("Sign Up"));
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <View style={{ flex: 1, padding: 10, justifyContent: "space-evenly" }}>
          <Text style={styles.title}>Sign In</Text>

          <View>
            <View style={styles.textInputContainer}>
              <Text style={[styles.textInputLabel, styles.text]}>
                {t("username")}
              </Text>
              <TextInput
                onChangeText={setUsername}
                placeholderTextColor="white"
                style={styles.textInput}
                value={username}
                placeholder={username}
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
                placeholder={password}
                value={password}
                placeholderTextColor="white"
              />
            </View>

            <TouchableOpacity style={styles.btn} onPress={signInUser}>
              <Text style={styles.btnText}>{t("signin")}</Text>
            </TouchableOpacity>
          </View>

          <TouchableWithoutFeedback onPress={navToSignUp}>
            <Text
              style={[
                {
                  color: "black",
                  alignSelf: "center",
                },
                styles.text,
              ]}
            >
              {t("donthaveacc") + " "}
              <Text style={{ color: primary }}>{t("signup")}</Text>
            </Text>
          </TouchableWithoutFeedback>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
