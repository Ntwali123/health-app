import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { RootStackParamList, MainTabParamList } from "./types";
import { colors } from "../theme/theme";
import { useAuth } from "../contexts/AuthContext";

// Import screens
import { LoginScreen } from "../screens/LoginScreen";
import { SignupScreen } from "../screens/SignupScreen";
import { OnboardingScreen } from "../screens/OnboardingScreen";
import { HomeScreen } from "../screens/HomeScreen";
import { HealthScreen } from "../screens/HealthScreen";
import { AppointmentsScreen } from "../screens/AppointmentsScreen";
import { AIScreen } from "../screens/AIScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { TeleconsultationScreen } from "../screens/TeleconsultationScreen";
import { AppointmentDetailsScreen } from "../screens/AppointmentDetailsScreen";
import { HealthTrackingScreen } from "../screens/HealthTrackingScreen";
import { AIInsightsScreen } from "../screens/AIInsightsScreen";
import { SettingsScreen } from "../screens/SettingsScreen";
import { NotificationsScreen } from "../screens/NotificationsScreen";
import { USSDSupportScreen } from "../screens/USSDSupportScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabs = () => {
  const theme = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary.main,
        tabBarInactiveTintColor: colors.grey[600],
        tabBarStyle: {
          backgroundColor: colors.background.paper,
          borderTopWidth: 0,
          elevation: 8,
          shadowOpacity: 0.1,
          height: 60,
          paddingBottom: 8,
        },
        headerStyle: {
          backgroundColor: colors.background.paper,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTitleStyle: {
          color: colors.text.primary,
          fontSize: 20,
          fontWeight: "600",
        },
      }}
    >
      <Tab.Screen
        name="Health"
        component={HealthScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="heart-pulse" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Appointments"
        component={AppointmentsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="calendar" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="AI"
        component={AIScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="brain" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="account" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export const Navigation = () => {
  const { isAuthenticated, hasCompletedOnboarding } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background.default },
        }}
      >
        {!isAuthenticated ? (
          // Auth Stack
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
          </>
        ) : !hasCompletedOnboarding ? (
          // Onboarding Stack
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        ) : (
          // Main App Stack
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Main" component={MainTabs} />
            <Stack.Screen
              name="Teleconsultation"
              component={TeleconsultationScreen}
            />
            <Stack.Screen
              name="AppointmentDetails"
              component={AppointmentDetailsScreen}
            />
            <Stack.Screen
              name="HealthTracking"
              component={HealthTrackingScreen}
            />
            <Stack.Screen name="AIInsights" component={AIInsightsScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen
              name="Notifications"
              component={NotificationsScreen}
            />
            <Stack.Screen name="USSDSupport" component={USSDSupportScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
