import React, { ComponentProps } from "react";
import { Image as ExpoImage } from "expo-image";

export type ImageProps = {} & ComponentProps<typeof ExpoImage>;

export const Image = ({ source, ...props }: ImageProps): JSX.Element => {
  return (
    <ExpoImage source={source} {...props} resizeMode="contain"></ExpoImage>
  );
};
