import React from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from "react-native";
import { Dimensions, TouchableHighlight } from "react-native";

import { primary, secondary } from "../colors";

const Index = () => {
  return (
    <SafeAreaView
      style={{
        backgroundColor: "white",
        flex: 1,
        justifyContent: "space-evenly",
      }}
    >
      <Text
        style={{
          alignSelf: "center",
          fontWeight: "bold",
          fontSize: 20,
        }}
      >
        Yardıma ehtiyacınız var?
      </Text>
      <View
        style={{
          padding: 13,
          backgroundColor: secondary,
          borderRadius: 999999,
          alignSelf: "center",
        }}
      >
        <TouchableOpacity
          style={{
            borderRadius:
              Math.round(
                Dimensions.get("window").width + Dimensions.get("window").height
              ) / 2,
            width: Dimensions.get("window").width * 0.4,
            height: Dimensions.get("window").width * 0.4,
            backgroundColor: primary,
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
          }}
          activeOpacity={1}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}></Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: secondary,
          borderRadius: 15,
          paddingHorizontal: 80,
          paddingVertical: 20,
          alignSelf: "center",
        }}
      >
        <Text
          style={{
            alignSelf: "center",
            color: primary,
            fontWeight: "bold",
          }}
        ></Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default Index;
