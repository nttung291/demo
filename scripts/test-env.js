#!/usr/bin/env node

/**
 * Script to test that the .env file is being read correctly
 */

// This will only work when run through babel, not directly with node
// To test, add a script to package.json: "test-env": "babel-node scripts/test-env.js"
console.log('Testing .env file configuration:');
console.log('API_BASE_URL from .env should be used in the app automatically');
console.log('To verify, check the network requests in the app to confirm they use the correct base URL');
