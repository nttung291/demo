import React from 'react';
import { render } from '@testing-library/react-native';
import { PokemonHeader } from '../PokemonHeader';
import { mockPokemonDetail } from './test-utils';

describe('PokemonHeader', () => {
  it('renders correctly with pokemon data', () => {
    const { getByTestId, getAllByTestId } = render(
      <PokemonHeader pokemonData={mockPokemonDetail} />
    );

    // Check if the image is rendered
    expect(getByTestId('pokemon-image')).toBeTruthy();
    
    // Check if the name is rendered correctly
    expect(getByTestId('pokemon-name').props.children).toBe('Bulbasaur');
    
    // Check if the ID is rendered correctly
    // The ID is rendered as ['#', 1] instead of '#1'
    const idElement = getByTestId('pokemon-id');
    expect(idElement).toBeTruthy();
    // Just check that it contains the correct text
    expect(idElement.props.children[0]).toBe('#');
    expect(idElement.props.children[1]).toBe(1);
    
    // Check if types are rendered correctly
    const typeElements = getAllByTestId(/pokemon-type-\d+/);
    expect(typeElements.length).toBe(2);
  });

  it('returns null when no pokemon data is provided', () => {
    const { queryByTestId } = render(<PokemonHeader />);
    // If the component returns null, none of its elements will be in the tree
    expect(queryByTestId('pokemon-image')).toBeNull();
    expect(queryByTestId('pokemon-name')).toBeNull();
    expect(queryByTestId('pokemon-id')).toBeNull();
  });
});
