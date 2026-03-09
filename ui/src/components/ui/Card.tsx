import React from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

type CardProps = React.ComponentProps<typeof View>;

export default function Card({ style, children, ...props }: CardProps) {
  return (
    <View style={[styles.card, style]} {...props}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  card: {
    padding: theme.margin.lg,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: theme.colors.card,
  },
}));
