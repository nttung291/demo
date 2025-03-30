import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { MD2Colors as Colors, TextInput } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";

type Props = {
  autoFocus?: boolean;
  onChangeText: (text: string) => void;
  onSearchPress?: () => void;
  onClearPress?: () => void;
  placeholder?: string;
  value: string;
  onSubmitEditing?: () => void;
};

export const SearchBar = ({
  onChangeText,
  onSearchPress,
  onClearPress,
  placeholder = "Search",
  value,
  autoFocus = false,
  ...rest
}: Props) => {
  return (
    <View style={styles.container}>
      <TextInput
        autoFocus={autoFocus}
        style={styles.searchInput}
        theme={{
          colors: {
            background: "transparent",
            primary: "transparent",
          },
        }}
        selectionColor={Colors.blueGrey400}
        underlineColor="transparent"
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Colors.green700}
        value={value}
        {...rest}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.grey300,
    borderRadius: 25,
    height: 50,
    justifyContent: "center",
  },
  searchInput: {
    width: "100%",
    borderRadius: 25,
    height: 50,
    backgroundColor: "transparent",
  },
  clearIconContainer: {
    position: "absolute",
    right: 18,
  },
});
