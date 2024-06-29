import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';
import { isEmpty as _isEmpty, get as _get } from 'lodash';
import { Order } from '@types';

export type OrderContextType = {
  orders: Order[];
  setOrders: Dispatch<SetStateAction<Order[]>>;
  clearOders: () => void;
};

const defaultContext: OrderContextType = {
  orders: [],
  setOrders: () => {},
  clearOders: () => {},
};

export const OrderContext = createContext(defaultContext);
export const useOrderContext = () => useContext(OrderContext);

export function useOrderContextStore(): OrderContextType {
  const [orders, setOrders] = useState<Order[]>([]);

  const clearOders = () => setOrders([]);

  return {
    orders,
    setOrders,
    clearOders,
  };
}

interface AuxProps {
  children: React.ReactNode;
}

export function OrderContextContainer({ children }: AuxProps) {
  const context = useContext(OrderContext);
  const data = useOrderContextStore();

  return (
    <OrderContext.Provider {...context} value={data}>
      {children}
    </OrderContext.Provider>
  );
}
