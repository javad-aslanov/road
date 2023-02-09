import { StyleSheet } from "react-native";
import { darkmodebg, primary } from "../../colors";

export default StyleSheet.create({
  datepicker: {
    backgroundColor: darkmodebg,
    textHeaderColor: primary,
    textDefaultColor: "#F6E7C1",
    selectedTextColor: "#fff",
    mainColor: primary,
    textSecondaryColor: primary,
    borderColor: "rgba(122, 146, 165, 0.1)",
  },

  text: {
    color: "white",
  },
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
    backgroundColor: darkmodebg,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    paddingBottom: 10,
    color: "white",
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
  text: {
    color: "white",
  },
});
