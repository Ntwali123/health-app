import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { colors, shadows } from '../theme/theme';

interface CardProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  variant?: 'elevated' | 'outlined' | 'flat';
  style?: ViewStyle;
  onPress?: () => void;
}

export const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  children,
  variant = 'elevated',
  style,
  onPress,
}) => {
  const theme = useTheme();

  const getCardStyle = () => {
    const baseStyle: ViewStyle = {
      borderRadius: 12,
      padding: 16,
      backgroundColor: colors.background.paper,
    };

    const variantStyles: Record<string, ViewStyle> = {
      elevated: {
        ...shadows.medium,
      },
      outlined: {
        borderWidth: 1,
        borderColor: colors.grey[300],
      },
      flat: {
        backgroundColor: colors.background.default,
      },
    };

    return StyleSheet.create({
      container: {
        ...baseStyle,
        ...variantStyles[variant],
        ...style,
      },
      header: {
        marginBottom: 12,
      },
      title: {
        fontSize: 18,
        fontWeight: '600',
        color: colors.text.primary,
        marginBottom: 4,
      },
      subtitle: {
        fontSize: 14,
        color: colors.text.secondary,
      },
    });
  };

  const styles = getCardStyle();

  return (
    <View style={styles.container}>
      {(title || subtitle) && (
        <View style={styles.header}>
          {title && <Text style={styles.title}>{title}</Text>}
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
      )}
      {children}
    </View>
  );
}; 