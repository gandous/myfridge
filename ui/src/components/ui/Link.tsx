import React from "react";
import { Link as ERLink } from "expo-router";
import { StyleSheet, withUnistyles } from "react-native-unistyles";

type LinkColor = "secondary";

const UniLink = withUnistyles(ERLink);

interface LinkProps extends React.ComponentProps<typeof ERLink> {
  color: LinkColor;
  underline?: boolean;
}

export default function Link({
  children,
  style,
  color,
  underline,
  ...props
}: LinkProps) {
  styles.useVariants({ color, underline });

  return (
    <UniLink style={[styles.link, style]} {...props}>
      {children}
    </UniLink>
  );
}

const styles = StyleSheet.create((theme) => ({
  link: {
    variants: {
      color: {
        secondary: {
          color: theme.colors.textSecondary,
        },
        default: {
          color: theme.colors.text,
        },
      },
      underline: {
        true: {
          textDecorationLine: "underline",
        },
        false: {},
        default: {},
      },
    },
  },
}));
