import React from "react";
import { StyleSheet } from "react-native";
import { MD2Colors as Colors, useTheme } from "react-native-paper";
import {
  SafeAreaView,
  SafeAreaViewProps,
} from "react-native-safe-area-context";

export const LayoutContainer = ({
  children,
  disabledSafeView,
  ...props
}: { disabledSafeView?: boolean } & Omit<
  SafeAreaViewProps,
  "disabledSafeView"
>): JSX.Element => {
  const theme = useTheme();
  return (
    <SafeAreaView
      style={styles.container}
      edges={disabledSafeView ? [] : ["top", "left", "right", "bottom"]}
      {...props}
    >
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.grey900,
    paddingTop: 12,
  },
});
