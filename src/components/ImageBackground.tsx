import React from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { Image } from "./Image";

export type ImageBackgroundProps = {
  source: number | string;
  containerStyle?: StyleProp<ViewStyle>;
};

export const ImageBackground = ({
  source,
  ...props
}: ImageBackgroundProps): JSX.Element => {
  return (
    <Image resizeMode="cover" source={source} style={styles.image} {...props} />
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
