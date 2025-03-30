import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Button } from "@components";
import { Ordering, SortBy } from "@helpers";
import { MD2Colors as Colors, List, Modal, Portal } from "react-native-paper";

type Props = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  onSetFilter: (sortBy: string, ordering: string) => void;
};

export const FilterModal: React.FC<Props> = ({
  setVisible,
  visible,
  onSetFilter,
}) => {
  const hideModal = () => setVisible(false);
  const [sortByExpanded, setSortByExpanded] = useState(false);
  const [orderingExpanded, setOrderingExpanded] = useState(false);
  const [sortBy, setShortBy] = useState<string>(SortBy.CREATED_DATE);
  const [ordering, setOrdering] = useState<string>(Ordering.DES);

  const onSortByItemPress = (type: SortBy) => {
    setSortByExpanded(!sortByExpanded);
    setShortBy(type);
  };

  const onOrderingByItemPress = (type: Ordering) => {
    setOrderingExpanded(!orderingExpanded);
    setOrdering(type);
  };

  const onSavePress = () => {
    onSetFilter(sortBy, ordering);
    hideModal();
  };

  const onClearPress = () => {
    setSortByExpanded(false);
    setOrderingExpanded(false);
    setShortBy(SortBy.CREATED_DATE);
    setOrdering(Ordering.DES);
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={styles.container}
      >
        <List.Section
          theme={{
            colors: {
              background: Colors.grey900,
              primary: Colors.white,
              secondary: Colors.white,
              accent: Colors.white,
            },
          }}
          style={styles.listSection}
        >
          <List.Accordion
            title={`Sort By: ${sortBy}`}
            onPress={() => setSortByExpanded(!sortByExpanded)}
            expanded={sortByExpanded}
            right={() => null}
            titleStyle={{
              color: Colors.white,
            }}
            theme={{
              colors: {
                background: Colors.grey900,
              },
            }}
          >
            <List.Item
              onPress={() => onSortByItemPress(SortBy.CREATED_DATE)}
              titleStyle={{ color: Colors.grey500 }}
              title={SortBy.CREATED_DATE}
            />
            <List.Item
              onPress={() => onSortByItemPress(SortBy.DUE_DATE)}
              titleStyle={{ color: Colors.grey500 }}
              title={SortBy.DUE_DATE}
            />
          </List.Accordion>

          <List.Accordion
            title={`Ordering: ${ordering}`}
            expanded={orderingExpanded}
            onPress={() => setOrderingExpanded(!orderingExpanded)}
            right={() => null}
            rippleColor={Colors.grey900}
            titleStyle={{
              color: Colors.white,
            }}
            theme={{
              colors: {
                background: Colors.grey900,
              },
            }}
          >
            <List.Item
              onPress={() => onOrderingByItemPress(Ordering.ASC)}
              titleStyle={{ color: Colors.grey500 }}
              title={Ordering.ASC}
            />
            <List.Item
              onPress={() => onOrderingByItemPress(Ordering.DES)}
              titleStyle={{ color: Colors.grey500 }}
              title={Ordering.DES}
            />
          </List.Accordion>
        </List.Section>
        <Button mode="text" onPress={onSavePress}>
          Save
        </Button>
        <Button mode="text" onPress={onClearPress}>
          Clear
        </Button>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    padding: 24,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.grey900,
    opacity: 0.95,
    borderRadius: 8,
  },
  listSection: {
    width: "100%",
    backgroundColor: Colors.grey900,
  },
});
