import { StyleSheet } from "react-native";
import { AZURE_BLUE } from "../../constants/colors";
import { primary } from "../colors";

export default StyleSheet.create({
  progressText: {
    alignSelf: "center",
    marginVertical: 10,
    fontSize: 15,
    color: "black",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  progressBar: {
    alignSelf: "center",
    marginVertical: 10,
    width: 300,
    height: 20,
  },
  selectText: {
    fontSize: 14,
    color: "white",
  },
  selectContainer: {
    backgroundColor: "#0E1C41",
    margin: 20,
    flex: 1,
    borderRadius: 15,
    padding: 5,
  },
  infoContainer: {
    flex: 1.7,
    padding: 7,
  },
  answers: {
    flex: 1,
  },
  buttons: {
    flex: 1,
  },
  questionText: {
    fontWeight: "bold",

    fontSize: 17,
    marginVertical: 10,
    color: "white",
  },
  answerContainer: {
    flexDirection: "row",
    flex: 1,
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "white",
  },
  answerText: {
    paddingLeft: 10,
    alignSelf: "center",
    color: "white",
  },
  buttons: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingBottom: 10,
    paddingHorizontal: 6,
  },
  backText: {
    padding: 10,
    fontSize: 20,
    alignSelf: "center",
    color: "white",
  },
  nextText: {
    fontSize: 20,
    padding: 10,
    alignSelf: "center",
  },
  next: {
    borderWidth: 1,
    borderRadius: 10,
    flex: 1,
  },
  back: {
    flex: 1,
  },
  disabledText: {
    color: "lightgrey",
  },
  disabled: {
    backgroundColor: "rgba(48,90,247, 0.1)",
    borderColor: primary,
  },
  enabledText: {
    color: "white",
  },
  enabled: {
    backgroundColor: primary,
    borderColor: primary,
  },
});
