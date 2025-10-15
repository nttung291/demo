// Mock for realmSchemas.ts
export class CurrencyInfo {
  id: string = '';
  name: string = '';
  symbol: string = '';
  code?: string;

  static schema = {
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
