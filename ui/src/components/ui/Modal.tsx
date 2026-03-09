import React from "react";
import ModalBase from "./ModalBase";
import Text from "./Text";
import Stack from "./Stack";
import { ModalBaseProps } from "./modal-base";
import { Platform } from "react-native";
import IconButton from "./IconButton";

type ModalProps = ModalBaseProps & {
  title: string;
  open: boolean;
  close: () => void;
};

export default function Modal({ children, title, open, close }: ModalProps) {
  return (
    <ModalBase visible={open} onRequestClose={close}>
      <Stack gap="lg">
        <Stack direction="horizontal">
          <Text style={{ flex: 1 }} size="h4">
            {title}
          </Text>
          {Platform.OS === "web" ? (
            <IconButton icon="close-outline" onPress={close} />
          ) : null}
        </Stack>
        {children}
      </Stack>
    </ModalBase>
  );
}
