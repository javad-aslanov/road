import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "expo-vector-icons";
import React from "react";
import { View, StyleSheet } from "react-native";
import Main from "../Main";
import Hotline from "../Hotline";

const Index = () => {
  const Tab = createBottomTabNavigator();
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
              return <Feather name="home" size={size} color={"darkblue"} />;
            }
          },
        }}
      />
      <Tab.Screen
        name="Hotline"
        component={Hotline}
        options={{
          headerStyle: {
            backgroundColor: "#1A2144",
          },
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            if (color === "#8E8E8F") {
              return <Feather name="phone" size={size} color={"lightgrey"} />;
            } else {
              return <Feather name="phone" size={size} color={"darkblue"} />;
            }
          },
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({});

export default Index;
