import React from "react";
import { Text, TextProps, TextStyle } from "react-native";

type FontWeight =
  | "roman"
  | "bold"
  | "medium"
  | "light"
  | "thin"
  | "ultra-light"
  | "black";

interface TextWrapperProps extends TextProps {
  weight?: FontWeight;
  children: React.ReactNode;
  style?: TextStyle;
}

const fontFamilyMap: Record<FontWeight, string> = {
  roman: "helvetica-neue-roman",
  bold: "helvetica-neue-bold",
  medium: "helvetica-neue-medium",
  light: "helvetica-neue-light",
  thin: "helvetica-neue-thin",
  "ultra-light": "helvetica-neue-ultra-light",
  black: "helvetica-neue-black",
};

export const TextWrapper: React.FC<TextWrapperProps> = ({
  weight = "roman",
  children,
  style,
  ...props
}) => {
  return (
    <Text
      style={[
        {
          fontFamily: fontFamilyMap[weight],
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

export default TextWrapper;
