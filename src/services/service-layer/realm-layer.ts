import Realm from 'realm';
import { CurrencyFilterType } from '@types';
import { CurrencyInfo, REALM_SCHEMA_VERSION } from '../types/realmSchemas';

export type ICurrencyInfo = {
  id: string;
  name: string;
  symbol: string;
  code?: string;
}

class RealmService {
  private realm: Realm | null = null;

  async initialize(): Promise<void> {
    if (this.realm) {
      return;
    }

    try {
      this.realm = await Realm.open({
        schema: [CurrencyInfo],
        schemaVersion: REALM_SCHEMA_VERSION,
      });
    } catch (error) {
      console.error('Failed to open Realm:', error);
      throw error;
    }
  }

  async insertCurrencies(currencies: ICurrencyInfo[]): Promise<void> {
    if (!this.realm) {
      await this.initialize();
    }

    try {
      this.realm?.write(() => {
        currencies.forEach((currency) => {
          this.realm?.create<CurrencyInfo>(
            'CurrencyInfo',
            {
              id: currency.id,
              name: currency.name,
              symbol: currency.symbol,
              code: currency.code,
            },
            Realm.UpdateMode.Modified
          );
        });
      });
    } catch (error) {
      console.error('Failed to insert currencies:', error);
      throw error;
    }
  }

  getCurrencies(type?: CurrencyFilterType, searchTerm?: string): ICurrencyInfo[] {
    if (!this.realm) {
      throw new Error('Realm is not initialized');
    }

    let currencies: Realm.Results<CurrencyInfo>;

    if (type === 'fiat') {
      currencies = this.realm.objects<CurrencyInfo>('CurrencyInfo').filtered('code != null');
    } else if (type === 'crypto') {
      currencies = this.realm.objects<CurrencyInfo>('CurrencyInfo').filtered('code == null');
    } else {
      currencies = this.realm.objects<CurrencyInfo>('CurrencyInfo');
    }

    let results = Array.from(currencies).map((currency) => ({
      id: currency.id,
      name: currency.name,
      symbol: currency.symbol,
      code: currency.code,
    }));

    if (searchTerm && searchTerm.trim().length > 0) {
      const term = searchTerm.trim().toLowerCase();
      
      results = results.filter(currency => {
        const name = currency.name?.toLowerCase() || '';
        const symbol = currency.symbol?.toLowerCase() || '';
        
        const nameStartsWithTerm = name.startsWith(term);
        
        const nameContainsSpaceTerm = name.includes(' ' + term);
        
        const symbolStartsWithTerm = symbol.startsWith(term);
        
        return nameStartsWithTerm || nameContainsSpaceTerm || symbolStartsWithTerm;
      });
    }

    return results;
  }

  clearCurrencies(): void {
    if (!this.realm) {
      throw new Error('Realm is not initialized');
    }

    try {
      this.realm.write(() => {
        const currencies = this.realm?.objects<CurrencyInfo>('CurrencyInfo');
        this.realm?.delete(currencies);
      });
    } catch (error) {
      console.error('Failed to clear currencies:', error);
      throw error;
    }
  }

  close(): void {
    if (this.realm) {
      this.realm.close();
      this.realm = null;
    }
  }
}

export const realmService = new RealmService();
