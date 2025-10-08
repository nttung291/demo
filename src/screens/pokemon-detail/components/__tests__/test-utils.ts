/**
 * This file is not a test file, it's just a utility file for tests.
 * We're adding this comment to make it clear.
 */

import { mockPokemonDetail } from '../../__tests__/test-utils';

// Add a dummy test to avoid Jest warnings about empty test files
describe('test-utils', () => {
  it('should export mockPokemonDetail', () => {
    expect(mockPokemonDetail).toBeDefined();
  });
});

export { mockPokemonDetail };
