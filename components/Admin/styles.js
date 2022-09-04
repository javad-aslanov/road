import { StyleSheet } from "react-native";
import { primary, secondary } from "../colors";

export default StyleSheet.create({
  studentBtn: {
    borderRadius: 10,
    borderColor: secondary,
    borderWidth: 1.5,
    padding: 5,
    paddingHorizontal: 10,
    backgroundColor: secondary,
    alignSelf: "center",
    margin: 4,
  },
  studentBtnText: { fontWeight: "bold", color: primary },
  studentView: {
    flexDirection: "row",
    borderRadius: 10,
    borderColor: "lightgrey",
    borderWidth: 1,
    justifyContent: "space-between",
    padding: 10,
    margin: 5,
  },
  studentName: {
    alignSelf: "center",
  },
  shareBtn: {
    borderRadius: 10,
    borderColor: primary,
    borderWidth: 1.5,
    padding: 10,
    paddingHorizontal: 10,
    backgroundColor: primary,
    alignSelf: "center",
    margin: 4,
    flexDirection: "row",
  },
  shareBtnText: {
    fontWeight: "bold",
    color: "white",
    paddingHorizontal: 5,
  },
});
