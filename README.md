# Pokemon Explorer App

A React Native application that retrieves and displays Pokemon data from the PokeAPI. The app showcases best practices in mobile development with a focus on clean code, maintainability, and testability.

## Features

- Browse a paginated list of Pokemon
- View detailed information about each Pokemon
- Persistent data storage with Redux Persist
- Error handling and retry mechanisms
- Unit tests with over 60% code coverage
- Component-level unit tests for better maintainability
- End-to-end tests with Detox

## Tech Stack

- React Native 0.74.5
- TypeScript for type safety
- Redux Toolkit for state management
- RTK Query for API data fetching with caching
- React Navigation for screen navigation
- Jest and React Testing Library for unit testing
- Detox for end-to-end testing

## Project Structure

The project follows a clean, modular architecture:

```
demo
├── src
│   ├── screens
│   │   └── pokemon
│   │       ├── PokemonListScreen.tsx - Displays paginated list of Pokemon
│   │       ├── components/ - Reusable components for Pokemon list
│   │       └── __tests__ - Unit tests for Pokemon list screen
│   │   └── pokemon-detail
│   │       ├── index.tsx - Shows detailed Pokemon information
│   │       ├── components/ - Component-based architecture for details
│   │       │   ├── PokemonHeader.tsx - Pokemon image, name, and types
│   │       │   ├── PokemonStats.tsx - Pokemon stats with visual bars
│   │       │   ├── PokemonAttributes.tsx - Physical attributes display
│   │       │   ├── PokemonAbilities.tsx - Pokemon abilities list
│   │       │   └── __tests__ - Unit tests for each component
│   │       └── __tests__ - Integration tests for Pokemon detail screen
│   ├── services
│   │   └── pokemonApi.ts - RTK Query API service for PokeAPI
│   ├── navigators - Navigation configuration
│   ├── state - Redux store setup
│   └── types - TypeScript type definitions
├── scripts
│   └── set-api-url.js - Script to configure API base URL
└── POKEMON_README.md - This file
```

## Getting Started

### Prerequisites

- Node.js 14 or higher
- Yarn or npm
- React Native development environment set up

### Installation

1. Clone the repository
   ```bash
   git clone <repository-url>
   cd demo
   ```

2. Install dependencies
   ```bash
   yarn install
   ```

3. Install iOS dependencies (macOS only)
   ```bash
   yarn pod-install
   ```

### Running the App

#### With default PokeAPI URL

```bash
# Start the Metro bundler with default PokeAPI URL
yarn start:pokemon

# Run on iOS
yarn ios

# Run on Android
yarn android
```

#### With custom API URL

```bash
# Start the Metro bundler with custom API URL
API_URL=https://your-custom-api.com/api/v2 yarn start:pokemon:custom

# Run on iOS
yarn ios

# Run on Android
yarn android
```

## Testing

### Running Unit Tests

```bash
# Run all tests
yarn test

# Run tests with coverage report
yarn test:coverage

# Run tests for a specific component
yarn test PokemonHeader
```

### Running End-to-End Tests

```bash
# Build for iOS E2E testing
yarn e2e:build:ios

# Run E2E tests on iOS
yarn e2e:test:ios

# Build for Android E2E testing
yarn e2e:build:android

# Run E2E tests on Android
yarn e2e:test:android
```

### Test Coverage

The project aims for at least 60% code coverage across:
- Branches
- Functions
- Lines
- Statements

### Test Structure

#### Unit Tests
- **Screen Tests**: Test the main screen components
- **Component Tests**: Test individual UI components in isolation
- **API Tests**: Test the RTK Query service layer

#### E2E Tests
- **User Flow Tests**: Test complete user journeys through the app
- **Navigation Tests**: Test navigation between screens
- **Data Loading Tests**: Test loading and pagination behavior

## API Integration

The app integrates with the [PokeAPI](https://pokeapi.co/), a RESTful Pokemon API. The following endpoints are used:

- `GET /pokemon` - Retrieves a paginated list of Pokemon
- `GET /pokemon/{id}` - Retrieves detailed information about a specific Pokemon

## Code Quality

The codebase follows best practices for:

- **Code Separation**: Clear separation of concerns between UI components, business logic, and data fetching
- **Clean Code**: Meaningful variable names, consistent formatting, and proper error handling
- **Readability**: Well-structured components with clear responsibilities
- **Maintainability**: Modular architecture that makes it easy to extend and modify

## App Screens

<img width="1206" height="2622" alt="Simulator Screenshot - iPhone 16 Pro - 2025-10-09 at 02 21 56" src="https://github.com/user-attachments/assets/9d5876a9-e1e4-4418-baf2-d9923686cb65" />
<img width="1206" height="2622" alt="Simulator Screenshot - iPhone 16 Pro - 2025-10-09 at 02 21 52" src="https://github.com/user-attachments/assets/a31880af-d4c4-4c13-b812-96d1548f238f" />

## License

This project is licensed under the MIT License.
