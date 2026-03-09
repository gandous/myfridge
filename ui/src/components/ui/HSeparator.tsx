import React from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

type HSeparatorProps = React.ComponentProps<typeof View>;

export default function HSeparator({ style }: HSeparatorProps) {
  return <View style={[styles.separator, style]} />;
}

const styles = StyleSheet.create((theme) => ({
  separator: {
    height: 1,
    backgroundColor: theme.colors.backgroundInput,
    marginLeft: theme.margin.md,
  },
}));
