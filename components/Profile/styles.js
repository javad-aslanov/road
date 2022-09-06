import { StyleSheet } from "react-native";
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  title: {
    color: "black",
    fontWeight: "bold",
    fontSize: 25,
    alignSelf: "center",
    paddingVertical: 30,
  },
  inputView: {
    padding: 10,
  },
  inputLabel: {
    fontWeight: "bold",
    paddingBottom: 5,
  },
  input: {
    borderColor: "darkgrey",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#dbdbdb",
  },
  notDisabled: {
    borderColor: "lightgrey",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: "white",
  },
  signOutBtn: {
    borderWidth: 1,
    margin: 10,
    borderRadius: 4,
    borderColor: "rgb(255, 0, 0)",
    backgroundColor: "rgba(255, 0, 0, 0.05)",
  },
  signOutText: {
    alignSelf: "center",
    padding: 7,
    color: "rgb(255, 0, 0)",
  },
});
