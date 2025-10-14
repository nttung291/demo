// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Add any additional configurations here
config.resolver.sourceExts = ['js', 'jsx', 'json', 'ts', 'tsx'];
config.resolver.assetExts = ['png', 'jpg', 'jpeg', 'svg', 'ttf', 'otf'];

// Ensure the entry file is properly resolved
config.resolver.resolverMainFields = ['react-native', 'browser', 'main'];

module.exports = config;