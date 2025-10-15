## DemoApp

Currently includes:

- React Native
- React Navigation
- Expo
- Redux
- TypeScript
- And more!

## Quick Start

From the command line in your generated app's root directory, enter `yarn`

From the demo/ios folder, enter `pod install`

The Demo project's structure will look similar to this:

```
demo
├── src
│   ├── assets
│   ├── components
│   ├── context
│   ├── helpers
│   ├── navigators
│   ├── screens
│   ├── services
│   ├── storage
│   ├── theme
│   ├── app.tsx
├── README.md
├── index.js
├── test
├── .env
└── package.json

```

**assets**
This is where your app assets will live.

**components**
This is where your React components will live. Each component will have a directory containing the `.tsx` file, along with a story file, and optionally `.presets`, and `.props` files for larger components. The app will come with some commonly used components like Button.

**navigators**
This is where your `react-navigation` navigators will live.

**context**
This is where your context api will live. Each Context will have a directory containing the `.tsx` file.

**screens**
This is where your screen components will live. A screen is a React component which will take up the entire screen and be part of the navigation hierarchy. Each screen will have a directory containing the `.tsx` file, along with any assets or other helper files.

**services**
Any services that interface with the outside world will live here (think REST APIs, Push Notifications, etc.).

**theme**
Here lives the theme for your application, including spacing, colors, and typography.

**helpers**
This is a great place to put miscellaneous helpers and utilities. Things like date helpers, formatters, etc. are often found here. However, it should only be used for things that are truely shared across your application. If a helper or utility is only used by a specific component or model, consider co-locating your helper with that component or model.

**app.tsx** This is the entry point to your app. This is where you will find the main App component which renders the rest of the application.

## Running IOS

From the command line in your generated app's root directory, enter `yarn ios`

## Running Android

From the command line in your generated app's root directory, enter `yarn android`

## Testing

### Unit Tests

This project uses Jest for unit testing. To run the unit tests, use the following command:

```bash
yarn test
```

Unit tests are located in the `__tests__` directory and follow the naming convention `*.test.tsx` or `*.test.ts`.

#### Test Structure

- `__tests__/components/` - Tests for individual components
- `__tests__/screens/` - Tests for screen components
- `__tests__/services/` - Tests for services

### E2E Tests

This project uses Detox for end-to-end testing. To run the E2E tests, follow these steps:

1. Install Detox CLI globally:

```bash
npm install -g detox-cli
```

2. Build the app for testing:

```bash
detox build --configuration ios.sim.debug
```

3. Run the tests:

```bash
detox test --configuration ios.sim.debug
```

E2E tests are located in the `e2e` directory.

#### Test Structure

- `e2e/homeScreen.test.js` - Tests for the home screen
- `e2e/currencyList.test.js` - Tests for the currency list functionality
- `e2e/actionBottomSheet.test.js` - Tests for the action bottom sheet

### Test Coverage

To generate a test coverage report, run:

```bash
yarn test --coverage
```

The coverage report will be available in the `coverage` directory.
