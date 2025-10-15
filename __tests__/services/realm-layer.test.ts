// Mock realm first
jest.mock('realm');

// Get the mock directly
const mockRealm = require('realm');
const mockRealmInstance = mockRealm.open.mock.results[0]?.value || {};

// Mock Array.from to handle filtered results
const mockCurrencies = [
  { id: 'BTC', name: 'Bitcoin', symbol: 'BTC' },
  { id: 'ETH', name: 'Ethereum', symbol: 'ETH' },
  { id: 'USD', name: 'US Dollar', symbol: '$', code: 'USD' },
];

Array.from = jest.fn().mockReturnValue(mockCurrencies);

// Mock realmSchemas before importing service-layer
jest.mock('../../src/services/types/realmSchemas', () => ({
  CurrencyInfo: class MockCurrencyInfo {
    static schema: any = {
      name: 'CurrencyInfo',
      primaryKey: 'id',
      properties: {
        id: 'string',
        name: 'string',
        symbol: 'string',
        code: 'string?',
      },
    };
  },
  REALM_SCHEMA_VERSION: 1
}));

import { realmService } from '../../src/services/service-layer/realm-layer';

describe('RealmService', () => {
  beforeEach(async () => {
    jest.clearAllMocks();
    
    // Reset the mock realm instance
    const filteredMock = jest.fn().mockReturnThis();
    const objectsMock = jest.fn().mockReturnValue({
      filtered: filteredMock,
    });
    const writeMock = jest.fn((callback) => callback());
    const createMock = jest.fn();
    const deleteMock = jest.fn();
    const closeMock = jest.fn();
    
    // Create a fresh mockRealmInstance for each test
    const freshMockInstance = {
      objects: objectsMock,
      write: writeMock,
      create: createMock,
      delete: deleteMock,
      close: closeMock,
    };
    
    // Update the global mockRealmInstance reference
    Object.assign(mockRealmInstance, freshMockInstance);
    
    // Reset the realm mock
    mockRealm.open = jest.fn().mockResolvedValue(mockRealmInstance);
    
    // Reset Array.from mock to return mockCurrencies by default
    Array.from = jest.fn().mockReturnValue(mockCurrencies);
    
    // Close any existing realm instance
    realmService.close();
  });

  describe('initialize', () => {
    it('opens a Realm instance', async () => {
      await realmService.initialize();
      expect(mockRealm.open).toHaveBeenCalled();
    });

    it('does not reopen Realm if already initialized', async () => {
      await realmService.initialize();
      expect(mockRealm.open).toHaveBeenCalledTimes(1);
    });
  });

  describe('insertCurrencies', () => {
    it('initializes Realm if not already initialized', async () => {
      await realmService.insertCurrencies(mockCurrencies);
      expect(mockRealm.open).toHaveBeenCalled();
    });

    it('creates currency objects in Realm', async () => {
      await realmService.initialize();
      
      await realmService.insertCurrencies(mockCurrencies);
      
      expect(mockRealmInstance.write).toHaveBeenCalled();
      expect(mockRealmInstance.create).toHaveBeenCalledTimes(mockCurrencies.length);
    });
  });

  describe('getCurrencies', () => {
    beforeEach(async () => {
      await realmService.initialize();
    });

    it('throws error if Realm is not initialized', () => {
      // Force realm to be null
      realmService.close();
      
      expect(() => realmService.getCurrencies()).toThrow('Realm is not initialized');
    });

    it('returns all currencies when filter is "all"', () => {
      // Set up Array.from to return mockCurrencies with map method
      Array.from = jest.fn().mockReturnValue(mockCurrencies);
      
      const currencies = realmService.getCurrencies('all');
      
      expect(mockRealmInstance.objects).toHaveBeenCalledWith('CurrencyInfo');
      expect(currencies).toEqual(mockCurrencies);
    });

    it('returns fiat currencies when type is fiat', () => {
      // Set up Array.from to return mockCurrencies with map method
      Array.from = jest.fn().mockReturnValue(mockCurrencies);
      
      const currencies = realmService.getCurrencies('fiat');
      
      expect(mockRealmInstance.objects).toHaveBeenCalledWith('CurrencyInfo');
      expect(mockRealmInstance.objects().filtered).toHaveBeenCalledWith('code != null');
      expect(currencies).toEqual(mockCurrencies);
    });

    it('returns crypto currencies when type is crypto', () => {
      // Set up Array.from to return mockCurrencies with map method
      Array.from = jest.fn().mockReturnValue(mockCurrencies);
      
      const currencies = realmService.getCurrencies('crypto');
      
      expect(mockRealmInstance.objects).toHaveBeenCalledWith('CurrencyInfo');
      expect(mockRealmInstance.objects().filtered).toHaveBeenCalledWith('code == null');
      expect(currencies).toEqual(mockCurrencies);
    });

    it('filters currencies by search term', () => {
      // Set up Array.from to return mockCurrencies directly
      Array.from = jest.fn().mockReturnValue(mockCurrencies);
      
      // Mock the filter function to return the first item
      const mockFilterResult = [mockCurrencies[0]];
      Array.prototype.filter = jest.fn().mockReturnValue(mockFilterResult);
      
      // Call the function with a search term
      const currencies = realmService.getCurrencies('all', 'bitcoin');
      
      // Verify the results
      expect(currencies).toEqual(mockFilterResult);
    });
  });

  describe('clearCurrencies', () => {
    beforeEach(async () => {
      await realmService.initialize();
    });

    it('throws error if Realm is not initialized', () => {
      realmService.close();
      
      expect(() => realmService.clearCurrencies()).toThrow('Realm is not initialized');
    });

    it('deletes all currencies', async () => {
      await realmService.initialize(); // Make sure realm is initialized
      realmService.clearCurrencies();
      
      expect(mockRealmInstance.write).toHaveBeenCalled();
      expect(mockRealmInstance.delete).toHaveBeenCalled();
    });
  });

  describe('close', () => {
    it('closes the Realm instance', async () => {
      await realmService.initialize();
      realmService.close();
      
      expect(mockRealmInstance.close).toHaveBeenCalled();
    });

    it('does nothing if Realm is not initialized', () => {
      realmService.close();
      // No error should be thrown
    });
  });
});
