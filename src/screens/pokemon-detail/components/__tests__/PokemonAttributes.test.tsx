import React from 'react';
import { render } from '@testing-library/react-native';
import { PokemonAttributes } from '../PokemonAttributes';
import { mockPokemonDetail } from './test-utils';

describe('PokemonAttributes', () => {
  it('renders correctly with attributes data', () => {
    const { getByTestId, getByText } = render(
      <PokemonAttributes 
        height={mockPokemonDetail.height}
        weight={mockPokemonDetail.weight}
        baseExperience={mockPokemonDetail.base_experience}
      />
    );

    // Check if the attributes container is rendered
    expect(getByTestId('physical-attributes')).toBeTruthy();
    
    // Check if height is rendered correctly (7/10 = 0.7m)
    expect(getByText('0.7 m')).toBeTruthy();
    
    // Check if weight is rendered correctly (69/10 = 6.9kg)
    expect(getByText('6.9 kg')).toBeTruthy();
    
    // Check if base experience is rendered correctly
    expect(getByText('64')).toBeTruthy();
  });

  it('renders placeholder values when no data is provided', () => {
    const { getByText } = render(<PokemonAttributes />);
    
    expect(getByText('? m')).toBeTruthy();
    expect(getByText('? kg')).toBeTruthy();
    expect(getByText('?')).toBeTruthy();
  });
});
