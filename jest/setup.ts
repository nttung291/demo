// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(() => Promise.resolve()),
  getItem: jest.fn(() => Promise.resolve(null)),
  removeItem: jest.fn(() => Promise.resolve()),
  clear: jest.fn(() => Promise.resolve()),
}));

// Mock Realm - using the mock file in __mocks__/realm.js
jest.mock('realm');

// Mock React Navigation
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
  }),
  useRoute: () => ({
    params: {},
  }),
}));

// Mock Expo Constants
jest.mock('expo-constants', () => ({
  expoConfig: {
    extra: {
      apiUrl: 'https://mock-api.example.com',
    },
  },
}));

// Mock FlashList
jest.mock('@shopify/flash-list', () => {
  const React = require('react');
  const MockFlashList = ({ children, testID, ...props }: { children?: React.ReactNode; testID?: string; [key: string]: any }) => {
    return React.createElement('View', { testID: testID || 'currency-list', ...props }, children);
  };
  return { FlashList: MockFlashList };
});

// Mock BottomSheet
jest.mock('@gorhom/bottom-sheet', () => {
  const React = require('react');
  const MockBottomSheet = ({ children, ...props }: { children?: React.ReactNode; [key: string]: any }) => {
    return React.createElement('View', props, children);
  };
  const MockBottomSheetView = ({ children, ...props }: { children?: React.ReactNode; [key: string]: any }) => {
    return React.createElement('View', props, children);
  };
  const MockBottomSheetBackdrop = (props: { [key: string]: any }) => {
    return React.createElement('View', props);
  };
  
  return {
    __esModule: true,
    default: MockBottomSheet,
    BottomSheetView: MockBottomSheetView,
    BottomSheetBackdrop: MockBottomSheetBackdrop,
  };
});

