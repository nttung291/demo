import React from "react";
import { View, StyleSheet } from "react-native";
import { MD2Colors as Colors } from "react-native-paper";
import { ActionButton, BottomSheet } from "@components";
import { realmService, cryptoCurrencies, fiatCurrencies } from "@services";

type Props = {
  isVisible: boolean;
  onClose: () => void;
  onActionComplete: () => void;
};

export const ActionBottomSheet: React.FC<Props> = ({
  isVisible,
  onClose,
  onActionComplete,
}) => {
  const handleClearDatabase = async () => {
    try {
      await realmService.initialize();
      realmService.clearCurrencies();
      onClose();
      onActionComplete();
    } catch (error) {
      console.error("Failed to clear database:", error);
    }
  };

  const handleInsertData = async () => {
    try {
      await realmService.initialize();
      await realmService.insertCurrencies([
        ...cryptoCurrencies,
        ...fiatCurrencies,
      ]);
      onClose();
      onActionComplete();
    } catch (error) {
      console.error("Failed to insert data:", error);
    }
  };

  return (
    <BottomSheet
      isVisible={isVisible}
      title="Database Actions"
      onClose={onClose}
      snapPoints={["30%"]}
    >
      <View style={styles.container}>
        <ActionButton
          label="Clear Database"
          onPress={handleClearDatabase}
          variant="danger"
        />

        <ActionButton
          label="Insert All Data"
          onPress={handleInsertData}
          variant="primary"
        />
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 8,
    backgroundColor: Colors.white,
    marginTop: 24,
  },
});
