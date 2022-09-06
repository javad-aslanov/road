import React, { useEffect, useState } from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
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
import { FIREBASE_PATH_TESTS } from "../../constants/firebase";
const Index = (props) => {
  function translate(level) {
    if (level === "barely normal") return "sərhəd";
    else return level;
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
  }, []);

  if (data) {
    const state = {
      tableHead: [" Kateqoriya ", "Bal", "Səviyyə", "Tarix"],
      tableData: [],
    };
    for (let i = 0; i < data.length; i++) {
      const x = data[i];
      const date = new Date(x.date.seconds * 1000).toDateString();
      state.tableData = [
        ...state.tableData,
        [
          "Ünsiyyətcillik",
          x.scores[0].weight,
          translate(x.scores[0].level),
          date,
        ],
        [
          "Hiperaktivlik",
          x.scores[1].weight,
          translate(x.scores[1].level),
          date,
        ],
        [
          "Emosionallıq",
          x.scores[2].weight,
          translate(x.scores[2].level),
          date,
        ],
        ["Davranış", x.scores[3].weight, translate(x.scores[3].level), date],
      ];
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
        </View>
      </SafeAreaView>
    );
  } else {
    return <></>;
  }
};

export default Index;
