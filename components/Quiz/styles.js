import { StyleSheet } from "react-native";
import { AZURE_BLUE } from "../../constants/colors";

export default StyleSheet.create({
  progressText: {
    fontFamily: "roboto_bold",
    alignSelf: "center",
    marginVertical: 10,
    fontSize: 15,
    color: "white",
  },
  container: {
    flex: 1,
    backgroundColor: "#0E1C41",
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
    backgroundColor: "rgba(0, 82, 255, 0.1)",
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
    fontFamily: "roboto_bold",
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
    fontFamily: "roboto",
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
    fontFamily: "roboto",
    padding: 10,
    fontSize: 20,
    alignSelf: "center",
    color: "white",
  },
  nextText: {
    fontSize: 20,
    fontFamily: "roboto",
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
    backgroundColor: "rgba(0, 82, 255, 0.1)",
    borderColor: "white",
  },
  enabledText: {
    color: "white",
  },
  enabled: {
    backgroundColor: AZURE_BLUE,
    borderColor: AZURE_BLUE,
  },
});
