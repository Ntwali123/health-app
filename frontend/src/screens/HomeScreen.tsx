import React from "react";
import { StyleSheet, ScrollView, View, TouchableOpacity } from "react-native";
import { Text, useTheme, Button as PaperButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { Card } from "../components/Card";
import { HealthMetric } from "../components/HealthMetric";
import { Button } from "../components/Button";
import { colors, spacing } from "../theme/theme";

export const HomeScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.default,
    },
    content: {
      padding: spacing.md,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: spacing.lg,
    },
    welcomeText: {
      fontSize: 24,
      fontWeight: "600",
      color: colors.text.primary,
    },
    notificationButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.background.paper,
      alignItems: "center",
      justifyContent: "center",
    },
    metricsGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginHorizontal: -spacing.xs,
      marginBottom: spacing.lg,
    },
    metricItem: {
      width: "50%",
      paddingHorizontal: spacing.xs,
      marginBottom: spacing.md,
    },
    section: {
      marginBottom: spacing.lg,
    },
    sectionHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: spacing.sm,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: colors.text.primary,
    },
    seeAllButton: {
      color: colors.primary.main,
      fontSize: 14,
    },
    upcomingAppointments: {
      marginBottom: spacing.md,
    },
    appointmentCard: {
      marginBottom: spacing.sm,
    },
    quickActions: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginHorizontal: -spacing.xs,
    },
    quickActionItem: {
      width: "25%",
      paddingHorizontal: spacing.xs,
      marginBottom: spacing.md,
    },
    quickActionButton: {
      alignItems: "center",
    },
    quickActionIcon: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: colors.primary.light,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: spacing.xs,
    },
    quickActionText: {
      fontSize: 12,
      color: colors.text.secondary,
      textAlign: "center",
    },
    continueButton: {
      marginTop: spacing.xl,
      marginBottom: spacing.xl,
    },
  });

  const quickActions = [
    { icon: "video", label: "Video Call" },
    { icon: "chat", label: "Chat" },
    { icon: "calendar", label: "Schedule" },
    { icon: "pill", label: "Medications" },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Welcome back, John</Text>
          <TouchableOpacity
            style={styles.notificationButton}
            onPress={() => navigation.navigate("Notifications")}
          >
            <Icon name="bell" size={24} color={colors.text.primary} />
          </TouchableOpacity>
        </View>

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

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("Appointments")}
            >
              <Text style={styles.seeAllButton}>See All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.upcomingAppointments}>
            <Card
              title="Dr. Sarah Wilson"
              subtitle="Cardiology • Today, 2:30 PM"
              variant="elevated"
              style={styles.appointmentCard}
            >
              <Button
                title="Join Video Call"
                variant="primary"
                size="small"
                icon={
                  <Icon
                    name="video"
                    size={20}
                    color={colors.primary.contrast}
                  />
                }
                onPress={() =>
                  navigation.navigate("Teleconsultation", { doctorId: "1" })
                }
              />
            </Card>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            {quickActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                style={styles.quickActionItem}
                onPress={() => {
                  // Handle quick action press
                }}
              >
                <View style={styles.quickActionButton}>
                  <View style={styles.quickActionIcon}>
                    <Icon
                      name={action.icon}
                      size={24}
                      color={colors.primary.main}
                    />
                  </View>
                  <Text style={styles.quickActionText}>{action.label}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <PaperButton
          mode="contained"
          onPress={() => navigation.navigate("Main")}
          style={styles.continueButton}
          icon="arrow-right"
        >
          Continue to App
        </PaperButton>
      </View>
    </ScrollView>
  );
};
