import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { HomeScreen } from "../../src/screens/home";
import { CurrencyFilterType } from "../../src/types";

// Define prop types for mocked components
type CurrencyListProps = {
  search?: string;
  currencyType?: CurrencyFilterType;
  testID?: string;
};

type FilterSelectorProps = {
  selectedFilter: CurrencyFilterType;
  onFilterChange: (filter: CurrencyFilterType) => void;
  testID?: string;
};

type ActionBottomSheetProps = {
  isVisible: boolean;
  onClose: () => void;
  onActionComplete: () => void;
  testID?: string;
};

type IconButtonProps = {
  icon: string;
  onPress: () => void;
  testID?: string;
};

type LayoutContainerProps = {
  children: React.ReactNode;
  testID?: string;
};

type SearchBarProps = {
  containerStyle?: object;
  value: string;
  onChangeText: (text: string) => void;
  onClearPress: () => void;
  testID?: string;
};

jest.mock("../../src/screens/home/components/CurrencyList", () => {
  const { View } = require("react-native");
  return {
    CurrencyList: (props: CurrencyListProps) => (
      <View testID="currency-list" {...props} />
    ),
  };
});

jest.mock("../../src/screens/home/components/FilterSelector", () => {
  const { View } = require("react-native");
  return {
    FilterSelector: (props: FilterSelectorProps) => {
      return (
        <View testID="filter-selector">
          <View
            testID="all-filter"
            onPress={() => props.onFilterChange("all")}
          />
          <View
            testID="fiat-filter"
            onPress={() => props.onFilterChange("fiat")}
          />
          <View
            testID="crypto-filter"
            onPress={() => props.onFilterChange("crypto")}
          />
        </View>
      );
    },
  };
});

jest.mock("../../src/screens/home/components/ActionBottomSheet", () => {
  const { View } = require("react-native");
  const React = require("react");
  
  // Create a component that properly stores and exposes props
  const ActionBottomSheet = (props: ActionBottomSheetProps) => {
    return (
      <View testID="action-bottom-sheet" isVisible={props.isVisible}>
        {props.isVisible && (
          <View
            testID="action-complete-trigger"
            onPress={props.onActionComplete}
          />
        )}
        <View testID="close-bottom-sheet" onPress={props.onClose} />
      </View>
    );
  };
  
  return { ActionBottomSheet };
});

jest.mock("../../src/components", () => {
  const { View, TextInput } = require("react-native");
  return {
    IconButton: (props: IconButtonProps) => (
      <View testID="icon-button" {...props} />
    ),
    LayoutContainer: (props: LayoutContainerProps) => (
      <View testID="layout-container" {...props} />
    ),
    SearchBar: (props: SearchBarProps) => (
      <View testID="search-bar">
        <TextInput
          testID="search-input"
          value={props.value}
          onChangeText={props.onChangeText}
        />
        <View testID="clear-search" onPress={props.onClearPress} />
      </View>
    ),
  };
});

describe("HomeScreen Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with all components", () => {
    const { getByTestId } = render(<HomeScreen />);

    expect(getByTestId("layout-container")).toBeTruthy();
    expect(getByTestId("search-bar")).toBeTruthy();
    expect(getByTestId("icon-button")).toBeTruthy();
    expect(getByTestId("filter-selector")).toBeTruthy();
    expect(getByTestId("currency-list")).toBeTruthy();
    expect(getByTestId("action-bottom-sheet")).toBeTruthy();
  });

  it("handles search input correctly", () => {
    const { getByTestId } = render(<HomeScreen />);

    const searchInput = getByTestId("search-input");
    fireEvent.changeText(searchInput, "bitcoin");

    // Check if the search value is passed to CurrencyList
    const currencyList = getByTestId("currency-list");
    expect(currencyList.props.search).toBe("bitcoin");
  });

  it("clears search when clear button is pressed", () => {
    const { getByTestId } = render(<HomeScreen />);

    // First set a search value
    const searchInput = getByTestId("search-input");
    fireEvent.changeText(searchInput, "bitcoin");

    // Then clear it
    const clearButton = getByTestId("clear-search");
    fireEvent.press(clearButton);

    // Check if the search value is cleared
    const currencyList = getByTestId("currency-list");
    expect(currencyList.props.search).toBe("");
  });

  it("shows action bottom sheet when icon button is pressed", () => {
    const { getByTestId } = render(<HomeScreen />);

    // Initially, bottom sheet should not be visible
    const actionBottomSheet = getByTestId("action-bottom-sheet");
    expect(actionBottomSheet.props.isVisible).toBeFalsy();

    // Press the icon button
    const iconButton = getByTestId("icon-button");
    fireEvent.press(iconButton);

    // Bottom sheet should now be visible
    expect(actionBottomSheet.props.isVisible).toBeTruthy();
  });

  it("hides action bottom sheet when close is called", () => {
    const { getByTestId } = render(<HomeScreen />);

    // First show the bottom sheet
    const iconButton = getByTestId("icon-button");
    fireEvent.press(iconButton);

    // Then close it
    const closeButton = getByTestId("close-bottom-sheet");
    fireEvent.press(closeButton);

    // Bottom sheet should now be hidden
    const actionBottomSheet = getByTestId("action-bottom-sheet");
    expect(actionBottomSheet.props.isVisible).toBeFalsy();
  });

  it("updates filter when FilterSelector triggers a change", () => {
    const { getByTestId } = render(<HomeScreen />);

    // Initially, filter should be 'all'
    const currencyList = getByTestId("currency-list");
    expect(currencyList.props.currencyType).toBe("all");

    // Change filter to 'fiat'
    const fiatFilter = getByTestId("fiat-filter");
    fireEvent.press(fiatFilter);

    // Filter should now be 'fiat'
    expect(currencyList.props.currencyType).toBe("fiat");

    // Change filter to 'crypto'
    const cryptoFilter = getByTestId("crypto-filter");
    fireEvent.press(cryptoFilter);

    // Filter should now be 'crypto'
    expect(currencyList.props.currencyType).toBe("crypto");
  });

  it("handles action complete from bottom sheet", async () => {
    const { getByTestId } = render(<HomeScreen />);

    // Show the bottom sheet
    const iconButton = getByTestId("icon-button");
    fireEvent.press(iconButton);

    // Get the initial filter value
    const initialCurrencyList = getByTestId("currency-list");
    const initialFilter = initialCurrencyList.props.currencyType;

    // Trigger action complete
    const actionCompleteTrigger = getByTestId("action-complete-trigger");
    fireEvent.press(actionCompleteTrigger);

    // Wait for the setTimeout in handleActionComplete
    await waitFor(
      () => {
        const updatedCurrencyList = getByTestId("currency-list");
        expect(updatedCurrencyList.props.currencyType).toBe(initialFilter);
      },
      { timeout: 200 }
    );
  });
});
