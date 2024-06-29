import { Platform, StyleProp, StyleSheet, TextStyle } from "react-native";
import React, { ComponentProps, ReactNode, useMemo } from "react";

import { Text } from "react-native-paper";

type TextProps = {
  defaultStyle?: StyleProp<TextStyle>;
  style?: StyleProp<TextStyle>;
  color?: string;
  bold?: boolean;
  underline?: boolean;
  italicize?: boolean;
  children: ReactNode;
} & Omit<ComponentProps<typeof Text>, "style">;

const BaseText = ({
  defaultStyle,
  style,
  color,
  bold,
  underline,
  italicize,
  ...props
}: TextProps): JSX.Element => {
  const customStyle = useMemo<StyleProp<TextStyle>>(() => {
    return [
      defaultStyle,
      {
        color: color || "#FFFFFF",
        textDecorationLine: underline ? "underline" : "none",
      },
      (() => {
        if (Platform.OS === "ios") {
          return {
            fontFamily: "IBM Plex Sans",
            fontStyle: italicize ? "italic" : "normal",
            fontWeight: bold ? "700" : "400",
          };
        }

        if (Platform.OS === "android") {
          if (bold && italicize) {
            return {
              fontFamily: "IBMPlexSans-BoldItalic",
            };
          } else if (bold) {
            return {
              fontFamily: "IBMPlexSans-Bold",
            };
          } else if (italicize) {
            return {
              fontFamily: "IBMPlexSans-Italic",
            };
          } else {
            return {
              fontFamily: "IBMPlexSans-Regular",
            };
          }
        }
      })(),
      style,
    ];
  }, [defaultStyle, color, bold, italicize, underline, style]);

  return <Text style={customStyle} {...props} />;
};

export const H1 = (props: TextProps): JSX.Element => {
  return <BaseText defaultStyle={styles.h1} {...props} />;
};

export const H2 = (props: TextProps): JSX.Element => {
  return <BaseText defaultStyle={styles.h2} {...props} />;
};

export const H3 = (props: TextProps): JSX.Element => {
  return <BaseText defaultStyle={styles.h3} {...props} />;
};

export const H4 = (props: TextProps): JSX.Element => {
  return <BaseText defaultStyle={styles.h4} {...props} />;
};

export const Paragraph = (props: TextProps): JSX.Element => {
  return <BaseText defaultStyle={styles.paragraph} {...props} />;
};

export const SParagraph = (props: TextProps): JSX.Element => {
  return <BaseText defaultStyle={styles.sParagraph} {...props} />;
};

export const TextLink = (props: TextProps): JSX.Element => {
  return <BaseText defaultStyle={styles.textLink} {...props} />;
};

export const FormTitle = (props: TextProps): JSX.Element => {
  return <BaseText defaultStyle={styles.formTitle} {...props} />;
};

const styles = StyleSheet.create({
  h1: {
    fontSize: 26,
    lineHeight: 33.8,
  },
  h2: {
    fontSize: 24,
    lineHeight: 31.2,
  },
  h3: {
    fontSize: 20,
    lineHeight: 26,
  },
  h4: {
    fontSize: 18,
    lineHeight: 23.4,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 20,
  },
  sParagraph: {
    fontSize: 14,
    lineHeight: 20,
  },
  textLink: {
    fontSize: 16,
    lineHeight: 20,
    textDecorationLine: "underline",
  },
  formTitle: {
    fontSize: 10,
    lineHeight: 12,
  },
});
