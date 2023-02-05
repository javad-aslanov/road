import React, { useState } from "react";
import CustomLoading from "../CustomLoading/index";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import styles from "./styles";
import firebase from "firebase";
import { StackActions, useNavigation } from "@react-navigation/native";

const Index = () => {
  const nav = useNavigation();
  const [loading, setLoading] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordRepeat, setNewPasswordRepeat] = useState("");
  if (!loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title2}>Change Password</Text>
        <View style={styles.inputView}>
          <Text style={styles.inputLabel}>New Password</Text>
          <TextInput
            secureTextEntry
            onChangeText={(t) => setNewPassword(t)}
            style={styles.notDisabled}
          ></TextInput>
        </View>
        <View style={styles.inputView}>
          <Text style={styles.inputLabel}>Repeat New Password</Text>
          <TextInput
            secureTextEntry
            onChangeText={(t) => setNewPasswordRepeat(t)}
            style={styles.notDisabled}
          ></TextInput>
        </View>

        <TouchableOpacity
          onPress={() => {
            Alert.alert("Are you sure, that you want to change your password?", "", [
              {
                text: "Yes",
                style: "destructive",
                onPress: async () => {
                  if (newPassword !== newPasswordRepeat) {
                    Alert.alert(
                      "Password and repeat password must have the same value"
                    );
                  } else if (newPassword.length < 8) {
                    Alert.alert("Password must be at least 8 characters");
                  } else {
                    setLoading(true);
                    await firebase
                      .auth()
                      .currentUser.updatePassword(newPassword)
                      .catch((e) => {
                        Alert.alert(e.message);
                      });
                    nav.dispatch(StackActions.popToTop());
                    setLoading(false);
                  }
                },
              },
              {
                text: "No",
                style: "cancel",
              },
            ]);
          }}
          style={styles.signOutBtn}
        >
          <Text style={styles.signOutText}>Change password</Text>
        </TouchableOpacity>

        <Text style={styles.title2}>Delete account</Text>
        <TouchableOpacity
          onPress={() => {
            Alert.alert("Are you sure, that you want to delete your account?", "", [
              {
                text: "Yes",
                style: "destructive",
                onPress: async () => {
                  setLoading(true);
                  await firebase
                    .auth()
                    .currentUser.delete()
                    .catch((e) => {
                      Alert.alert(e.message);
                    });
                  setLoading(false);
                },
              },
              {
                text: "No",
                style: "cancel",
              },
            ]);
          }}
          style={styles.signOutBtn}
        >
          <Text style={styles.signOutText}>Delete account</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  } else {
    return <CustomLoading />;
  }
};

export default Index;
