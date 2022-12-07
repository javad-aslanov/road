import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Share,
} from "react-native";
import firebase from "firebase";
import { FIREBASE_PATH_USERS } from "../../constants/firebase";
import styles from "./styles";
import { Feather } from "expo-vector-icons";
import { StackActions, useNavigation } from "@react-navigation/native";
const Index = ({ user }) => {
  const [students, setStudents] = useState([]);
  const nav = useNavigation();
  useEffect(() => {
    firebase
      .firestore()
      .collection(FIREBASE_PATH_USERS)
      .where("teacherCode", "==", user.code)
      .onSnapshot((snap) => {
        const arr = snap.docs.map((x) => {
          const data = x.data();
          const id = x.id;
          return { ...data, id };
        });
        setStudents(arr);
      });
  }, []);
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white", padding: 15 }}>
      <Text
        style={{
          color: "black",
          fontWeight: "bold",
          fontSize: 25,
          alignSelf: "center",
          paddingVertical: 30,
        }}
      >
        Привет, {user.username}👋
      </Text>

      <View
        style={{
          paddingLeft: 30,
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 15,
          }}
        >
          Ученики
        </Text>
        <View>
          {students.map((student) => (
            <View style={styles.studentView}>
              <Text style={styles.studentName}>{student.username}</Text>

              <View
                style={{
                  flexDirection: "column",
                }}
              >
                <TouchableOpacity
                  style={styles.studentBtn}
                  onPress={() => {
                    nav.dispatch(
                      StackActions.push("Results", {
                        studentId: student.id,
                      })
                    );
                  }}
                >
                  <Text style={styles.studentBtnText}>
                    <Feather name="bar-chart" />
                    Посмотреть прогресс
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
          <TouchableOpacity
            style={styles.shareBtn}
            onPress={async () => {
              const code = firebase.auth().currentUser.uid.substring(0, 5);
              const msg = `Salam \n\nBu, "Road" proqramından istifadə etmək üçün tələbələrə eksklüziv dəvətdir.\nMüəllim kodumla qeydiyyatdan keçin!\n\nMüəllim kodu:${code}\n\nwww.roadapp.az`;
              Share.share({
                message: msg,
              });
            }}
          >
            <Feather name="share-2" color="#fff" size={18} />
            <Text style={styles.shareBtnText}>
              Отправить приглашение ученикам
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Index;
