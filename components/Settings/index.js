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
        <Text style={styles.title2}>Parolu Dəyiş</Text>
        <View style={styles.inputView}>
          <Text style={styles.inputLabel}>Yeni Şifrə</Text>
          <TextInput
            secureTextEntry
            onChangeText={(t) => setNewPassword(t)}
            style={styles.notDisabled}
          ></TextInput>
        </View>
        <View style={styles.inputView}>
          <Text style={styles.inputLabel}>Yeni Şifrəni Təkrarlayın</Text>
          <TextInput
            secureTextEntry
            onChangeText={(t) => setNewPasswordRepeat(t)}
            style={styles.notDisabled}
          ></TextInput>
        </View>

        <TouchableOpacity
          onPress={() => {
            Alert.alert("Parolunuzu dəyişmək istədiyinizə əminsiniz?", "", [
              {
                text: "Bəli",
                style: "destructive",
                onPress: async () => {
                  if (newPassword !== newPasswordRepeat) {
                    Alert.alert(
                      "Şifrə və şifrənin təkrarı eyni dəyərdə olmalıdır"
                    );
                  } else if (newPassword.length < 8) {
                    Alert.alert("Şifrə ən azı 8 simvol uzunluğunda olmalıdır");
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
                text: "Yox",
                style: "cancel",
              },
            ]);
          }}
          style={styles.signOutBtn}
        >
          <Text style={styles.signOutText}>Parolu Dəyiş</Text>
        </TouchableOpacity>

        <Text style={styles.title2}>Hesabı Sil</Text>
        <TouchableOpacity
          onPress={() => {
            Alert.alert("Hesabınızı silmək istədiyinizə əminsiniz?", "", [
              {
                text: "Bəli",
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
                text: "Yox",
                style: "cancel",
              },
            ]);
          }}
          style={styles.signOutBtn}
        >
          <Text style={styles.signOutText}>Hesabı Sil</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  } else {
    return <CustomLoading />;
  }
};

export default Index;
