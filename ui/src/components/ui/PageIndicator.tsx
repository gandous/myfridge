import React from "react";
import { View, StyleSheet } from "react-native";

interface PageIndicatorProps extends React.ComponentProps<typeof View> {
  pageCount: number;
  currentPage: number;
}

export default function PageIndicator({
  pageCount,
  currentPage,
  style,
  ...props
}: PageIndicatorProps) {
  let dots = [];

  currentPage = currentPage % pageCount;
  for (let i = 0; i < pageCount; i++) {
    dots.push(
      <View
        key={i}
        style={[styles.dot, i === currentPage ? styles.selectedDot : null]}
      />,
    );
  }
  return (
    <View style={StyleSheet.flatten([styles.container, style])} {...props}>
      {dots}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    gap: 12,
    justifyContent: "center",
  },
  dot: {
    width: 9,
    height: 9,
    borderRadius: 50,
    backgroundColor: "rgba(121, 121, 121, 0.5)",
  },
  selectedDot: {
    backgroundColor: "#fbfbfb",
  },
});
