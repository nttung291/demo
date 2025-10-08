import React, { ReactNode } from "react";
import { View, Text, StyleSheet } from "react-native";

type InfoSectionProps = {
  title: string;
  children: ReactNode;
};

export const InfoSection: React.FC<InfoSectionProps> = ({ title, children }) => {
  return (
    <View style={styles.infoSection}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  infoSection: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    margin: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
    marginBottom: 16,
  },
});
