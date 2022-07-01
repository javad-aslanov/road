import React, { useEffect, useState, useRef } from "react";
import { View, StyleSheet, Animated } from "react-native";

import { AZURE_BLUE } from "../../constants/colors";
const Index = ({ steps, step, height }) => {
  const animatedValue = useRef(new Animated.Value(-1000)).current;
  const reactive = useRef(new Animated.Value(-1000)).current;
  const [width, setWidth] = useState(0);
  useEffect(() => {
    Animated.timing(animatedValue, {
      duration: 300,
      toValue: reactive,
      useNativeDriver: true,
    }).start();
  }, []);
  useEffect(() => {
    reactive.setValue(-width + (width * step) / steps);
  }, [step, width]);
  return (
    <View
      style={{
        height,
        borderRadius: height,
        backgroundColor: "rgba(0, 82, 255, 0.1)",
        overflow: "hidden",
        margin: 10,
      }}
    >
      <Animated.View
        onLayout={(e) => {
          const newWidth = e.nativeEvent.layout.width;
          setWidth(newWidth);
        }}
        style={{
          height,
          width: "100%",
          borderRadius: height,
          backgroundColor: AZURE_BLUE,
          position: "absolute",
          left: 0,
          top: 0,
          transform: [{ translateX: animatedValue }],
        }}
      ></Animated.View>
    </View>
  );
};

export default Index;
