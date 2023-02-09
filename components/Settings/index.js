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
import t from "../../i18n";

const Index = () => {
  const nav = useNavigation();
  const [loading, setLoading] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordRepeat, setNewPasswordRepeat] = useState("");
  if (!loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title2}>{t("changepass")}</Text>
        <View style={styles.inputView}>
          <Text style={styles.inputLabel}>{t("newpass")}</Text>
          <TextInput
            secureTextEntry
            onChangeText={(t) => setNewPassword(t)}
            style={styles.notDisabled}
          ></TextInput>
        </View>
        <View style={styles.inputView}>
          <Text style={styles.inputLabel}>{t("repeatnewpass")}</Text>
          <TextInput
            secureTextEntry
            onChangeText={(t) => setNewPasswordRepeat(t)}
            style={styles.notDisabled}
          ></TextInput>
        </View>

        <TouchableOpacity
          onPress={() => {
            Alert.alert(t("areusure"), "", [
              {
                text: t("yes"),
                style: "destructive",
                onPress: async () => {
                  if (newPassword !== newPasswordRepeat) {
                    Alert.alert(t("passwordrep"));
                  } else if (newPassword.length < 8) {
                    Alert.alert(t("passchar"));
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
                text: t("no"),
                style: "cancel",
              },
            ]);
          }}
          style={styles.signOutBtn}
        >
          <Text style={styles.signOutText}>{t("changepass")}</Text>
        </TouchableOpacity>

        <Text style={styles.title2}>{t("deleteacc")}</Text>
        <TouchableOpacity
          onPress={() => {
            Alert.alert(t("areudelete"), "", [
              {
                text: t("yes"),
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
                text: t("no"),
                style: "cancel",
              },
            ]);
          }}
          style={styles.signOutBtn}
        >
          <Text style={styles.signOutText}>{t("deleteacc")}</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  } else {
    return <CustomLoading />;
  }
};

export default Index;
