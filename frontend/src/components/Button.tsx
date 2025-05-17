import React from 'react';
import { StyleSheet, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { colors } from '../theme/theme';

interface ButtonProps {
  onPress: () => void;
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  onPress,
  title,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  fullWidth = false,
  style,
  textStyle,
  icon,
}) => {
  const theme = useTheme();

  const getButtonStyle = () => {
    const baseStyle: ViewStyle = {
      borderRadius: 8,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: disabled ? 0.6 : 1,
    };

    const sizeStyles: Record<string, ViewStyle> = {
      small: {
        paddingVertical: 8,
        paddingHorizontal: 16,
      },
      medium: {
        paddingVertical: 12,
        paddingHorizontal: 24,
      },
      large: {
        paddingVertical: 16,
        paddingHorizontal: 32,
      },
    };

    const variantStyles: Record<string, ViewStyle> = {
      primary: {
        backgroundColor: colors.primary.main,
      },
      secondary: {
        backgroundColor: colors.secondary.main,
      },
      outline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: colors.primary.main,
      },
      text: {
        backgroundColor: 'transparent',
      },
    };

    return StyleSheet.create({
      button: {
        ...baseStyle,
        ...sizeStyles[size],
        ...variantStyles[variant],
        ...(fullWidth && { width: '100%' }),
        ...style,
      },
    });
  };

  const getTextStyle = () => {
    const baseStyle: TextStyle = {
      fontSize: 16,
      fontWeight: '600',
    };

    const variantTextStyles: Record<string, TextStyle> = {
      primary: {
        color: colors.primary.contrast,
      },
      secondary: {
        color: colors.secondary.contrast,
      },
      outline: {
        color: colors.primary.main,
      },
      text: {
        color: colors.primary.main,
      },
    };

    return StyleSheet.create({
      text: {
        ...baseStyle,
        ...variantTextStyles[variant],
        ...textStyle,
      },
    });
  };

  const styles = getButtonStyle();
  const textStyles = getTextStyle();

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      {icon}
      <Text style={[textStyles.text, icon && { marginLeft: 8 }]}>{title}</Text>
    </TouchableOpacity>
  );
}; 