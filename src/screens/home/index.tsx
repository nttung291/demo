import React, { useState } from "react";
import { View } from "react-native";
import {
  Button,
  LayoutContainer,
  PaginationList,
  SearchBar,
} from "@components";
import { useLazyGetInvoicesQuery } from "@services";
import { deleteKeychainItem, Ordering, SortBy } from "@helpers";
import { setAuthenticated, useAppDispatch } from "@state";
import { InvoiceResponse } from "@types";
import { InvoiceItem } from "./components/InvoiceItem";
import styles from "./styles";
import { FilterModal } from "./components/FilterModal";
import { navigate, ScreenNavigatorKeys } from "@navigators";

type Options = {
  sortBy?: string;
  ordering?: string;
  keyword?: string;
};

export const HomeScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const [items, setItems] = useState<InvoiceResponse[]>([]);
  const [visible, setVisible] = useState(false);
  const [options, setOptions] = useState<Options>({
    keyword: "",
    ordering: Ordering.DES,
    sortBy: SortBy.CREATED_DATE,
  });

  const [getInvoices] = useLazyGetInvoicesQuery();

  const fetchInvoices = async (page: number, limit: number) => {
    const response = await getInvoices({
      pageNum: page,
      pageSize: limit,
      ...options,
    });
    return response?.data ?? [];
  };

  const onLogoutPress = async () => {
    await deleteKeychainItem();
    dispatch(setAuthenticated(false));
  };

  const onNewInvoicePress = () => {
    navigate(ScreenNavigatorKeys.NewInvoice);
  };

  const onOptionsChange = (options: Options) => {
    setOptions((prev) => ({
      ...prev,
      ...options,
    }));
  };

  return (
    <LayoutContainer>
      <View style={styles.container}>
        <FilterModal
          visible={visible}
          setVisible={setVisible}
          onSetFilter={(sortBy, ordering) => setOptions({ sortBy, ordering })}
        />
        <View style={styles.filterContainer}>
          <SearchBar
            onChangeText={(text) =>
              onOptionsChange({
                keyword: text,
              })
            }
            value={options?.keyword || ""}
          />
          <Button mode="text" type="small" onPress={() => setVisible(true)}>
            Filter
          </Button>
        </View>
        <PaginationList
          items={items}
          filters={options}
          setItems={setItems}
          renderItem={({ item }) => <InvoiceItem item={item} />}
          getData={fetchInvoices}
        />
        <Button mode="text" onPress={onNewInvoicePress}>
          Create new invoice
        </Button>
        <Button mode="text" onPress={onLogoutPress}>
          Logout
        </Button>
      </View>
    </LayoutContainer>
  );
};
