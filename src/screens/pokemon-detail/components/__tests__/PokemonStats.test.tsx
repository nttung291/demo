import React from 'react';
import { render } from '@testing-library/react-native';
import { PokemonStats } from '../PokemonStats';
import { mockPokemonDetail } from './test-utils';

describe('PokemonStats', () => {
  it('renders correctly with stats data', () => {
    const { getByTestId, getAllByTestId } = render(
      <PokemonStats stats={mockPokemonDetail.stats} />
    );

    // Check if the stats container is rendered
    expect(getByTestId('stats-container')).toBeTruthy();
    
    // Check if all stat bars are rendered
    const statBars = getAllByTestId(/stat-bar-\d+/);
    expect(statBars.length).toBe(mockPokemonDetail.stats.length);
    
    // Check specific stat values
    const statRows = getAllByTestId(/stat-row-\d+/);
    expect(statRows.length).toBe(mockPokemonDetail.stats.length);
  });

  it('returns null when no stats data is provided', () => {
    const { queryByTestId } = render(<PokemonStats />);
    expect(queryByTestId('stats-container')).toBeNull();
  });
});
