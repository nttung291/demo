// Mock React Navigation
jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: jest.fn(),
      goBack: jest.fn(),
      setOptions: jest.fn(),
      addListener: jest.fn(),
      dispatch: jest.fn(),
      isFocused: jest.fn(() => true),
    }),
    useRoute: () => ({
      params: { pokemonId: '1' },
      name: 'PokemonDetail',
      key: 'test-key',
    }),
    useFocusEffect: jest.fn(),
    useIsFocused: jest.fn(() => true),
  };
});

// Mock React Navigation Stack
jest.mock('@react-navigation/stack', () => {
  return {
    createStackNavigator: () => ({
      Navigator: 'Navigator',
      Screen: 'Screen',
    }),
  };
});

// Mock the LayoutContainer component
jest.mock('./src/components/LayoutContainer', () => {
  return {
    LayoutContainer: ({ children, isLoading }) => {
      if (isLoading) {
        return null;
      }
      return children;
    },
  };
});

// Mock the SafeAreaView
jest.mock('react-native-safe-area-context', () => {
  return {
    SafeAreaView: ({ children }) => children,
  };
});

// This is to silence the warnings from react-native-reanimated
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(() => Promise.resolve()),
  getItem: jest.fn(() => Promise.resolve('{}')),
  removeItem: jest.fn(() => Promise.resolve()),
  clear: jest.fn(() => Promise.resolve()),
}));

// Mock environment variables
jest.mock('@env', () => ({
  API_BASE_URL: 'https://pokeapi.co/api/v2',
}));

// Mock react-native-gesture-handler
jest.mock('react-native-gesture-handler', () => ({
  PanGestureHandler: 'PanGestureHandler',
  State: {},
}));

// Mock react-native-reanimated
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

// Set up global fetch mock
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
    ok: true,
    status: 200,
    headers: {
      get: jest.fn(),
      map: {},
    },
  })
);
