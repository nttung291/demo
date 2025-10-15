import React from "react";
import { render, waitFor, act } from "@testing-library/react-native";
import { CurrencyList } from "../../src/screens/home/components/CurrencyList";
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
    getCurrencies: jest.fn().mockReturnValue([
      { id: "BTC", name: "Bitcoin", symbol: "BTC" },
      { id: "ETH", name: "Ethereum", symbol: "ETH" },
      { id: "USD", name: "US Dollar", symbol: "$", code: "USD" },
    ]) as MockedFunction<(type?: string, searchTerm?: string) => any[]>,
  },
}));

describe("CurrencyList Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with default props", async () => {
    const { getByTestId } = render(<CurrencyList />);

    // Wait for the component to finish loading
    await waitFor(() => {
      expect(realmService.initialize).toHaveBeenCalled();
      expect(realmService.getCurrencies).toHaveBeenCalledWith("all", undefined);
    });

    // Check if FlashList is rendered
    expect(getByTestId("currency-list")).toBeTruthy();
  });

  it("filters currencies based on currencyType", async () => {
    const { rerender } = render(<CurrencyList currencyType="all" />);

    await waitFor(() => {
      expect(realmService.getCurrencies).toHaveBeenCalledWith("all", undefined);
    });

    // Test with fiat filter
    rerender(<CurrencyList currencyType="fiat" />);
    await waitFor(() => {
      expect(realmService.getCurrencies).toHaveBeenCalledWith(
        "fiat",
        undefined
      );
    });

    // Test with crypto filter
    rerender(<CurrencyList currencyType="crypto" />);
    await waitFor(() => {
      expect(realmService.getCurrencies).toHaveBeenCalledWith(
        "crypto",
        undefined
      );
    });
  });

  it("passes search term to getCurrencies", async () => {
    const { rerender } = render(<CurrencyList search="bitcoin" />);

    await waitFor(() => {
      expect(realmService.getCurrencies).toHaveBeenCalledWith("all", "bitcoin");
    });

    // Test with different search term
    rerender(<CurrencyList search="eth" />);
    await waitFor(() => {
      expect(realmService.getCurrencies).toHaveBeenCalledWith("all", "eth");
    });
  });

  it("combines search and filter correctly", async () => {
    const { rerender } = render(
      <CurrencyList currencyType="crypto" search="bitcoin" />
    );

    await waitFor(() => {
      expect(realmService.getCurrencies).toHaveBeenCalledWith(
        "crypto",
        "bitcoin"
      );
    });

    // Change both filter and search
    rerender(<CurrencyList currencyType="fiat" search="dollar" />);
    await waitFor(() => {
      expect(realmService.getCurrencies).toHaveBeenCalledWith("fiat", "dollar");
    });
  });

  it("handles refresh correctly", async () => {
    const { getByTestId } = render(<CurrencyList />);

    await waitFor(() => {
      expect(realmService.initialize).toHaveBeenCalled();
    });

    // Trigger refresh
    const flashList = getByTestId("currency-list");
    await act(async () => {
      flashList.props.onRefresh();
    });

    // Check if realmService methods were called again
    await waitFor(() => {
      expect(realmService.initialize).toHaveBeenCalledTimes(2);
      expect(realmService.getCurrencies).toHaveBeenCalledTimes(2);
    });
  });
});
