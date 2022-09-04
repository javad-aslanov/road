import React from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  Dimensions,
  useWindowDimensions,
  Text,
} from "react-native";
import firebase from "firebase";
import { StackActions, useNavigation } from "@react-navigation/native";
const HEIGHT = Dimensions.get("window").height;

const Index = () => {
  const { width } = useWindowDimensions();
  return (
    <SafeAreaView
      style={{
        height: HEIGHT / 1.2,
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "space-around",
        backgroundColor: "#0E1C41",
        flex: 1,
      }}
    >
      <Text
        style={{
          fontFamily: "_bold",
          fontSize: 25,
          color: "white",
        }}
      >
        {"Quick Personality Test"}
      </Text>
      <Image
        style={{
          width: width / 1.5,
          height: width / 1.5,
        }}
        source={{
          uri: "https://res.cloudinary.com/dqfyngfj2/image/upload/v1656753571/undraw_My_answer_re_k4dv_mwid6m.png",
        }}
      />

      <Text
        style={{
          color: "darkgrey",
        }}
      >
        {"Please take it to help us personalize your experience for you"}
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default Index;
