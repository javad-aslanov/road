import React from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { primary } from "../colors";
import styles from "./styles";
const Index = () => {
  return (
    <SafeAreaView
      style={{ backgroundColor: "white", flex: 1, justifyContent: "center" }}
    >
      <ActivityIndicator animating size="large" color={primary} />
    </SafeAreaView>
  );
};

export default Index;
