import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { FilterSelector } from "../../src/screens/home/components/FilterSelector";
import { CurrencyFilterType } from "../../src/types";

describe("FilterSelector Component", () => {
  const mockOnFilterChange = jest.fn();

  beforeEach(() => {
    mockOnFilterChange.mockClear();
  });

  it("renders correctly with default props", () => {
    const { getByText } = render(
      <FilterSelector
        selectedFilter="all"
        onFilterChange={mockOnFilterChange}
      />
    );

    expect(getByText("All")).toBeTruthy();
    expect(getByText("Fiat")).toBeTruthy();
    expect(getByText("Crypto")).toBeTruthy();
  });

  it("calls onFilterChange when a filter is pressed", () => {
    const { getByText } = render(
      <FilterSelector
        selectedFilter="all"
        onFilterChange={mockOnFilterChange}
      />
    );

    // Press the "Fiat" filter
    fireEvent.press(getByText("Fiat"));
    expect(mockOnFilterChange).toHaveBeenCalledWith("fiat");

    // Press the "Crypto" filter
    fireEvent.press(getByText("Crypto"));
    expect(mockOnFilterChange).toHaveBeenCalledWith("crypto");

    // Press the "All" filter
    fireEvent.press(getByText("All"));
    expect(mockOnFilterChange).toHaveBeenCalledWith("all");
  });

  it("handles all filter types correctly", () => {
    const filterTypes: CurrencyFilterType[] = ["all", "fiat", "crypto"];

    filterTypes.forEach((filterType) => {
      const { getByText } = render(
        <FilterSelector
          selectedFilter={filterType}
          onFilterChange={mockOnFilterChange}
        />
      );

      fireEvent.press(
        getByText(
          filterType === "all"
            ? "All"
            : filterType === "fiat"
            ? "Fiat"
            : "Crypto"
        )
      );
      expect(mockOnFilterChange).toHaveBeenCalledWith(filterType);
    });
  });
});
