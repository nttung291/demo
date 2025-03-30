## DemoApp

A modern React Native application showcasing best practices in mobile development.

Currently includes:

- React Native (0.74.5)
- React Navigation (Stack, Bottom Tabs, Native)
- Redux with Redux Toolkit for state management
- TypeScript for type safety
- Form handling with Formik and Yup validation
- API integration with Axios and GraphQL
- Secure storage with Keychain
- Performance optimized with FlashList
- Automated UI testing with Detox
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

The project includes both unit tests and end-to-end (E2E) UI tests.

### Unit Testing

Unit tests are written using Jest. Run the tests with:

```bash
yarn test
```

### End-to-End Testing with Detox

The project uses Detox for automated UI testing. Detox allows you to write and execute UI tests that simulate real user interactions.

#### Prerequisites

Before running Detox tests, make sure you have the following installed:

```bash
# For iOS testing
brew tap wix/brew
brew install applesimutils
```

#### Running E2E Tests

For iOS:

```bash
# Build the app for testing
yarn e2e:build:ios

# Run the tests
yarn e2e:test:ios
```

For Android:

```bash
# Build the app for testing
yarn e2e:build:android

# Run the tests
yarn e2e:test:android
```

#### Test Structure

E2E tests are located in the `e2e` directory:

- `e2e/login.test.js` - Tests for the Login screen functionality
- `e2e/jest.setup.js` - Setup file for Jest with Detox
- `e2e/jest.config.js` - Jest configuration for Detox tests

For more detailed information about Detox testing in this project, see the [e2e/README.md](./e2e/README.md) file.

## Project Structure

