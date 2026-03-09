import React from "react";
import { Text as RNText } from "react-native";
import { StyleSheet } from "react-native-unistyles";

type TextColor = "text" | "secondary" | "error";
type TextSizeVariant = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "p2";

interface TextProps extends React.ComponentProps<typeof RNText> {
  color?: TextColor;
  size?: TextSizeVariant;
}

export default function Text({
  style,
  color,
  size,
  children,
  ...props
}: TextProps) {
  styles.useVariants({ size, color });

  return (
    <RNText style={[styles.text, style]} {...props}>
      {children}
    </RNText>
  );
}

const styles = StyleSheet.create((theme) => ({
  text: {
    _web: {
      fontFamily: theme.fontFamilyWeb,
    },
    variants: {
      color: {
        text: {
          color: theme.colors.text,
        },
        secondary: {
          color: theme.colors.textSecondary,
        },
        error: {
          color: theme.colors.red,
        },
        default: {
          color: theme.colors.text,
        },
      },
      size: {
        h1: theme.fontSize.h1 as any,
        h2: theme.fontSize.h2 as any,
        h3: theme.fontSize.h3 as any,
        h4: theme.fontSize.h4 as any,
        h5: theme.fontSize.h5 as any,
        h6: theme.fontSize.h6 as any,
        p: theme.fontSize.p as any,
        p2: theme.fontSize.p2 as any,
        default: theme.fontSize.default as any,
      },
    },
  },
}));
