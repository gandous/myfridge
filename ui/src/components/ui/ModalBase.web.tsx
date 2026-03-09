import React from "react";
import { Modal as RNModal, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import Card from "./Card";
import { ModalBaseProps } from "./modal-base";

export default function ModalBase({
  children,
  style,
  ...props
}: ModalBaseProps) {
  return (
    <RNModal transparent={true} {...props}>
      <View style={styles.webBackground}>
        <Card style={[styles.modal, style]}>{children}</Card>
      </View>
    </RNModal>
  );
}

const styles = StyleSheet.create((theme) => ({
  webBackground: {
    backgroundColor: theme.colors.backgroundModal,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: "90%",
    maxWidth: 800,
  },
}));
