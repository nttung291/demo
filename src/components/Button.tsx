import React, { ComponentProps, ReactNode, useMemo } from "react";
import {
  Button as DefaultButton,
  MD2Colors as Colors,
} from "react-native-paper";
import { StyleProp, ViewStyle, TextStyle, Platform } from "react-native";

type ButtonType = "small" | "medium" | "large";
type ButtonMode = "outlined" | "contained" | "text";
export type ButtonProps = {
  type?: ButtonType;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  active?: boolean;
  mode?: ButtonMode;
  uppercase?: boolean;
  children: ReactNode;
} & Omit<
  ComponentProps<typeof DefaultButton>,
  "style" | "contentStyle" | "labelStyle" | "disabled" | "mode" | "uppercase"
>;

export const getFontWeight = (bold?: boolean): StyleProp<TextStyle> => {
  if (Platform.OS === "ios") {
    return {
      fontFamily: "IBM Plex Sans",
      fontWeight: bold ? "bold" : "normal",
    };
  }

  if (Platform.OS === "android") {
    return {
      fontFamily: bold ? "IBMPlexSans-Bold" : "IBMPlexSans-Regular",
    };
  }
};

export const Button = ({
  children,
  active,
  type,
  style,
  contentStyle,
  labelStyle,
  disabled,
  mode = "contained",
  uppercase = false,
  ...props
}: ButtonProps): JSX.Element => {
  const customStyle = useMemo<StyleProp<ViewStyle>>(
    () => [
      {
        opacity: disabled ? 0.5 : 1,
        borderRadius: (() => {
          switch (type) {
            case "small":
              return 4;
            case "medium":
              return 8;
            case "large":
              return 12;
            default:
              return 12;
          }
        })(),
        borderWidth: (() => {
          switch (mode) {
            case "text":
              return 0;
            case "contained":
              return 0;
            case "outlined":
              return 1;
            default:
              return 0;
          }
        })(),
        borderColor: (() => {
          switch (mode) {
            case "outlined":
              return active ? "#000000" : "#D6D6D6";
            default:
              return undefined;
          }
        })(),
      },
      style,
    ],
    [mode, type, active, disabled, style]
  );

  const customContentStyle = useMemo<StyleProp<ViewStyle>>(
    () => [
      {
        height: (() => {
          switch (type) {
            case "small":
              return 38;
            case "medium":
              return 46;
            case "large":
              return 60;
            default:
              return 60;
          }
        })(),
        backgroundColor: (() => {
          switch (mode) {
            case "contained":
              return disabled ? "#000000" : Colors.green400;
            case "outlined":
              return "#FFFFFF";
            case "text":
              return active ? "#FFFFFF" : undefined;
            default:
              return undefined;
          }
        })(),
      },
      contentStyle,
    ],
    [mode, type, active, disabled, contentStyle]
  );

  const customLabelStyle = useMemo<StyleProp<TextStyle>>(
    () => [
      {
        fontSize: (() => {
          switch (type) {
            case "small":
              return 16;
            case "medium":
              return 18;
            case "large":
              return 18;
            default:
              return 18;
          }
        })(),
        lineHeight: (() => {
          switch (type) {
            case "small":
              return 22;
            case "medium":
              return 23;
            case "large":
              return 23;
            default:
              return 23;
          }
        })(),
        color: (() => {
          switch (mode) {
            case "contained":
              return "#FFFFFF";
            default:
              return "#FFFFFF";
          }
        })(),
        marginVertical: (() => {
          switch (type) {
            case "small":
              return 8;
            case "medium":
              return 12;
            case "large":
              return 16;
            default:
              return 16;
          }
        })(),
        marginHorizontal: 20,
        letterSpacing: 0,
      },
      (() => {
        switch (mode) {
          case "contained":
            return getFontWeight(true);
          case "outlined":
            return getFontWeight(active);
          case "text":
            return getFontWeight(true);
          default:
            return getFontWeight(true);
        }
      })(),
      labelStyle,
    ],
    [mode, type, active, labelStyle]
  );

  return (
    <DefaultButton
      mode={mode}
      disabled={disabled}
      uppercase={uppercase}
      style={customStyle}
      contentStyle={customContentStyle}
      labelStyle={customLabelStyle}
      {...props}
    >
      {children}
    </DefaultButton>
  );
};
