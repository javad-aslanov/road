import Profile from "../Profile";
import PsychChats from "../PsychChats";
import firebase from "firebase";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "expo-vector-icons";
import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import Main from "../Main";
import Hotline from "../Hotline";
import { primary } from "../colors";
import { FIREBASE_PATH_USERS } from "../../constants/firebase";

const Index = () => {
  const Tab = createBottomTabNavigator();
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
  return (
    <Tab.Navigator initialRouteName="Main" labeled={false} screenOptions={{}}>
      <Tab.Screen
        name="Main"
        component={Main}
        options={{
          headerStyle: {
            backgroundColor: "#1A2144",
          },
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            if (color === "#8E8E8F") {
              return <Feather name="home" size={size} color={"lightgrey"} />;
            } else {
              return <Feather name="home" size={size} color={primary} />;
            }
          },
        }}
      />

      {user && user.isPsych && (
        <Tab.Screen
          name="PsychChats"
          component={PsychChats}
          options={{
            headerStyle: {
              backgroundColor: "#1A2144",
            },
            tabBarShowLabel: false,
            headerShown: false,
            tabBarIcon: ({ color, size }) => {
              if (color === "#8E8E8F") {
                return (
                  <Feather
                    name="message-square"
                    size={size}
                    color={"lightgrey"}
                  />
                );
              } else {
                return (
                  <Feather name="message-square" size={size} color={primary} />
                );
              }
            },
          }}
        />
      )}

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerStyle: {
            backgroundColor: "#1A2144",
          },
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            if (color === "#8E8E8F") {
              return <Feather name="user" size={size} color={"lightgrey"} />;
            } else {
              return <Feather name="user" size={size} color={primary} />;
            }
          },
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({});

export default Index;
