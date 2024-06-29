import React, { useState } from "react";
import { LayoutContainer, SearchBar } from "@components";
import { TokenList } from "./components/TokenList";
import _get from "lodash/get";

export const HomeScreen: React.FunctionComponent = () => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <LayoutContainer>
      <SearchBar
        onChangeText={(text) => setSearchValue(text)}
        value={searchValue}
        onClearPress={() => setSearchValue("")}
      />
      <TokenList search={searchValue} />
    </LayoutContainer>
  );
};
