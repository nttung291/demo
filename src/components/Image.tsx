import React, { ComponentProps } from 'react';
import FastImage from 'react-native-fast-image';

export type ImageProps = {} & ComponentProps<typeof FastImage>;

export const Image = ({ source, ...props }: ImageProps): JSX.Element => {
  return (
    <FastImage source={source} {...props} resizeMode="contain"></FastImage>
  );
};
