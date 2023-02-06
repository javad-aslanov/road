import { StyleSheet } from "react-native";
import { primary } from "../colors";
export default StyleSheet.create({
  container: { flex: 1, padding: 3, paddingTop: 30, backgroundColor: "#fff" },
  head: { height: 40, backgroundColor: "#f1f8ff" },
  text: { margin: 7, alignSelf: "center" },
  options: {
    fotnSize: 25,
    fontWeight: "bold",
    alignSelf: "center",
    padding: 5,
  },
  backupTestBtn: {
    borderRadius: 10,
    backgroundColor: primary,
    margin: 25,
  },
  backupTestTxt: {
    color: "white",
    alignSelf: "center",
    padding: 10,
    fontWeight: "bold",
  },
});
