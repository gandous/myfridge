import React from "react";
import { Modal as RNModal, View } from "react-native";
import { ModalBaseProps } from "./modal-base";
import { StyleSheet } from "react-native-unistyles";
// import { withUnistyles } from "react-native-unistyles";

// const UniRNModal= withUnistyles(RNModal, (theme) => ({
// backdropColor: theme.colors.background
// }));

export default function ModalBase({
  children,
  style,
  ...props
}: ModalBaseProps) {
  return (
    <RNModal
      animationType="slide"
      presentationStyle="pageSheet"
      {...props}
      // backdropColor="green" TODO replace the view workaround to change the background
      // color when updating the react native version
    >
      <View style={styles.view}>{children}</View>
    </RNModal>
  );
}

const styles = StyleSheet.create((theme) => ({
  view: {
    flex: 1,
    backgroundColor: theme.colors.card,
  },
}));
