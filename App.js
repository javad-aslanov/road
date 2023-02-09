import { StatusBar } from "expo-status-bar";
import Chat from "./components/Chat";
import CustomLoading from "./components/CustomLoading/index";
import Settings from "./components/Settings";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { OverlayProvider } from "stream-chat-expo";
import { AppRegistry } from "react-native";
import React, { useState, useEffect } from "react";
import Results from "./components/Results";
import {
  NavigationContainer,
  StackActions,
  useNavigation,
} from "@react-navigation/native";
import Tabs from "./components/Tabs";
import firebase from "firebase";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import Quiz from "./components/Quiz";
import { getLocales } from "expo-localization";
import t from "./i18n";
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

  useEffect(() => {
    const promise = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return promise;
  }, []);
  if (!loaded) {
    return <CustomLoading />;
  }
  // firebase
  //   .firestore()
  //   .collection("users")
  //   .get()
  //   .then((snap) => {
  //     const data = snap.docs.map((x) => x.data());
  //     for (let i = 0; i < data.length; i++) {
  //       const element = data[i];
  //       const score = element.scores[0].level;
  //       const num = element.scores[0].weight;
  //       const score1 = element.scores[1].level;
  //       const num1 = element.scores[1].weight;
  //       const score2 = element.scores[2].level;
  //       const num2 = element.scores[2].weight;
  //       const score3 = element.scores[3].level;
  //       const num3 = element.scores[3].weight;
  //       const score4 = element.scores[4].level;
  //       const num4 = element.scores[4].weight;
  //       console.log(
  //         element.username + ": ",
  //         "Prosocial:",
  //         score + " (score is " + num + ")",
  //         "Hyperactive:",
  //         score1 + " (score is " + num1 + ")",
  //         "Emotional:",
  //         score2 + " (score is " + num2 + ")",
  //         "Behavior:",
  //         score3 + " (score is " + num3 + ")",
  //         "Communication:",
  //         score4 + " (score is " + num4 + ")"
  //       );
  //       console.log();
  //     }
  //     console.log("end");
  //   })

  console.log(t("hello"));

  return (
    <OverlayProvider>
      <StatusBar style="dark" />
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
                name="Chat"
                component={Chat}
                options={{
                  haederShown: false,
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
                  headerTitle: "Progress",
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
    </OverlayProvider>
  );
}
