import { StatusBar } from "expo-status-bar";
import CustomLoading from "./components/CustomLoading/index";
import Settings from "./components/Settings";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { OverlayProvider } from "stream-chat-expo";
import { AppRegistry } from "react-native";
import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Results from "./components/Results";
import {
  NavigationContainer,
  StackActions,
  useNavigation,
} from "@react-navigation/native";
import Tabs from "./components/Tabs";
import firebase from "firebase";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Main from "./components/Main";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import Quiz from "./components/Quiz";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { primary } from "./components/colors";

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
  const [loaded, setLoaded] = useState(false);

  function onAuthStateChanged(user) {
    if (user) {
      setLoaded(true);
      setUser(user);
    } else {
      setUser(null);
      setLoaded(true);
    }
  }

  // const { bottom } = useSafeAreaInsets();
  useEffect(() => {
    const promise = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return promise;
  }, []);
  if (!loaded) {
    return <CustomLoading />;
  }

  return (
    <NavigationContainer>
      {user ? (
        <>
          <Stack.Navigator>
            <Stack.Screen
              name="Tabs"
              component={Tabs}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              component={Quiz}
              options={{
                headerShown: false,
              }}
              name="Quiz"
            />
            <Stack.Screen
              component={Results}
              options={{
                headerTitle: "Proqress",
                headerBackTitle: "",
              }}
              name="Results"
            />
            <Stack.Screen
              name="Settings"
              options={{
                headerBackTitle: "",
              }}
              component={Settings}
            />
          </Stack.Navigator>
        </>
      ) : (
        <>
          <Stack.Navigator>
            <Stack.Screen
              name="Sign Up"
              options={{
                headerShown: false,
              }}
              component={SignUp}
            />

            <Stack.Screen
              name="Sign In"
              options={{
                headerShown: false,
              }}
              component={SignIn}
            />
          </Stack.Navigator>
        </>
      )}
    </NavigationContainer>
  );
}
