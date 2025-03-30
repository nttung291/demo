import React, { ReactElement, useCallback, useEffect, useState } from "react";
import { FlashList } from "@shopify/flash-list";
import { ActivityIndicator, RefreshControl } from "react-native";
import { LISTING_LIMIT } from "@helpers";
import { useIsFocused } from "@react-navigation/native";
import _isEmpty from "lodash/isEmpty";
import _debounce from "lodash/debounce";

type Props<T> = {
  items: T[];
  filters: object;
  setItems: (arr: T[]) => void;
  setVisibleItems?: (arr: T[]) => void;
  renderItem: ({ item, index }: { item: T; index: number }) => ReactElement;
  getData: (page: number, limit: number) => Promise<T[]>;
  ListEmptyComponent?: ReactElement;
};

export const PaginationList: React.FC<Props<any>> = ({
  items,
  filters,
  setItems,
  renderItem,
  getData,
  ListEmptyComponent,
}) => {
  const isFocused = useIsFocused();
  const [page, setPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loadMore, setLoadMore] = useState(true);

  const fetchDebounce = useCallback(
    _debounce((page, limit?: number) => {
      fetchData(page, limit);
    }, 800),
    []
  );

  useEffect(() => {
    if (isFocused) {
      fetchData(1, LISTING_LIMIT * page);
      setLoadMore(true);
    }
  }, [isFocused]);

  useEffect(() => {
    setPage(1);
    fetchDebounce(1);
  }, [filters]);

  const fetchData = async (page: number, limit = LISTING_LIMIT) => {
    try {
      const dataArray = await getData(page, limit);
      stopLoadingIndicator();
      if (dataArray.length === 0) {
        setLoadMore(false);
        return;
      }
      if (page === 1) {
        setItems(dataArray);
      } else {
        setItems([...items, ...dataArray]);
      }
    } catch (err) {
      stopLoadingIndicator();
    }
  };

  const stopLoadingIndicator = () => {
    setIsLoadingMore(false);
    setIsRefreshing(false);
  };

  const handleLoadMore = () => {
    if (!isRefreshing && !isLoadingMore && !_isEmpty(items) && loadMore) {
      fetchData(page + 1);
      setPage(page + 1);
      setIsLoadingMore(true);
    }
  };

  const handleRefresh = () => {
    if (!isRefreshing && !isLoadingMore) {
      setPage(1);
      fetchData(1);
      setIsRefreshing(true);
    }
  };

  return (
    <FlashList
      data={items}
      keyExtractor={(item) => item?.invoiceId}
      renderItem={renderItem}
      estimatedItemSize={100}
      showsVerticalScrollIndicator={false}
      onEndReachedThreshold={0.5}
      onEndReached={handleLoadMore}
      ListFooterComponent={() => {
        if (!isLoadingMore || isRefreshing) return null;
        return <ActivityIndicator />;
      }}
      ListEmptyComponent={() => {
        if (!ListEmptyComponent || isRefreshing) return null;
        return ListEmptyComponent;
      }}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing && !isLoadingMore}
          onRefresh={handleRefresh}
        />
      }
    />
  );
};
