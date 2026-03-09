import React from "react";
import ButtonBase from "./ButtonBase";
import Text from "./Text";
import Icon from "./Icon";
import { Ionicons } from "@expo/vector-icons";
import { SizeVariant } from "@/constants/themes";

type IconName = React.ComponentProps<typeof Ionicons>["name"];

interface IconButtonProps extends React.ComponentProps<typeof ButtonBase> {
  icon: IconName;
  title?: string;
  size?: SizeVariant;
}

export default function IconButton({
  title,
  icon,
  size,
  ...props
}: IconButtonProps) {
  return (
    <ButtonBase {...props}>
      <Icon size={size} name={icon} />
      {title != null ? (
        <Text selectable={false} size="h5" style={{ marginLeft: 10 }}>
          {title}
        </Text>
      ) : null}
    </ButtonBase>
  );
}
