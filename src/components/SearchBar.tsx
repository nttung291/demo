import React from "react";
import { TouchableOpacity, View, StyleSheet, ViewStyle } from "react-native";
import { MD2Colors as Colors, TextInput } from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons";

type Props = {
  autoFocus?: boolean;
  onChangeText: (text: string) => void;
  onSearchPress?: () => void;
  onClearPress?: () => void;
  placeholder?: string;
  value: string;
  onSubmitEditing?: () => void;
  containerStyle?: ViewStyle;
};

export const SearchBar = ({
  onChangeText,
  onSearchPress,
  onClearPress,
  placeholder = "",
  value,
  autoFocus = false,
  containerStyle = {},
  ...rest
}: Props) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity
        onPress={onSearchPress}
        style={styles.searchIconContainer}
        disabled={!onSearchPress}
      >
        <Ionicons name="search-outline" size={24} />
      </TouchableOpacity>
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
      {value && (
        <TouchableOpacity
          onPress={onClearPress}
          style={styles.clearIconContainer}
        >
          <Ionicons name="close-outline" size={32} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.grey300,
    borderRadius: 25,
    height: 50,
    justifyContent: "center",
    marginBottom: 10,
  },
  searchIconContainer: {
    position: "absolute",
    left: 18,
  },
  searchInput: {
    paddingLeft: 36,
    paddingRight: 36,
    borderRadius: 25,
    height: 50,
    backgroundColor: "transparent",
  },
  clearIconContainer: {
    position: "absolute",
    right: 18,
  },
});
