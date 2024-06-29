import { Order } from './order';

export type RootStackParamList = {
  Orders: undefined;
  OrderDetail: undefined;
  AddEditOrder: { order: Order; isEdit: boolean };
};
