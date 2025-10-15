import { StyleSheet } from "react-native";
import { MD2Colors as Colors } from "react-native-paper";

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    flexDirection: "row",
  },
  rightContainer: {
    flex: 1,
  },
  leftContainer: {
    flex: 3,
  },
  leftSubTitle: {
    color: Colors.grey600,
    marginTop: 6,
  },
  rightSubTitle: {
    marginTop: 6,
    textAlign: "right",
  },
  rightTitle: {
    textAlign: "right",
  },
});

export default styles;
