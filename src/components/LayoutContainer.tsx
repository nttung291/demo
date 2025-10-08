import React from "react";
import { StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  MD2Colors as Colors,
  useTheme,
} from "react-native-paper";
import {
  SafeAreaView,
  SafeAreaViewProps,
} from "react-native-safe-area-context";

export const LayoutContainer = ({
  children,
  disabledSafeView,
  isLoading,
  ...props
}: { disabledSafeView?: boolean; isLoading?: boolean } & Omit<
  SafeAreaViewProps,
  "disabledSafeView"
>): JSX.Element => {
  return (
    <SafeAreaView
      style={styles.container}
      edges={disabledSafeView ? ["bottom"] : ["top", "left", "right", "bottom"]}
      {...props}
    >
      {isLoading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#A32EFF" />
        </View>
      ) : (
        children
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
