import { StyleSheet } from "react-native";
import { AZURE_BLUE, BABY_BLUE } from "../../../constants/colors";
import { primary } from "../../colors";

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
    color: "black",
  },

  container: {
    flex: 1,
    backgroundColor: "white",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    paddingBottom: 10,
    color: "black",
  },
  textInputLabel: {
    color: "black",

    paddingHorizontal: 7,
  },
  btn: {
    alignContent: "center",
    backgroundColor: primary,
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
  },
});
