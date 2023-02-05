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
const initialQuestions = [
  {
    question:
      "I try to be nice to other people. I am attentive to their feelings",
      answers: ["Agree", "Partially agree", "Disagree"],
    answerWeight: [2, 1, 0],
    category: prosocial,
  },
  {
    answers: ["Agree", "Partially agree", "Disagree"],
    question: "I'm restless, I can't stay calm for long",
    answerWeight: [2, 1, 0],
    category: hyperactive,
  },
  {
    answers: ["Agree", "Partially agree", "Disagree"],
    question: "I often have headaches, stomach pains and nausea",
    answerWeight: [2, 1, 0],
    category: emotional,
  },
  {
    answers: ["Agree", "Partially agree", "Disagree"],
    question: "I usually share with others (food, money, etc.)",
    answerWeight: [2, 1, 0],
    category: prosocial,
  },
  {
    answers: ["Agree", "Partially agree", "Disagree"],
    question: "I get very angry, annoyed and lose my temper",
    answerWeight: [2, 1, 0],
    category: behaviour,
  },
  {
    answers: ["Agree", "Partially agree", "Disagree"],
    question:
      "I am usually alone. Most often I play alone and enjoy being by myself",
    answerWeight: [2, 1, 0],
    category: communication,
  },
  {
    answers: ["Agree", "Partially agree", "Disagree"],
    answerWeight: [0, 1, 2],
    question: "I usually do what I'm told",
    category: behaviour,
  },
  {
    answers: ["Agree", "Partially agree", "Disagree"],
    question: "I feel anxious on a regular basis",
    answerWeight: [2, 1, 0],
    category: emotional,
  },
  {
    answers: ["Agree", "Partially agree", "Disagree"],
    question: "I try to help if anyone is upset, offended or sick",
    answerWeight: [2, 1, 0],
    category: prosocial,
  },
  {
    answers: ["Agree", "Partially agree", "Disagree"],
    question: "I constantly fidget with my surroundings and can't stand still.",
    answerWeight: [2, 1, 0],
    category: hyperactive,
  },
  {
    answers: ["Agree", "Partially agree", "Disagree"],
    question: "I have at least one good friend",
    answerWeight: [0, 1, 2],
    category: communication,
  },
  {
    answers: ["Agree", "Partially agree", "Disagree"],
    question:
      "I fight a lot. I can make other people do what I want",
    answerWeight: [2, 1, 0],
    category: behaviour,
  },
  {
    answers: ["Agree", "Partially agree", "Disagree"],
    question:
      "I often feel miserable, unhappy and dismotivated",
    answerWeight: [2, 1, 0],
    category: emotional,
  },
  {
    answers: ["Agree", "Partially agree", "Disagree"],
    question: "I am liked by my peers",
    answerWeight: [0, 1, 2],
    category: communication,
  },
  {
    answers: ["Agree", "Partially agree", "Disagree"],
    question: "I am easily distracted and have difficulty concentrating",
    answerWeight: [2, 1, 0],
    category: hyperactive,
  },
  {
    answers: ["Agree", "Partially agree", "Disagree"],
    question: "I get nervous in new surroundings, lose confidence easily",
    answerWeight: [2, 1, 0],
    category: emotional,
  },
  {
    answers: ["Agree", "Partially agree", "Disagree"],
    question: "I am kind to small kids",
    answerWeight: [2, 1, 0],
    category: prosocial,
  },
  {
    answers: ["Agree", "Partially agree", "Disagree"],
    question: "I am often accused of lying and cheating",
    answerWeight: [2, 1, 0],
    category: behaviour,
  },
  {
    answers: ["Agree", "Partially agree", "Disagree"],
    question: "Others often tease me in uncomfortable ways",
    answerWeight: [2, 1, 0],
    category: communication,
  },
  {
    answers: ["Agree", "Partially agree", "Disagree"],
    question: "I often volunteer to help others (parents, teachers, children)",
    answerWeight: [2, 1, 0],
    category: prosocial,
  },
  {
    answers: ["Agree", "Partially agree", "Disagree"],
    question: "I think before I act.",
    answerWeight: [0, 1, 2],
    category: hyperactive,
  },
  {
    answers: ["Agree", "Partially agree", "Disagree"],
    question: "I take the things of others without permission at home, school or other places",
    answerWeight: [2, 1, 0],
    category: behaviour,
  },
  {
    answers: ["Agree", "Partially agree", "Disagree"],
    question: "I have a better relationship with older people than people my age",
    answerWeight: [2, 1, 0],
    category: communication,
  },
  {
    answers: ["Agree", "Partially agree", "Disagree"],
    question: "I'm afraid of many things, I get scared easily",
    answerWeight: [2, 1, 0],
    category: emotional,
  },
  {
    answers: ["Agree", "Partially agree", "Disagree"],
    question:
      "I complete the work that I started. I have a good attention span.",
    answerWeight: [0, 1, 2],
    category: hyperactive,
  },
];

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
          <Text style={styles.selectText}>Choose an answer✨</Text>
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
              Back
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
                {index === questions.length - 1 ? "Finish" : "Next"}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Index;
