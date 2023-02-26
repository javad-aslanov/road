import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import styles from "./styles";
import { AZURE_BLUE } from "../../constants/colors";
import Progress from "../Progress";
import Icon from "react-native-vector-icons/AntDesign";
import { StackActions, useNavigation } from "@react-navigation/native";
import firebase from "firebase";
import * as Haptics from "expo-haptics";
import {
  FIREBASE_PATH_TESTS,
  FIREBASE_PATH_USERS,
} from "../../constants/firebase";
import t from "../../i18n";

function determineLevel(x) {
  var level = "";
  if (x.category === emotional) {
    if (x.weight <= 3 && x.weight >= 0) {
      level = "normal";
    } else if (x.weight === 4) {
      level = "barely normal";
    } else if (x.weight >= 5 && x.weight <= 10) {
      level = "abnormal";
    }
  }
  if (x.category === behaviour) {
    if (x.weight <= 2 && x.weight >= 0) {
      level = "normal";
    } else if (x.weight === 3) {
      level = "barely normal";
    } else if (x.weight >= 4 && x.weight <= 10) {
      level = "abnormal";
    }
  }
  if (x.category === hyperactive) {
    if (x.weight <= 5 && x.weight >= 0) {
      level = "normal";
    } else if (x.weight === 6) {
      level = "barely normal";
    } else if (x.weight >= 7 && x.weight <= 10) {
      level = "abnormal";
    }
  }
  if (x.category === communication) {
    if (x.weight <= 2 && x.weight >= 0) {
      level = "normal";
    } else if (x.weight === 3) {
      level = "barely normal";
    } else if (x.weight >= 4 && x.weight <= 10) {
      level = "abnormal";
    }
  }
  if (x.category === prosocial) {
    if (x.weight <= 10 && x.weight >= 6) {
      level = "normal";
    } else if (x.weight === 5) {
      level = "barely normal";
    } else if (x.weight >= 0 && x.weight <= 4) {
      level = "abnormal";
    }
  }
  return level;
}

const emotional = "emotional";
const behaviour = "behaviour";
const hyperactive = "hyperactive";
const communication = "communication";
const prosocial = "prosocial";
const initialQuestions = t("test");

const Index = (props) => {
  const nav = useNavigation();
  function back() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIndex(index - 1);
  }
  async function finish() {
    setLoading(true);
    var result = [];
    var array = questions.map((q) => {
      return { category: q.category, weight: q.answerWeight[q.selectedAnswer] };
    });
    array.reduce(function (res, value) {
      if (!res[value.category]) {
        res[value.category] = { category: value.category, weight: 0 };
        result.push(res[value.category]);
      }
      res[value.category].weight += value.weight;
      return res;
    }, {});
    result = result.map((x) => {
      let level = determineLevel(x);

      return { ...x, level };
    });
    await firebase
      .firestore()
      .collection(FIREBASE_PATH_USERS)
      .doc(firebase.auth().currentUser.uid)
      .update({
        scores: result,
        completedTests: ["initTest"],
      });
    await firebase.firestore().collection(FIREBASE_PATH_TESTS).add({
      userId: firebase.auth().currentUser.uid,
      scores: result,
      date: firebase.firestore.FieldValue.serverTimestamp(),
      type: "General Checkup.",
    });
    setLoading(false);
    nav.dispatch(StackActions.popToTop());
  }
  function next() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIndex(index + 1);
    setIsSelectedAnswer(false);
  }
  function setSelectedAnswer(index, questionIndex) {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    let temp = questions;
    temp[questionIndex].selectedAnswer = index;
    setQuestions(temp);
    setTrigger(!trigger);
    setIsSelectedAnswer(true);
  }
  const [index, setIndex] = useState(0);
  const [trigger, setTrigger] = useState(true);
  const [questions, setQuestions] = useState(initialQuestions);
  const [isSelectedAnswer, setIsSelectedAnswer] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {}, [questions, trigger]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.progress}>
        <Text style={styles.progressText}>
          {index + 1} / {questions.length}
        </Text>
        <View>
          <Progress step={index + 1} steps={questions.length} height={30} />
        </View>
      </View>

      <View style={styles.selectContainer}>
        <View style={styles.infoContainer}>
          <Text style={styles.selectText}>{t("chooseanswer")}</Text>
          <Text style={styles.questionText}>{questions[index].question}</Text>
          <View style={styles.answers}>
            {questions[index].answers.map((answer, ind) => (
              <TouchableOpacity
                onPress={() => setSelectedAnswer(ind, index)}
                style={
                  questions[index].selectedAnswer === ind
                    ? [
                        styles.answerContainer,
                        {
                          backgroundColor: "rgba(0, 82, 255, 0.1)",
                        },
                      ]
                    : styles.answerContainer
                }
              >
                <Icon
                  style={{
                    alignSelf: "center",
                    paddingLeft: 5,
                  }}
                  name={
                    questions[index].selectedAnswer === ind
                      ? "checkcircle"
                      : "checkcircleo"
                  }
                  color={AZURE_BLUE}
                  size={20}
                />
                <Text
                  style={
                    questions[index].selectedAnswer === ind
                      ? [styles.answerText, {}]
                      : [styles.answerText, {}]
                  }
                >
                  {answer}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.buttons}>
          <TouchableOpacity
            onPress={
              index > 0
                ? back
                : () => {
                    nav.dispatch(StackActions.popToTop());
                  }
            }
            style={styles.back}
          >
            <Text
              style={
                index > 0
                  ? styles.backText
                  : [styles.backText, styles.disabledText]
              }
            >
              {t("back")}
            </Text>
          </TouchableOpacity>
          {loading ? (
            <TouchableOpacity
              onPress={() => {}}
              style={[styles.next, styles.enabled]}
            >
              <ActivityIndicator
                style={[styles.nextText, styles.enabledText]}
                animating
                color="white"
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={
                !isNaN(questions[index].selectedAnswer)
                  ? index === questions.length - 1
                    ? finish
                    : next
                  : () => {}
              }
              style={
                !isNaN(questions[index].selectedAnswer) &&
                questions[index].selectedAnswer !== null
                  ? [styles.next, styles.enabled]
                  : [styles.next, styles.disabled]
              }
            >
              <Text
                style={
                  !isNaN(questions[index].selectedAnswer) &&
                  questions[index].selectedAnswer !== null
                    ? [styles.nextText, styles.enabledText]
                    : [styles.nextText, styles.disabledText]
                }
              >
                {index === questions.length - 1 ? t("finish") : t("next")}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Index;
