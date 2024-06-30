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

## Screenshots

![Simulator Screenshot - iPhone 15 Pro - 2024-06-30 at 16 23 28](https://github.com/nttung291/demo/assets/29893869/654d6009-6d9d-4eb2-9e27-47bf434c2b02)
![Screenshot_20240630_173725](https://github.com/nttung291/demo/assets/29893869/a29de716-36d0-444c-97f4-5f013ff1c89d)


