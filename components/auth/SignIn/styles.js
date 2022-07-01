import { StyleSheet } from "react-native";
import { AZURE_BLUE, BABY_BLUE } from "../../../constants/colors";

export default StyleSheet.create({
  textInput: {
    padding: 7,
    borderWidth: 0.5,
    borderColor: "black",
    marginBottom: 10,
    marginHorizontal: 7,
    borderRadius: 7,
    borderColor: "lightgrey",
    marginVertical: 7,
    color: "white",
  },

  container: {
    flex: 1,
    backgroundColor: "#121B44",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    paddingBottom: 10,
    fontFamily: "roboto_bold",
    color: "white",
  },
  textInputLabel: {
    color: "white",
    paddingHorizontal: 7,
    fontFamily: "roboto",
  },
  btn: {
    alignContent: "center",
    backgroundColor: AZURE_BLUE,
    justifyContent: "center",
    textAlign: "center",
    borderRadius: 10,
    marginBottom: 100,
    alignSelf: "center",
    padding: 10,
    paddingHorizontal: 60,
    marginVertical: 10,
  },
  btnText: {
    alignSelf: "center",
    padding: 10,
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
    fontFamily: "roboto_bold",
  },
});
