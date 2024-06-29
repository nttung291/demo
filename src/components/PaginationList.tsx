import React, {
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { FlashList } from "@shopify/flash-list";
import { ActivityIndicator, RefreshControl } from "react-native";
import { TOKEN_LISTING_LIMIT } from "@helpers";
import _isEmpty from "lodash/isEmpty";
import _get from "lodash/get";
import _debounce from "lodash/debounce";

type Props<T> = {
  items: T[];
  setItems: (arr: T[]) => void;
  setVisibleItems?: (arr: T[]) => void;
  renderItem: ({ item, index }: { item: T; index: number }) => ReactElement;
  getData: (start: number, limit: number) => Promise<unknown>;
  ListEmptyComponent?: ReactElement;
};

export const PaginationList: React.FC<Props<any>> = ({
  items,
  setItems,
  renderItem,
  getData,
  ListEmptyComponent,
  setVisibleItems,
}) => {
  const [start, setStart] = useState(1);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    fetchData(start, false);
  }, []);

  const fetchData = async (start: number, isLoadMore: boolean) => {
    try {
      const response = await getData(start, TOKEN_LISTING_LIMIT);
      const dataArray = _get(response, "data", []);
      if (isLoadMore && dataArray.length > 0) {
        setItems([...items, ...dataArray]);
      } else {
        setItems(dataArray);
      }
      stopLoadingIndicator();
    } catch (err) {
      stopLoadingIndicator();
    }
  };

  const debouncedSetVisibleItems = useCallback(
    _debounce((items) => {
      if (!setVisibleItems) return;
      setVisibleItems(items);
    }, 2000),
    [setVisibleItems]
  );

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: any }) => {
      if (!setVisibleItems) return;
      debouncedSetVisibleItems(
        viewableItems.map((item: { item: any }) => item.item)
      );
    }
  ).current;

  const stopLoadingIndicator = () => {
    setIsLoadMore(false);
    setIsRefreshing(false);
  };

  const handleLoadMore = () => {
    if (!isRefreshing && !isLoadMore && !_isEmpty(items)) {
      fetchData(start + TOKEN_LISTING_LIMIT, true);
      setStart((prevStart) => prevStart + TOKEN_LISTING_LIMIT);
      setIsLoadMore(true);
    }
  };

  const handleRefresh = () => {
    if (!isRefreshing && !isLoadMore) {
      setStart(1);
      fetchData(1, false);
      setIsRefreshing(true);
    }
  };

  return (
    <FlashList
      data={items}
      keyExtractor={(item) => item?.id?.toString()}
      renderItem={renderItem}
      estimatedItemSize={100}
      showsVerticalScrollIndicator={false}
      onEndReachedThreshold={0.5}
      onEndReached={handleLoadMore}
      ListFooterComponent={() => {
        if (!isLoadMore || isRefreshing) return null;
        return <ActivityIndicator />;
      }}
      ListEmptyComponent={() => {
        if (!isRefreshing) {
          return <ActivityIndicator />;
        }
        if (!ListEmptyComponent || isRefreshing) return null;
        return ListEmptyComponent;
      }}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing && !isLoadMore}
          onRefresh={handleRefresh}
        />
      }
      onViewableItemsChanged={onViewableItemsChanged}
    />
  );
};
