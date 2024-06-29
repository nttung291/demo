import React from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import FastImage, { Source } from 'react-native-fast-image';

export type ImageBackgroundProps = {
  source: number | Source;
  containerStyle?: StyleProp<ViewStyle>;
};

export const ImageBackground = ({
  source,
  ...props
}: ImageBackgroundProps): JSX.Element => {
  return (
    <FastImage
      resizeMode="cover"
      source={source}
      style={styles.image}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
