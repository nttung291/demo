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
- `pokemon.test.js` - Tests for the Pokemon list and detail screens

## Adding New Tests

To add new tests:

1. Create a new test file in the `e2e` directory
2. Add testID attributes to your React Native components for easier selection
3. Use Detox's element selection and matchers to write your tests

## Pokemon Tests

The Pokemon tests (`pokemon.test.js`) cover the main user flows in the Pokemon app:

1. **List Screen Tests**
   - Verifying the Pokemon list loads correctly
   - Testing pagination by scrolling to load more Pokemon

2. **Detail Screen Tests**
   - Navigating to the detail screen by tapping a Pokemon
   - Verifying Pokemon details are displayed correctly
   - Checking that Pokemon types are shown
   - Validating that stat bars are displayed

3. **Navigation Tests**
   - Testing navigation between list and detail screens
   - Verifying back navigation works correctly

4. **Device Interaction Tests**
   - Testing device rotation (portrait/landscape)
   - Testing app backgrounding and foregrounding

### Required testIDs

The Pokemon tests rely on the following testIDs being present in your components:

- `pokemon-list` - The main Pokemon list component
- `pokemon-item-{index}` - Individual Pokemon items in the list
- `pokemon-name-{index}` - Pokemon name elements in the list
- `pokemon-detail-scroll` - The ScrollView in the detail screen
- `pokemon-name` - The Pokemon name in the detail screen
- `pokemon-image` - The Pokemon image in the detail screen
- `pokemon-type-{index}` - Type tags in the detail screen
- `stats-container` - Container for stats in the detail screen
- `stat-bar-{index}` - Individual stat bars
- `stat-row-{index}` - Rows containing stat information
- `physical-attributes` - Container for physical attributes
- `abilities-container` - Container for abilities

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
