import { Product } from './product';

export type Order = {
  id: string;
  note: string;
  products: Product[];
};
