import React, { useState, useEffect } from "react";
import PsychScreen from "./PsychScreen";
import Admin from "./Admin";
import PsychChats from "./PsychChats";
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
  ActivityIndicator,
} from "react-native";
import call from "react-native-phone-call";
import LinearGradient from "react-native-linear-gradient";

import firebase from "firebase";
import {
  FIREBASE_PATH_TESTS,
  FIREBASE_PATH_USERS,
} from "../constants/firebase";
import WhiteText from "./WhiteText";
import { StackActions, useNavigation } from "@react-navigation/native";
import { primary, secondary } from "./colors";
import { BarChart, LineChart } from "react-native-chart-kit";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PSYCH_ID } from "../constants/others";
import { StreamChat } from "stream-chat";
import t from "../i18n";

const client = StreamChat.getInstance("48v2teztftmy");
const Main = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    const unsub = firebase
      .firestore()
      .collection(FIREBASE_PATH_USERS)
      .doc(firebase.auth().currentUser.uid)
      .onSnapshot((snap) => {
        setUser({ ...snap.data() });
      });
    return unsub;
  }, []);
  const nav = useNavigation();

  if (user) {
    async function func() {
      await client.connectUser(
        {
          id: firebase.auth().currentUser.uid,
          name: user.username,
        },
        client.devToken(firebase.auth().currentUser.uid)
      );
    }
    func();
  }

  if (user && user.isPsych) {
    return <PsychScreen />;
  }

  if (user && !user.isTeacher) {
    return (
      <ScrollView style={{ backgroundColor: "white", flex: 1, paddingTop: 30 }}>
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
              alignSelf: "center",
              paddingVertical: 30,
            }}
          >
            {t("greeting")}, {user.username}👋
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
              {t("tests")}
            </Text>
            <FlatList
              data={
                user.completedTests.length > 0
                  ? user.pendingTests
                  : ["initTest"]
              }
              renderItem={({ item, index }) => {
                const name = item.name;
                const isCompleted = user.completedTests
                  ? user.completedTests.length > 0
                  : false;
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
                      {t("diagnostic")}
                    </WhiteText>
                    <WhiteText
                      style={{
                        alignSelf: "center",
                      }}
                    >
                      {"∼"}
                      {t("mins")}
                      {"⏰"}
                    </WhiteText>

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
                        {isCompleted ? t("retry") : t("start")}
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
              {t("needhelp")}
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
                  {t("talktoprof")}
                </WhiteText>

                <TouchableOpacity
                  onPress={async () => {
                    const channel = client.channel("messaging", {
                      members: [firebase.auth().currentUser.uid, PSYCH_ID],
                    });
                    await channel.create();
                    nav.dispatch(
                      StackActions.push("Chat", {
                        channel_id: channel.id,
                      })
                    );
                  }}
                  style={{
                    borderRadius: 10000,
                    borderColor: secondary,
                    borderWidth: 1.5,
                    padding: 5,
                    paddingHorizontal: 10,
                    backgroundColor: secondary,
                  }}
                >
                  <Text style={{ fontWeight: "bold", color: primary }}>
                    {t("start")}
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
                  {t("hotline")}
                </WhiteText>

                {/* <WhiteText>
                    {isCompleted ? "Tamamlandı" : "Tamamlanmadı"}
                  </WhiteText> */}
                <TouchableOpacity
                  onPress={() => {
                    call({
                      prompt: true,
                      number: "112",
                    });
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
                    {t("call")}
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
  } else
    return (
      <SafeAreaView
        style={{ backgroundColor: "white", flex: 1, justifyContent: "center" }}
      >
        <ActivityIndicator animating size="large" color={primary} />
      </SafeAreaView>
    );
};

const styles = StyleSheet.create({});

export default Main;
