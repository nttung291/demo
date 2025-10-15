import { Realm } from 'realm';

export class CurrencyInfo extends Realm.Object<CurrencyInfo> {
  id!: string;
  name!: string;
  symbol!: string;
  code?: string;

  static schema: Realm.ObjectSchema = {
    name: 'CurrencyInfo',
    primaryKey: 'id',
    properties: {
      id: 'string',
      name: 'string',
      symbol: 'string',
      code: 'string?',
    },
  };
}

export const REALM_SCHEMA_VERSION = 1;
