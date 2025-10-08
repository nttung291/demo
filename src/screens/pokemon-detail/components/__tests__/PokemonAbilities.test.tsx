import React from 'react';
import { render } from '@testing-library/react-native';
import { PokemonAbilities } from '../PokemonAbilities';
import { mockPokemonDetail } from './test-utils';

describe('PokemonAbilities', () => {
  it('renders correctly with abilities data', () => {
    const { getByTestId, getAllByTestId, getByText } = render(
      <PokemonAbilities abilities={mockPokemonDetail.abilities} />
    );

    // Check if the abilities container is rendered
    expect(getByTestId('abilities-container')).toBeTruthy();
    
    // Check if all ability items are rendered
    const abilityItems = getAllByTestId(/ability-item-\d+/);
    expect(abilityItems.length).toBe(mockPokemonDetail.abilities.length);
    
    // Check the content of abilities by test ID rather than text
    const firstAbility = abilityItems[0];
    const secondAbility = abilityItems[1];
    
    // Verify they exist
    expect(firstAbility).toBeTruthy();
    expect(secondAbility).toBeTruthy();
  });

  it('returns null when no abilities data is provided', () => {
    const { queryByTestId } = render(<PokemonAbilities />);
    expect(queryByTestId('abilities-container')).toBeNull();
  });
});
