import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native';
import { Text, useTheme, TextInput, Button as PaperButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

import { Card } from '../components/Card';
import { HealthMetric } from '../components/HealthMetric';
import { colors, spacing } from '../theme/theme';

const screenWidth = Dimensions.get('window').width;

export const HealthScreen = () => {
  const theme = useTheme();
  const [selectedMetric, setSelectedMetric] = useState('heartRate');

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.default,
    },
    content: {
      padding: spacing.md,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: spacing.lg,
    },
    title: {
      fontSize: 24,
      fontWeight: '600',
      color: colors.text.primary,
    },
    dateSelector: {
      flexDirection: 'row',
      marginBottom: spacing.lg,
    },
    dateButton: {
      flex: 1,
      paddingVertical: spacing.sm,
      alignItems: 'center',
      borderBottomWidth: 2,
      borderBottomColor: colors.background.default,
    },
    dateButtonActive: {
      borderBottomColor: colors.primary.main,
    },
    dateButtonText: {
      color: colors.text.secondary,
    },
    dateButtonTextActive: {
      color: colors.primary.main,
      fontWeight: '600',
    },
    chartContainer: {
      marginBottom: spacing.lg,
    },
    chart: {
      marginVertical: spacing.sm,
      borderRadius: 16,
    },
    metricsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginHorizontal: -spacing.xs,
      marginBottom: spacing.lg,
    },
    metricItem: {
      width: '50%',
      paddingHorizontal: spacing.xs,
      marginBottom: spacing.md,
    },
    addMetricButton: {
      marginTop: spacing.md,
    },
    inputContainer: {
      marginBottom: spacing.md,
    },
    input: {
      backgroundColor: colors.background.paper,
    },
  });

  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [72, 75, 70, 73, 71, 74, 72],
        color: (opacity = 1) => colors.primary.main,
        strokeWidth: 2,
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: colors.background.paper,
    backgroundGradientTo: colors.background.paper,
    color: (opacity = 1) => colors.primary.main,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
  };

  const dates = ['Today', 'Week', 'Month', 'Year'];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Health Tracking</Text>
          <TouchableOpacity>
            <Icon name="plus" size={24} color={colors.primary.main} />
          </TouchableOpacity>
        </View>

        <View style={styles.dateSelector}>
          {dates.map((date) => (
            <TouchableOpacity
              key={date}
              style={[
                styles.dateButton,
                date === 'Week' && styles.dateButtonActive,
              ]}
            >
              <Text
                style={[
                  styles.dateButtonText,
                  date === 'Week' && styles.dateButtonTextActive,
                ]}
              >
                {date}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Card title="Heart Rate" style={styles.chartContainer}>
          <LineChart
            data={chartData}
            width={screenWidth - spacing.md * 2}
            height={220}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />
        </Card>

        <View style={styles.metricsGrid}>
          <View style={styles.metricItem}>
            <HealthMetric
              title="Heart Rate"
              value={72}
              unit="bpm"
              icon="heart-pulse"
              trend="stable"
              status="normal"
            />
          </View>
          <View style={styles.metricItem}>
            <HealthMetric
              title="Blood Pressure"
              value="120/80"
              unit="mmHg"
              icon="heart"
              status="normal"
            />
          </View>
          <View style={styles.metricItem}>
            <HealthMetric
              title="Blood Sugar"
              value={95}
              unit="mg/dL"
              icon="needle"
              trend="down"
              status="normal"
            />
          </View>
          <View style={styles.metricItem}>
            <HealthMetric
              title="Temperature"
              value={98.6}
              unit="°F"
              icon="thermometer"
              status="normal"
            />
          </View>
        </View>

        <Card title="Add New Reading">
          <View style={styles.inputContainer}>
            <TextInput
              label="Value"
              mode="outlined"
              keyboardType="numeric"
              style={styles.input}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              label="Notes"
              mode="outlined"
              multiline
              numberOfLines={3}
              style={styles.input}
            />
          </View>
          <PaperButton
            mode="contained"
            onPress={() => {}}
            style={styles.addMetricButton}
          >
            Save Reading
          </PaperButton>
        </Card>
      </View>
    </ScrollView>
  );
}; 