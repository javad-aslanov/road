import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  ActivityIndicator,
} from "react-native";
import firebase from "firebase";
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell,
} from "react-native-table-component";
import styles from "./styles";
import {
  FIREBASE_PATH_TESTS,
  FIREBASE_PATH_USERS,
} from "../../constants/firebase";
import { TouchableOpacity } from "react-native";
import { Feather } from "expo-vector-icons";
import { primary } from "../colors";
import ActionSheet from "react-native-actions-sheet";
import { Picker } from "@react-native-picker/picker";
import * as Haptics from "expo-haptics";
const Index = (props) => {
  const actionSheetRef = useRef(null);
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [loading, setLoading] = useState(false);
  const [student, setStudent] = useState();

  function sendBackupTest() {
    actionSheetRef.current.hide();

    setLoading(true);
    console.log(props.route.params.studentId);

    firebase
      .firestore()
      .collection(FIREBASE_PATH_USERS)
      .doc(props.route.params.studentId)
      .update({
        pendingTests:
          firebase.firestore.FieldValue.arrayUnion(selectedLanguage),
      });
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setLoading(false);
  }

  function showOptions() {
    actionSheetRef.current.show();
  }

  function translate(level) {
    // if (level === "barely normal") return "sərhəd";
    // else return level;
    return level;
  }

  const [data, setData] = useState([]);
  useEffect(() => {
    firebase
      .firestore()
      .collection(FIREBASE_PATH_TESTS)
      .where("userId", "==", props.route.params.studentId)
      .get()
      .then((snap) => {
        const arr = snap.docs.map((s) => s.data());
        setData(arr);
      });
    firebase
      .firestore()
      .collection(FIREBASE_PATH_USERS)
      .doc(props.route.params.studentId)
      .get()
      .then((snap) => {
        const dt = snap.data();
        setStudent(dt);
      });
  }, [loading]);

  if (data) {
    const state = {
      tableHead: [" Category ", "Score", "Level", "Date"],
      tableData: [],
    };
    for (let i = 0; i < data.length; i++) {
      const x = data[i];
      const date = new Date(x.date.seconds * 1000).toDateString();
      state.tableData = [
        ...state.tableData,
        ["Prosocial", x.scores[0].weight, translate(x.scores[0].level), date],
        ["Hyperactive", x.scores[1].weight, translate(x.scores[1].level), date],
        ["Emotional", x.scores[2].weight, translate(x.scores[2].level), date],
        ["Behavioral", x.scores[3].weight, translate(x.scores[3].level), date],
      ];
    }

    if (loading) {
      return (
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: "white",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator animating size="large" color={primary} />
        </SafeAreaView>
      );
    }

    return (
      <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
        <View style={styles.container}>
          <Table borderStyle={{ borderWidth: 2, borderColor: "#c8e1ff" }}>
            <Row
              data={state.tableHead}
              style={styles.head}
              textStyle={styles.text}
            />
            <Rows data={state.tableData} style={{}} textStyle={styles.text} />
          </Table>

          {student && student.pendingTests && (
            <View
              style={{
                borderRadius: 20,
                borderWidth: 0.5,
                padding: 10,
                marginTop: 30,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                Tests:
              </Text>
              <View
                style={{
                  widht: "100%",
                  height: 0.5,
                  backgroundColor: "black",
                  marginVertical: 10,
                }}
              ></View>
              {student.completedTests.map((x) => (
                <View
                  style={{
                    justifyContent: "space-between",
                    flexDirection: "row",
                  }}
                >
                  <Text>{x === "initTest" ? t("general") : x}</Text>
                  <Text>✅</Text>
                </View>
              ))}
              {student.pendingTests.map((x) => (
                <View
                  style={{
                    justifyContent: "space-between",
                    flexDirection: "row",
                  }}
                >
                  <Text>{x[0].toUpperCase() + x.substring(1)}</Text>
                  <Text>➖</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        <TouchableOpacity
          style={{
            padding: 10,
            borderRadius: 99,
            backgroundColor: primary,
            width: 50,
            height: 50,
            right: 30,
            bottom: 30,
            position: "absolute",
            justifyContent: "center",
            zIndex: 10,
          }}
          onPress={() => showOptions()}
        >
          <Feather
            name="more-vertical"
            size={25}
            color={"white"}
            style={{
              alignSelf: "center",
            }}
          />
        </TouchableOpacity>

        <ActionSheet ref={actionSheetRef}>
          <Text style={styles.options}>{t("options")}</Text>

          <View
            style={{
              marginTop: 10,
            }}
          >
            <Picker
              selectedValue={selectedLanguage}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedLanguage(itemValue)
              }
              style={{}}
            >
              <Picker.Item label="Despression" value="depression" />
              <Picker.Item label="Anxiety" value="anxiety" />
              <Picker.Item
                label="Traits (Anger, negativity, etc)"
                value="traits"
              />
            </Picker>
          </View>
          <TouchableOpacity
            style={styles.backupTestBtn}
            onPress={sendBackupTest}
          >
            <Text style={styles.backupTestTxt}>{t("sendbackup")}</Text>
          </TouchableOpacity>
        </ActionSheet>
      </SafeAreaView>
    );
  } else {
    return <ActivityIndicator animating size="large" color={primary} />;
  }
};

export default Index;
