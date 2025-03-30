# E2E Testing with Detox

This project uses [Detox](https://github.com/wix/Detox) for end-to-end testing of the React Native application.

## Setup

Detox has already been configured for this project. The main configuration files are:

- `.detoxrc.js` - Main Detox configuration file
- `e2e/jest.config.js` - Jest configuration for Detox tests
- `e2e/jest.setup.js` - Setup file for Jest with Detox

### Prerequisites

Before running tests, make sure you have the following installed:

```bash
# Install applesimutils (required for iOS testing)
brew tap wix/brew
brew install applesimutils
```

## Running Tests

### iOS

```bash
# Build the app for testing
yarn e2e:build:ios

# Run the tests
yarn e2e:test:ios
```

### Android

```bash
# Build the app for testing
yarn e2e:build:android

# Run the tests
yarn e2e:test:android
```

## Test Files

- `login.test.js` - Tests for the Login screen functionality

## Adding New Tests

To add new tests:

1. Create a new test file in the `e2e` directory
2. Add testID attributes to your React Native components for easier selection
3. Use Detox's element selection and matchers to write your tests

## Best Practices

1. Add testID to all components you want to interact with in tests
2. Keep tests focused on user behavior, not implementation details
3. Test the most critical user flows
4. Mock network requests when necessary
5. Dismiss keyboards before tapping buttons that might be covered by the keyboard
   ```javascript
   // Example: Dismiss keyboard after typing in a text input
   await element(by.id('input-field')).typeText('some text');
   await element(by.id('input-field')).tapReturnKey();
   ```
6. When testing form validation, check for the presence of UI elements rather than specific error messages if the error messages are not consistently displayed
7. Use `device.disableKeyboard()` before tests if you want to prevent the keyboard from appearing

## Debugging

If tests are failing, you can debug by:

1. Adding `await device.takeScreenshot('screenshot-name')` at specific points
2. Using `console.log` statements (they will appear in the test output)
3. Running tests with `--loglevel verbose` for more detailed logs

```bash
yarn e2e:test:ios -- --loglevel verbose
```

### Common Issues and Solutions

1. **Element not tappable**: If an element is not tappable because it's covered by the keyboard:
   ```javascript
   // Solution: Dismiss keyboard before tapping
   await element(by.id('input-field')).tapReturnKey();
   ```

2. **Cannot find element by text**: Text matching can be unreliable, especially with formatted text:
   ```javascript
   // Solution: Use testID instead
   await element(by.id('element-id')).tap();
   ```

3. **Test timing out**: If a test is timing out waiting for an element:
   ```javascript
   // Solution: Increase timeout and check element exists first
   await expect(element(by.id('element-id'))).toExist();
   await waitFor(element(by.id('element-id'))).toBeVisible().withTimeout(10000);
   ```
