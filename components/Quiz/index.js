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
      "Я стараюсь быть хорошим/ей c другими людьми. Я внимателен/на к их чувствам",
    answers: ["Верно", "Отчасти верно", "Неверно"],
    answerWeight: [2, 1, 0],
    category: prosocial,
  },
  {
    answers: ["Верно", "Отчасти верно", "Неверно"],
    question: "Я неугомонный/ая, не могу долго оставаться спокойным/ой",
    answerWeight: [2, 1, 0],
    category: hyperactive,
  },
  {
    answers: ["Верно", "Отчасти верно", "Неверно"],
    question: "У меня часто бывают головные боли, боли в животе и тошнота",
    answerWeight: [2, 1, 0],
    category: emotional,
  },
  {
    answers: ["Верно", "Отчасти верно", "Неверно"],
    question: "Я обычно делюсь с другими (едой, играми, ручками и др.)",
    answerWeight: [2, 1, 0],
    category: prosocial,
  },
  {
    answers: ["Верно", "Отчасти верно", "Неверно"],
    question: "Я сильно сержусь, раздражаюсь и выхожу из себя",
    answerWeight: [2, 1, 0],
    category: behaviour,
  },
  {
    answers: ["Верно", "Отчасти верно", "Неверно"],
    question:
      "Я обычно один/одна. Чаще всего я играю в одиночестве и занимаюсь сам/а",
    answerWeight: [2, 1, 0],
    category: communication,
  },
  {
    answers: ["Верно", "Отчасти верно", "Неверно"],
    answerWeight: [0, 1, 2],
    question: "Я обычно делаю то, что мне говорят",
    category: behaviour,
  },
  {
    answers: ["Верно", "Отчасти верно", "Неверно"],
    question: "Я много беспокоюсь",
    answerWeight: [2, 1, 0],
    category: emotional,
  },
  {
    answers: ["Верно", "Отчасти верно", "Неверно"],
    question: "Я пытаюсь помочь, если кто-нибудь расстроен, обижен или болен",
    answerWeight: [2, 1, 0],
    category: prosocial,
  },
  {
    answers: ["Верно", "Отчасти верно", "Неверно"],
    question: "Я постоянно ерзаю и верчусь",
    answerWeight: [2, 1, 0],
    category: hyperactive,
  },
  {
    answers: ["Верно", "Отчасти верно", "Неверно"],
    question: "У меня есть по крайней мере один хороший друг",
    answerWeight: [0, 1, 2],
    category: communication,
  },
  {
    answers: ["Верно", "Отчасти верно", "Неверно"],
    question:
      "Я много дерусь. Я могу заставить других людей делать то, что я хочу",
    answerWeight: [2, 1, 0],
    category: behaviour,
  },
  {
    answers: ["Верно", "Отчасти верно", "Неверно"],
    question:
      "Я часто чувствую себя несчастным/ой, унылым/ой, готов/а расплакаться",
    answerWeight: [2, 1, 0],
    category: emotional,
  },
  {
    answers: ["Верно", "Отчасти верно", "Неверно"],
    question: "Я обычно нравлюсь своим сверстникам",
    answerWeight: [0, 1, 2],
    category: communication,
  },
  {
    answers: ["Верно", "Отчасти верно", "Неверно"],
    question: "Я легко отвлекаюсь, мне трудно сосредоточиться",
    answerWeight: [2, 1, 0],
    category: hyperactive,
  },
  {
    answers: ["Верно", "Отчасти верно", "Неверно"],
    question: "Я нервничаю в новой обстановке, легко теряю уверенность",
    answerWeight: [2, 1, 0],
    category: emotional,
  },
  {
    answers: ["Верно", "Отчасти верно", "Неверно"],
    question: "Я добр/а к младшим детям",
    answerWeight: [2, 1, 0],
    category: prosocial,
  },
  {
    answers: ["Верно", "Отчасти верно", "Неверно"],
    question: "Меня часто обвиняют во лжи или обмане",
    answerWeight: [2, 1, 0],
    category: behaviour,
  },
  {
    answers: ["Верно", "Отчасти верно", "Неверно"],
    question: "Другие часто дразнят или задирают меня",
    answerWeight: [2, 1, 0],
    category: communication,
  },
  {
    answers: ["Верно", "Отчасти верно", "Неверно"],
    question: "Я часто вызываюсь помочь другим (родителям, учителям, детям)",
    answerWeight: [2, 1, 0],
    category: prosocial,
  },
  {
    answers: ["Верно", "Отчасти верно", "Неверно"],
    question: "Я думаю прежде чем действовать",
    answerWeight: [0, 1, 2],
    category: hyperactive,
  },
  {
    answers: ["Верно", "Отчасти верно", "Неверно"],
    question: "Я беру чужие вещи из дома, школы и других мест",
    answerWeight: [2, 1, 0],
    category: behaviour,
  },
  {
    answers: ["Верно", "Отчасти верно", "Неверно"],
    question: "У меня лучше отношения со взрослыми, чем со сверстниками",
    answerWeight: [2, 1, 0],
    category: communication,
  },
  {
    answers: ["Верно", "Отчасти верно", "Неверно"],
    question: "Я многого боюсь, легко пугаюсь",
    answerWeight: [2, 1, 0],
    category: emotional,
  },
  {
    answers: ["Верно", "Отчасти верно", "Неверно"],
    question:
      "Я делаю до конца работу, которую начал/а. У меня хорошее внимание.",
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
          <Text style={styles.selectText}>Выберите ответ✨</Text>
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
              Назад
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
                {index === questions.length - 1 ? "Закончить" : "Следующий"}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Index;
