import * as Haptics from "expo-haptics";
import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

interface IconProps {
  color?: string;
  size?: number;
}

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  icon?: React.ReactElement<IconProps>;
  iconPosition?: "left" | "right";
  disabled?: boolean;
  loading?: boolean;
  variant?: "primary" | "secondary" | "outline";
  size?: "small" | "medium" | "large";
  style?: ViewStyle;
  textStyle?: TextStyle;
  backgroundColor?: string;
  textColor?: string;
  iconColor?: string;
  borderColor?: string;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  icon,
  iconPosition = "right",
  disabled = false,
  loading = false,
  variant = "primary",
  size = "medium",
  style,
  textStyle,
  backgroundColor = "#2A2C2C",
  textColor = "#FFFFFF",
  iconColor = "#FFFFFF",
  borderColor,
}) => {
  const getButtonStyles = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      flexDirection: iconPosition === "left" ? "row" : "row-reverse",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 14,
      opacity: disabled ? 0.6 : 1,
    };

    // Size variations
    switch (size) {
      case "small":
        baseStyle.paddingVertical = 8;
        baseStyle.paddingHorizontal = 16;
        break;
      case "large":
        baseStyle.paddingVertical = 16;
        baseStyle.paddingHorizontal = 32;
        break;
      default: // medium
        baseStyle.paddingVertical = 12;
        baseStyle.paddingHorizontal = 24;
    }

    // Variant styles
    switch (variant) {
      case "secondary":
        baseStyle.backgroundColor = "#E6E8EB";
        break;
      case "outline":
        baseStyle.backgroundColor = "transparent";
        baseStyle.borderWidth = 1;
        baseStyle.borderColor = borderColor || backgroundColor;
        break;
      default: // primary
        baseStyle.backgroundColor = backgroundColor;
    }

    return baseStyle;
  };

  const getTextColor = (): string => {
    if (variant === "secondary") {
      return "#000000";
    }
    if (variant === "outline") {
      return backgroundColor;
    }
    return textColor;
  };

  const currentTextColor = getTextColor();

  return (
    <TouchableOpacity
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onPress();
      }}
      style={[styles.button, getButtonStyles(), style]}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={currentTextColor} />
      ) : (
        <>
          {icon && (
            <View style={styles.iconContainer}>
              {React.cloneElement(icon, { color: iconColor })}
            </View>
          )}
          <Text
            style={[
              styles.text,
              { color: currentTextColor, fontFamily: "helvetica-neue-bold" },
              textStyle,
            ]}
          >
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    minWidth: 64,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  iconContainer: {
    marginHorizontal: 8,
  },
});

export default CustomButton;
