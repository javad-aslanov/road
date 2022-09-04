import React, { useState, useEffect } from "react";
import Admin from "./Admin";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  FlatList,
  Share,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import firebase from "firebase";
import {
  FIREBASE_PATH_TESTS,
  FIREBASE_PATH_USERS,
} from "../constants/firebase";
import WhiteText from "./WhiteText";
import { StackActions, useNavigation } from "@react-navigation/native";
import { primary, secondary } from "./colors";
import { BarChart, LineChart } from "react-native-chart-kit";
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

  if (user && !user.isTeacher) {
    return (
      <ScrollView style={{ backgroundColor: "white", flex: 1 }}>
        <View
          style={{
            flex: 1,
          }}
        >
          <Text
            style={{
              color: "black",
              fontWeight: "bold",
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
                      borderColor: "lightgrey",
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
                      ∼5 dəq⏰
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
                        borderColor: secondary,
                        borderWidth: 1.5,
                        padding: 5,
                        paddingHorizontal: 10,
                        backgroundColor: secondary,
                      }}
                    >
                      <Text style={{ fontWeight: "bold", color: primary }}>
                        {isCompleted ? "Yenidən Keç" : "Başla"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          </View>

          <View
            style={{
              padding: 15,
            }}
          >
            <Text
              style={{
                color: "black",
                fontSize: 20,
              }}
            >
              Yardıma ehtiyacınız var?
            </Text>
            <>
              <View
                style={{
                  padding: 18,
                  margin: 10,
                  borderRadius: 10,
                  borderColor: "lightgrey",
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
                  Psixoloqla söhbət💬
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
                    borderColor: secondary,
                    borderWidth: 1.5,
                    padding: 5,
                    paddingHorizontal: 10,
                    backgroundColor: secondary,
                  }}
                >
                  <Text style={{ fontWeight: "bold", color: primary }}>
                    Başla
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  padding: 18,
                  margin: 10,
                  borderRadius: 10,
                  borderColor: "lightgrey",
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
                  Qaynar xətt☎️
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
                    borderColor: secondary,
                    borderWidth: 1.5,
                    padding: 5,
                    paddingHorizontal: 10,
                    backgroundColor: secondary,
                  }}
                >
                  <Text style={{ fontWeight: "bold", color: primary }}>
                    Zəng et
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          </View>
        </View>
      </ScrollView>
    );
  } else if (user) {
    return <Admin user={user} />;
  } else return <></>;
};

const styles = StyleSheet.create({});

export default Main;
