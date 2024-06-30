import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Token } from "@types";
import {
  useGetV2CryptocurrencyQuotesQuery,
  useLazyGetV1CryptocurrencyListingsQuery,
} from "@services";
import { PaginationList } from "@components";
import { TokenItem } from "./TokenItem";
import _isEmpty from "lodash/isEmpty";
import _debounce from "lodash/debounce";
import _includes from "lodash/includes";

type Props = {
  search?: string;
};

export const TokenList: React.FC<Props> = ({ search }) => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [searchedTokens, setSearchedTokens] = useState<Token[]>([]);
  const [shouldUpdatePrices, setShouldUpdatePrices] = useState<boolean>(false);
  const [visibleItems, setVisibleItems] = useState<Token[]>([]);

  const visibleIds = useMemo(
    () => visibleItems?.map((item) => item.id).join(","),
    [visibleItems]
  );

  const [getV1CryptocurrencyListings] =
    useLazyGetV1CryptocurrencyListingsQuery();

  const {
    data: priceTokens,
    isFetching,
    isSuccess,
  } = useGetV2CryptocurrencyQuotesQuery(
    { id: visibleIds },
    {
      skip: _isEmpty(visibleItems),
      pollingInterval: 60000,
    }
  );

  useEffect(() => {
    if (isFetching) {
      setShouldUpdatePrices(true);
    }
  }, [isFetching]);

  useEffect(() => {
    if (
      isSuccess &&
      priceTokens &&
      shouldUpdatePrices &&
      !_isEmpty(tokens) &&
      !_isEmpty(priceTokens)
    ) {
      const updatedTokens = tokens.map((item) => {
        const updatedItem = priceTokens[`${item.id}`];
        if (updatedItem) {
          return {
            ...item,
            quote: updatedItem.quote,
          };
        }
        return item;
      });
      setShouldUpdatePrices(false);
      setTokens(updatedTokens);
    }
  }, [tokens, priceTokens, shouldUpdatePrices, isSuccess]);

  useEffect(() => {
    debouncedSearchTokens(search);
  }, [search]);

  const debouncedSearchTokens = useCallback(
    _debounce((search) => {
      if (!setSearchedTokens) return;
      const filteredTokens = tokens.filter(
        (item) => _includes(item.symbol, search) || _includes(item.name, search)
      );
      setSearchedTokens(filteredTokens);
    }, 800),
    [tokens, setSearchedTokens]
  );

  const fetchCryptocurrencyListings = (start: number, limit: number) => {
    return getV1CryptocurrencyListings({ start, limit });
  };

  return (
    <PaginationList
      items={search ? searchedTokens : tokens}
      setItems={setTokens}
      setVisibleItems={setVisibleItems}
      renderItem={({ item }) => <TokenItem item={item} />}
      getData={fetchCryptocurrencyListings}
    />
  );
};
