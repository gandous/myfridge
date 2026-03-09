import React from "react";
import { StyleSheet } from "react-native-unistyles";
import Text from "./Text";

type CardTitleProps = React.ComponentProps<typeof Text>;

export default function Card({ style, children, ...props }: CardTitleProps) {
  return (
    <Text style={[styles.cardTitle, style]} size="h4" {...props}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  cardTitle: {
    marginBottom: 10,
  },
});
