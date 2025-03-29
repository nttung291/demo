module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["module:metro-react-native-babel-preset"],
    plugins: [
      ["@babel/plugin-transform-private-methods", { "loose": true }],
      [
        "module-resolver",
        {
          root: ['.'],
          extensions: [
            '.ios.ts',
            '.android.ts',
            '.ts',
            '.ios.tsx',
            '.android.tsx',
            '.tsx',
            '.jsx',
            '.js',
            '.json',
          ],
          alias: {
            // This needs to be mirrored in tsconfig.json
            "@screens": ["./src/screens"],
            "@components": ["./src/components"],
            "@helpers": ["./src/helpers"],
            "@navigators": ["./src/navigators"],
            "@state": ["./src/state"],
            "@theme": ["./src/theme"],
            "@context": ["./src/context"],
            "@assets": ["./src/assets"],
            "@services": ["./src/services"],
          },
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};
