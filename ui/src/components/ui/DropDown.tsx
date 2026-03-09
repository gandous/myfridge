import React from "react";
import ContextMenu from "react-native-context-menu-view";
import { DropDownAction, DropDownProps } from "./drop-down";

export default function DropDown({ style, actions, children }: DropDownProps) {
  return (
    <ContextMenu
      actions={actions}
      dropdownMenuMode={true}
      onPress={(evt) => {
        let action = actions[evt.nativeEvent.index];
        action.onPress();
      }}
    >
      {children}
    </ContextMenu>
  );
}
