import React, { useState } from "react";
import { View } from "react-native";
import { LayoutContainer } from "@components";
import styles from "./styles";

export const DetailScreen: React.FC = () => {
  return (
    <LayoutContainer>
      <View style={styles.container}></View>
    </LayoutContainer>
  );
};
