import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import firebase from "firebase";
import {
  FIREBASE_PATH_TESTS,
  FIREBASE_PATH_USERS,
} from "../constants/firebase";
import WhiteText from "./WhiteText";
import { StackActions, useNavigation } from "@react-navigation/native";
const Main = () => {
  const [user, setUser] = useState();
  const [tests, setTests] = useState();
  useEffect(() => {
    const unsub = firebase
      .firestore()
      .collection(FIREBASE_PATH_USERS)
      .doc(firebase.auth().currentUser.uid)
      .onSnapshot((snap) => {
        setUser({ ...snap.data() });
      });
    // const unsub2 = firebase
    //   .firestore()
    //   .collection(FIREBASE_PATH_TESTS)
    //   .onSnapshot((snap) => {
    //     const arr = snap.docs.map((x) => {
    //       x.data(), x.id;
    //     });
    //     setTests(arr);
    //   });
    return unsub;
  }, []);
  const nav = useNavigation();
  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      {user ? (
        <View
          style={{
            flex: 1,
          }}
        >
          <Text
            style={{
              color: "black",
              fontWeight: "bold",
              fontFamily: "roboto_bold",
              fontSize: 25,
              padding: 50,
            }}
          >
            Salam, {user.username}👋
          </Text>

          <View
            style={{
              padding: 15,
            }}
          >
            <Text
              style={{
                color: "black",
                fontFamily: "roboto_bold",
                fontSize: 20,
              }}
            >
              Testlər
            </Text>
            <FlatList
              data={[0]}
              renderItem={({ item, index }) => {
                const name = item.name;
                const length = item.length;
                const isCompleted = user.completedTests.length > 0;
                return (
                  <View
                    style={{
                      padding: 18,
                      margin: 10,
                      borderRadius: 10,
                      borderColor: "gold",
                      flexDirection: "row",
                      borderWidth: 1.5,
                      justifyContent: "space-around",
                    }}
                  >
                    <WhiteText
                      style={{
                        alignSelf: "center",
                      }}
                    >
                      Xarakter Testi
                    </WhiteText>
                    <WhiteText
                      style={{
                        alignSelf: "center",
                      }}
                    >
                      ∼7 dəq⏰
                    </WhiteText>
                    {/* <WhiteText>
                      {isCompleted ? "Tamamlandı" : "Tamamlanmadı"}
                    </WhiteText> */}
                    <TouchableOpacity
                      onPress={() => {
                        nav.dispatch(StackActions.push("Quiz", {}));
                      }}
                      style={{
                        borderRadius: 10,
                        borderColor: "rgba(25, 41, 88, 1)",
                        borderWidth: 1.5,
                        padding: 5,
                        paddingHorizontal: 10,
                        backgroundColor: "rgba(25, 41, 88, 1)",
                      }}
                    >
                      <Text style={{ fontWeight: "bold", color: "white" }}>
                        {isCompleted ? "Yenidən Keç" : "Başla"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          </View>
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default Main;
