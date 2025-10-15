// __mocks__/realm.js

// Create a proper mock class for Realm.Object
class MockObject {}

// Create a mock realm instance that will be returned by Realm.open
const mockRealmInstance = {
  objects: jest.fn().mockReturnValue({
    filtered: jest.fn().mockReturnThis(),
  }),
  write: jest.fn((callback) => callback()),
  create: jest.fn(),
  delete: jest.fn(),
  close: jest.fn(),
};

// Create the Realm constructor function
const Realm = jest.fn(() => mockRealmInstance);

// Add static properties to Realm
Realm.Object = MockObject;
Realm.UpdateMode = {
  Modified: 'modified',
};

// Add open method to Realm
Realm.open = jest.fn().mockResolvedValue(mockRealmInstance);

// Export as both default and named export
module.exports = Realm;
module.exports.default = Realm;
module.exports.Realm = Realm;