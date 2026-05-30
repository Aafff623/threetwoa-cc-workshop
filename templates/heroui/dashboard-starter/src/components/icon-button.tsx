import {Button} from "@heroui/react";
import type {ComponentType} from "react";

// 通用图标按钮组件
// 自定义：调整 size、variant、color 等默认值
export function IconButton({
  icon: Icon,
  label,
  onPress,
  isIconOnly = true,
  size = "sm",
  variant = "light",
  color = "default",
}: {
  icon: ComponentType<{className?: string}>;
  label: string;
  onPress?: () => void;
  isIconOnly?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "light" | "flat" | "solid" | "bordered" | "ghost";
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
}) {
  return (
    <Button
      isIconOnly={isIconOnly}
      size={size}
      variant={variant}
      color={color}
      aria-label={label}
      onPress={onPress}
    >
      <Icon className="size-4" />
    </Button>
  );
}