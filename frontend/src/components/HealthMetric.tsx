import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../theme/theme';

interface HealthMetricProps {
  title: string;
  value: string | number;
  unit?: string;
  icon?: string;
  trend?: 'up' | 'down' | 'stable';
  status?: 'normal' | 'warning' | 'critical';
  style?: ViewStyle;
}

export const HealthMetric: React.FC<HealthMetricProps> = ({
  title,
  value,
  unit,
  icon,
  trend,
  status = 'normal',
  style,
}) => {
  const theme = useTheme();

  const getStatusColor = () => {
    switch (status) {
      case 'normal':
        return colors.success.main;
      case 'warning':
        return colors.warning.main;
      case 'critical':
        return colors.error.main;
      default:
        return colors.text.primary;
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return 'trending-up';
      case 'down':
        return 'trending-down';
      case 'stable':
        return 'trending-neutral';
      default:
        return null;
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return colors.success.main;
      case 'down':
        return colors.error.main;
      case 'stable':
        return colors.info.main;
      default:
        return colors.text.secondary;
    }
  };

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 12,
      backgroundColor: colors.background.paper,
      borderRadius: 8,
      ...style,
    },
    iconContainer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.primary.light,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 12,
    },
    content: {
      flex: 1,
    },
    title: {
      fontSize: 14,
      color: colors.text.secondary,
      marginBottom: 4,
    },
    valueContainer: {
      flexDirection: 'row',
      alignItems: 'baseline',
    },
    value: {
      fontSize: 24,
      fontWeight: '600',
      color: getStatusColor(),
      marginRight: 4,
    },
    unit: {
      fontSize: 14,
      color: colors.text.secondary,
    },
    trendContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 8,
    },
    trendIcon: {
      marginRight: 4,
    },
  });

  return (
    <View style={styles.container}>
      {icon && (
        <View style={styles.iconContainer}>
          <Icon name={icon} size={24} color={colors.primary.main} />
        </View>
      )}
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.valueContainer}>
          <Text style={styles.value}>{value}</Text>
          {unit && <Text style={styles.unit}>{unit}</Text>}
          {trend && (
            <View style={styles.trendContainer}>
              <Icon
                name={getTrendIcon()}
                size={16}
                color={getTrendColor()}
                style={styles.trendIcon}
              />
            </View>
          )}
        </View>
      </View>
    </View>
  );
}; 