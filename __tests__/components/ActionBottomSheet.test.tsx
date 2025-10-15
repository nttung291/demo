import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { ActionBottomSheet } from "../../src/screens/home/components/ActionBottomSheet";
import { realmService } from "../../src/services";

// Define types for mocked functions
type MockedFunction<T extends (...args: any[]) => any> = jest.Mock<
  ReturnType<T>,
  Parameters<T>
>;

// Mock the realmService
jest.mock("../../src/services", () => ({
  realmService: {
    initialize: jest.fn().mockResolvedValue(undefined) as MockedFunction<
      () => Promise<void>
    >,
    clearCurrencies: jest.fn() as MockedFunction<() => void>,
    insertCurrencies: jest.fn() as MockedFunction<
      (currencies: any[]) => Promise<void>
    >,
  },
  cryptoCurrencies: [{ id: "BTC", name: "Bitcoin", symbol: "BTC" }],
  fiatCurrencies: [{ id: "USD", name: "US Dollar", symbol: "$", code: "USD" }],
}));

// Mock the BottomSheet component
jest.mock("@components", () => {
  const React = require("react");
  const { View, Text } = require("react-native");

  const BottomSheet = ({
    isVisible,
    title,
    children,
    onClose,
  }: {
    isVisible: boolean;
    title: string;
    children: React.ReactNode;
    onClose: () => void;
  }) => {
    if (!isVisible) return null;
    return (
      <View>
        <Text>{title}</Text>
        {children}
      </View>
    );
  };

  const ActionButton = ({
    label,
    onPress,
    variant,
  }: {
    label: string;
    onPress: () => void;
    variant?: string;
  }) => {
    return (
      <Text
        testID={`button-${label.replace(/\s+/g, "-").toLowerCase()}`}
        onPress={() => onPress()}
      >
        {label}
      </Text>
    );
  };

  return {
    BottomSheet,
    ActionButton,
  };
});

describe("ActionBottomSheet Component", () => {
  const mockOnClose = jest.fn();
  const mockOnActionComplete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly when visible", () => {
    const { getByText } = render(
      <ActionBottomSheet
        isVisible={true}
        onClose={mockOnClose}
        onActionComplete={mockOnActionComplete}
      />
    );

    expect(getByText("Database Actions")).toBeTruthy();
    expect(getByText("Clear Database")).toBeTruthy();
    expect(getByText("Insert All Data")).toBeTruthy();
  });

  it("does not render when not visible", () => {
    const { queryByText } = render(
      <ActionBottomSheet
        isVisible={false}
        onClose={mockOnClose}
        onActionComplete={mockOnActionComplete}
      />
    );

    expect(queryByText("Database Actions")).toBeNull();
  });

  it("calls clearCurrencies when Clear Database button is pressed", async () => {
    const { getByText } = render(
      <ActionBottomSheet
        isVisible={true}
        onClose={mockOnClose}
        onActionComplete={mockOnActionComplete}
      />
    );

    fireEvent.press(getByText("Clear Database"));
    
    // Wait for the async operation to complete
    await new Promise(resolve => setTimeout(resolve, 0));

    expect(realmService.initialize).toHaveBeenCalled();
    expect(realmService.clearCurrencies).toHaveBeenCalled();
    expect(mockOnClose).toHaveBeenCalled();
    expect(mockOnActionComplete).toHaveBeenCalled();
  });

  it("calls insertCurrencies when Insert All Data button is pressed", async () => {
    const { getByText } = render(
      <ActionBottomSheet
        isVisible={true}
        onClose={mockOnClose}
        onActionComplete={mockOnActionComplete}
      />
    );

    fireEvent.press(getByText("Insert All Data"));
    
    // Wait for the async operation to complete
    await new Promise(resolve => setTimeout(resolve, 0));

    expect(realmService.initialize).toHaveBeenCalled();
    expect(realmService.insertCurrencies).toHaveBeenCalled();
    expect(mockOnClose).toHaveBeenCalled();
    expect(mockOnActionComplete).toHaveBeenCalled();
  });

  it("handles errors correctly", async () => {
    // Mock console.error to test error handling
    const originalConsoleError = console.error;
    console.error = jest.fn() as jest.MockedFunction<typeof console.error>;

    // Mock realmService to throw an error
    (
      realmService.initialize as MockedFunction<() => Promise<void>>
    ).mockRejectedValueOnce(new Error("Test error"));

    const { getByText } = render(
      <ActionBottomSheet
        isVisible={true}
        onClose={mockOnClose}
        onActionComplete={mockOnActionComplete}
      />
    );

    fireEvent.press(getByText("Clear Database"));

    // Wait for the async operation to complete
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(console.error).toHaveBeenCalled();
    expect(mockOnClose).not.toHaveBeenCalled();
    expect(mockOnActionComplete).not.toHaveBeenCalled();

    // Restore console.error
    console.error = originalConsoleError;
  });
});
