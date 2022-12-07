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
        <Text style={styles.title2}>Изменить пароль</Text>
        <View style={styles.inputView}>
          <Text style={styles.inputLabel}>Новый пароль</Text>
          <TextInput
            secureTextEntry
            onChangeText={(t) => setNewPassword(t)}
            style={styles.notDisabled}
          ></TextInput>
        </View>
        <View style={styles.inputView}>
          <Text style={styles.inputLabel}>Повторите новый пароль</Text>
          <TextInput
            secureTextEntry
            onChangeText={(t) => setNewPasswordRepeat(t)}
            style={styles.notDisabled}
          ></TextInput>
        </View>

        <TouchableOpacity
          onPress={() => {
            Alert.alert("Вы уверены, что хотите изменить свой пароль?", "", [
              {
                text: "Да",
                style: "destructive",
                onPress: async () => {
                  if (newPassword !== newPasswordRepeat) {
                    Alert.alert(
                      "Пароль и повторение пароля должны иметь одинаковое значение"
                    );
                  } else if (newPassword.length < 8) {
                    Alert.alert("Пароль должен быть не менее 8 символов");
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
                text: "Нет",
                style: "cancel",
              },
            ]);
          }}
          style={styles.signOutBtn}
        >
          <Text style={styles.signOutText}>Изменить пароль</Text>
        </TouchableOpacity>

        <Text style={styles.title2}>Удалить аккаунт</Text>
        <TouchableOpacity
          onPress={() => {
            Alert.alert("Вы уверены, что хотите удалить свой аккаунт?", "", [
              {
                text: "Да",
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
                text: "Нет",
                style: "cancel",
              },
            ]);
          }}
          style={styles.signOutBtn}
        >
          <Text style={styles.signOutText}>Удалить аккаунт</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  } else {
    return <CustomLoading />;
  }
};

export default Index;
