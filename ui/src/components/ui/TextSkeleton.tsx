import React from "react";

import Text from "./Text";
import Skeleton from "./Skeleton";
import { StyleSheet } from "react-native-unistyles";

type TextSkeletonProps = React.ComponentProps<typeof Text>;

export default function TextSkeleton({
  children,
  style,
  ...props
}: TextSkeletonProps) {
  if (children == null) {
    return (
      <Skeleton
        style={[styles.skeleton, style, styles.skeletonBackground]}
        {...props}
      />
    );
  } else {
    return (
      <Text style={style} {...props}>
        {children}
      </Text>
    );
  }
}

const styles = StyleSheet.create((theme) => ({
  skeleton: {
    borderRadius: 5,
    width: 100,
    height: 20,
  },
  skeletonBackground: {
    backgroundColor: theme.colors.text,
  },
}));
