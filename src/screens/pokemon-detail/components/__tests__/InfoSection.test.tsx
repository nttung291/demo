import React from 'react';
import { render } from '@testing-library/react-native';
import { InfoSection } from '../InfoSection';
import { Text } from 'react-native';

describe('InfoSection', () => {
  it('renders correctly with title and children', () => {
    const title = 'Test Section';
    const childText = 'Test Content';
    
    const { getByText } = render(
      <InfoSection title={title}>
        <Text>{childText}</Text>
      </InfoSection>
    );

    // Check if the title is rendered
    expect(getByText(title)).toBeTruthy();
    
    // Check if the children are rendered
    expect(getByText(childText)).toBeTruthy();
  });
});
