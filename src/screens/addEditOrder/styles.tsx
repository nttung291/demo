import { StyleSheet } from "react-native";
import { MD2Colors as Colors } from "react-native-paper";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    marginTop: 12,
  },
  noteInput: {
    minHeight: 100,
    fontSize: 12,
    marginBottom: 12,
    marginTop: 12,
    backgroundColor: Colors.white,
  },
  button: {
    marginVertical: 16,
  },
});

export default styles;
