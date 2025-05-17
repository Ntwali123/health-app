import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native';
import { Text, useTheme, Button as PaperButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

import { Card } from '../components/Card';
import { colors, spacing } from '../theme/theme';

const screenWidth = Dimensions.get('window').width;

export const AIScreen = () => {
  const theme = useTheme();
  const [selectedInsight, setSelectedInsight] = useState('overview');

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
    insightSelector: {
      flexDirection: 'row',
      marginBottom: spacing.lg,
    },
    insightButton: {
      marginRight: spacing.sm,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.xs,
      borderRadius: 20,
      backgroundColor: colors.background.paper,
    },
    insightButtonActive: {
      backgroundColor: colors.primary.main,
    },
    insightButtonText: {
      color: colors.text.secondary,
    },
    insightButtonTextActive: {
      color: colors.primary.contrast,
    },
    chartContainer: {
      marginBottom: spacing.lg,
    },
    chart: {
      marginVertical: spacing.sm,
      borderRadius: 16,
    },
    insightCard: {
      marginBottom: spacing.md,
    },
    insightHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: spacing.sm,
    },
    insightIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.primary.light,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: spacing.sm,
    },
    insightTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text.primary,
    },
    insightContent: {
      marginTop: spacing.sm,
    },
    insightText: {
      fontSize: 14,
      color: colors.text.secondary,
      lineHeight: 20,
    },
    recommendationCard: {
      marginBottom: spacing.md,
    },
    recommendationHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: spacing.sm,
    },
    recommendationTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text.primary,
    },
    recommendationContent: {
      marginTop: spacing.sm,
    },
    recommendationText: {
      fontSize: 14,
      color: colors.text.secondary,
      lineHeight: 20,
    },
    actionButton: {
      marginTop: spacing.md,
    },
  });

  const insights = [
    {
      id: 'overview',
      title: 'Health Overview',
      icon: 'chart-line',
      content: 'Your overall health is improving. Key metrics show positive trends.',
    },
    {
      id: 'heart',
      title: 'Heart Health',
      icon: 'heart-pulse',
      content: 'Heart rate variability is within normal range. Continue current exercise routine.',
    },
    {
      id: 'sleep',
      title: 'Sleep Quality',
      icon: 'sleep',
      content: 'Sleep patterns show improvement. Aim for 7-8 hours of sleep consistently.',
    },
  ];

  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [85, 88, 82, 90, 87, 89, 86],
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

  const recommendations = [
    {
      id: '1',
      title: 'Exercise Recommendation',
      content: 'Based on your recent activity levels, consider increasing your daily steps by 1000.',
      action: 'View Plan',
    },
    {
      id: '2',
      title: 'Diet Suggestion',
      content: 'Your blood sugar levels indicate you might benefit from reducing refined sugar intake.',
      action: 'Learn More',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>AI Insights</Text>
        </View>

        <View style={styles.insightSelector}>
          {insights.map((insight) => (
            <TouchableOpacity
              key={insight.id}
              style={[
                styles.insightButton,
                selectedInsight === insight.id && styles.insightButtonActive,
              ]}
              onPress={() => setSelectedInsight(insight.id)}
            >
              <Text
                style={[
                  styles.insightButtonText,
                  selectedInsight === insight.id && styles.insightButtonTextActive,
                ]}
              >
                {insight.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Card style={styles.chartContainer}>
          <LineChart
            data={chartData}
            width={screenWidth - spacing.md * 2}
            height={220}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />
        </Card>

        {insights.map((insight) => (
          <Card
            key={insight.id}
            style={styles.insightCard}
            onPress={() => setSelectedInsight(insight.id)}
          >
            <View style={styles.insightHeader}>
              <View style={styles.insightIcon}>
                <Icon name={insight.icon} size={24} color={colors.primary.main} />
              </View>
              <Text style={styles.insightTitle}>{insight.title}</Text>
            </View>
            <View style={styles.insightContent}>
              <Text style={styles.insightText}>{insight.content}</Text>
            </View>
          </Card>
        ))}

        <Text style={[styles.insightTitle, { marginBottom: spacing.md }]}>
          Personalized Recommendations
        </Text>

        {recommendations.map((recommendation) => (
          <Card key={recommendation.id} style={styles.recommendationCard}>
            <View style={styles.recommendationHeader}>
              <Text style={styles.recommendationTitle}>{recommendation.title}</Text>
            </View>
            <View style={styles.recommendationContent}>
              <Text style={styles.recommendationText}>{recommendation.content}</Text>
              <PaperButton
                mode="outlined"
                onPress={() => {}}
                style={styles.actionButton}
              >
                {recommendation.action}
              </PaperButton>
            </View>
          </Card>
        ))}
      </View>
    </ScrollView>
  );
}; 