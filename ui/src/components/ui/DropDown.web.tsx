import React, { useMemo, useState, useLayoutEffect } from "react";
import {
  useWindowDimensions,
  View,
  ViewStyle,
  Modal,
  Pressable,
} from "react-native";
import Text from "./Text";
import { StyleSheet } from "react-native-unistyles";
import { ACTION_MAX_DEPTH, DropDownAction, DropDownProps } from "./drop-down";

type LayoutEvent = {
  width: number;
  height: number;
  top: number;
  left: number;
};

type DropDownActionElementProps = {
  action: DropDownAction;
  close: () => void;
};

function DropDownActionElement({ action, close }: DropDownActionElementProps) {
  return (
    <Pressable
      onPress={() => {
        close();
        if (action.onPress != null) {
          action.onPress();
        }
      }}
      style={styles.action}
    >
      <Text selectable={false}>{action.title}</Text>
    </Pressable>
  );
}

export default function DropDown({ style, actions, children }: DropDownProps) {
  const [modalSize, setModalSize] = useState({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
  });
  const [buttonSize, setButtonSize] = useState({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
  });
  const [modalStyle, setModalStyle] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const { width, height } = useWindowDimensions();

  function generateChild(
    actions: DropDownAction[],
    depth: number,
  ): React.ReactNode | null {
    if (depth >= ACTION_MAX_DEPTH) {
      console.warn("DropDown maximum depth exceeded");
      return null;
    }
    let childAction = [];
    for (let i = 0; i < actions.length; i++) {
      let newAction = (
        <DropDownActionElement
          key={actions[i].title}
          action={actions[i]}
          close={() => setModalVisible(false)}
        />
      );
      childAction.push(newAction);
    }
    return childAction;
  }

  const dropDownChild = useMemo(() => {
    return generateChild(actions, 0);
  }, [actions]);

  useLayoutEffect(() => {
    let translateY;
    let translateX;
    if (buttonSize.top + modalSize.height + buttonSize.height > height) {
      translateY = buttonSize.top - modalSize.height;
    } else {
      translateY = buttonSize.top + buttonSize.height;
    }
    if (buttonSize.left + modalSize.width > width) {
      translateX = buttonSize.left + buttonSize.width - modalSize.width;
    } else {
      translateX = buttonSize.left;
    }
    setModalStyle({ transform: [{ translateY }, { translateX }] });
  }, [width, height, modalSize, buttonSize]);

  return (
    <View style={[style, { zIndex: 10 }]}>
      <Pressable
        onPress={(evt) => {
          setButtonSize(
            (evt.target as unknown as Element).getBoundingClientRect(),
          );
          setModalVisible(true);
        }}
      >
        {children}
      </Pressable>
      <Modal visible={modalVisible} transparent={true}>
        <Pressable
          onPress={() => setModalVisible(false)}
          style={styles.modalBackground}
        />
        <View
          onLayout={(evt) =>
            setModalSize(evt.nativeEvent.layout as unknown as LayoutEvent)
          }
          style={[modalStyle, styles.modal]}
        >
          {dropDownChild}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  modal: {
    position: "absolute",
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.md,
    padding: theme.margin.sm,
  },
  action: {
    padding: theme.margin.sm,
    borderRadius: theme.margin.sm,
    _web: {
      _hover: {
        backgroundColor: theme.colors.backgroundInput,
      },
    },
  },
  modalBackground: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
}));
