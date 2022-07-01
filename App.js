import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import firebase from "firebase";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Main from "./components/Main";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import { useFonts } from "expo-font";
import Quiz from "./components/Quiz";

const firebaseConfig = {
  apiKey: "AIzaSyByYPKLWwts8c3ZGi_PWcca0ScIDzBYkVM",
  authDomain: "road-f380a.firebaseapp.com",
  projectId: "road-f380a",
  storageBucket: "road-f380a.appspot.com",
  messagingSenderId: "650715726143",
  appId: "1:650715726143:web:75a5c4d75a5a7600f1938a",
};

if (!firebase.apps.length) {
  const app = firebase.initializeApp(firebaseConfig);
} else {
  const app = firebase.app();
}
const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState();
  const [loaded] = useFonts({
    roboto: require("./assets/Ubuntu/Ubuntu-Regular.ttf"),
    roboto_bold: require("./assets/Ubuntu/Ubuntu-Bold.ttf"),
  });

  function onAuthStateChanged(user) {
    setUser(user);
  }

  // const { bottom } = useSafeAreaInsets();
  useEffect(() => {
    const promise = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return promise;
  }, []);
  if (!loaded) {
    return <ActivityIndicator animating color="black" />;
  }

  return (
    <NavigationContainer>
      {user ? (
        <>
          <Stack.Navigator>
            <Stack.Screen name="Main" component={Main} />
          </Stack.Navigator>
        </>
      ) : (
        <>
          <Stack.Navigator>
            <Stack.Screen
              name="Sign In"
              options={{
                headerShown: false,
              }}
              component={SignIn}
            />
            <Stack.Screen
              name="Sign Up"
              options={{
                headerShown: false,
              }}
              component={SignUp}
            />
            <Stack.Screen
              component={Quiz}
              options={{
                headerShown: false,
              }}
              name="Quiz"
            />
          </Stack.Navigator>
        </>
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
