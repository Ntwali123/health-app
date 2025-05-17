import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native';
import { Text, useTheme, FAB, Portal, Modal, Button as PaperButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

import { Card } from '../components/Card';
import { colors, spacing } from '../theme/theme';

export const AppointmentsScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);

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
    filterContainer: {
      flexDirection: 'row',
      marginBottom: spacing.lg,
    },
    filterButton: {
      marginRight: spacing.sm,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.xs,
      borderRadius: 20,
      backgroundColor: colors.background.paper,
    },
    filterButtonActive: {
      backgroundColor: colors.primary.main,
    },
    filterButtonText: {
      color: colors.text.secondary,
    },
    filterButtonTextActive: {
      color: colors.primary.contrast,
    },
    appointmentCard: {
      marginBottom: spacing.md,
    },
    appointmentHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: spacing.sm,
    },
    doctorInfo: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    doctorAvatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.primary.light,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: spacing.sm,
    },
    doctorName: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text.primary,
    },
    doctorSpecialty: {
      fontSize: 14,
      color: colors.text.secondary,
    },
    appointmentTime: {
      fontSize: 14,
      color: colors.text.secondary,
    },
    appointmentActions: {
      flexDirection: 'row',
      marginTop: spacing.sm,
    },
    actionButton: {
      flex: 1,
      marginRight: spacing.sm,
    },
    modalContainer: {
      backgroundColor: colors.background.paper,
      padding: spacing.lg,
      margin: spacing.lg,
      borderRadius: 12,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: '600',
      color: colors.text.primary,
      marginBottom: spacing.lg,
    },
    modalActions: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginTop: spacing.lg,
    },
    modalButton: {
      marginLeft: spacing.sm,
    },
  });

  const filters = ['Upcoming', 'Past', 'Cancelled'];
  const [selectedFilter, setSelectedFilter] = useState('Upcoming');

  const appointments = [
    {
      id: '1',
      doctor: {
        name: 'Dr. Sarah Wilson',
        specialty: 'Cardiology',
        avatar: 'SW',
      },
      date: 'Today',
      time: '2:30 PM',
      type: 'Video Consultation',
    },
    {
      id: '2',
      doctor: {
        name: 'Dr. Michael Chen',
        specialty: 'Endocrinology',
        avatar: 'MC',
      },
      date: 'Tomorrow',
      time: '10:00 AM',
      type: 'In-Person',
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Appointments</Text>
        </View>

        <View style={styles.filterContainer}>
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterButton,
                selectedFilter === filter && styles.filterButtonActive,
              ]}
              onPress={() => setSelectedFilter(filter)}
            >
              <Text
                style={[
                  styles.filterButtonText,
                  selectedFilter === filter && styles.filterButtonTextActive,
                ]}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {appointments.map((appointment) => (
          <Card
            key={appointment.id}
            style={styles.appointmentCard}
            onPress={() => navigation.navigate('AppointmentDetails', { appointmentId: appointment.id })}
          >
            <View style={styles.appointmentHeader}>
              <View style={styles.doctorInfo}>
                <View style={styles.doctorAvatar}>
                  <Text style={{ color: colors.primary.main, fontWeight: '600' }}>
                    {appointment.doctor.avatar}
                  </Text>
                </View>
                <View>
                  <Text style={styles.doctorName}>{appointment.doctor.name}</Text>
                  <Text style={styles.doctorSpecialty}>
                    {appointment.doctor.specialty}
                  </Text>
                </View>
              </View>
              <Text style={styles.appointmentTime}>
                {appointment.date} • {appointment.time}
              </Text>
            </View>
            <View style={styles.appointmentActions}>
              <PaperButton
                mode="outlined"
                style={styles.actionButton}
                onPress={() => navigation.navigate('Teleconsultation', { doctorId: appointment.id })}
              >
                Join Call
              </PaperButton>
              <PaperButton
                mode="outlined"
                style={styles.actionButton}
                onPress={() => setVisible(true)}
              >
                Reschedule
              </PaperButton>
            </View>
          </Card>
        ))}
      </ScrollView>

      <Portal>
        <Modal
          visible={visible}
          onDismiss={() => setVisible(false)}
          contentContainerStyle={styles.modalContainer}
        >
          <Text style={styles.modalTitle}>Reschedule Appointment</Text>
          {/* Add date and time picker components here */}
          <View style={styles.modalActions}>
            <PaperButton
              mode="outlined"
              onPress={() => setVisible(false)}
              style={styles.modalButton}
            >
              Cancel
            </PaperButton>
            <PaperButton
              mode="contained"
              onPress={() => setVisible(false)}
              style={styles.modalButton}
            >
              Confirm
            </PaperButton>
          </View>
        </Modal>
      </Portal>

      <FAB
        icon="plus"
        style={{
          position: 'absolute',
          margin: 16,
          right: 0,
          bottom: 0,
          backgroundColor: colors.primary.main,
        }}
        onPress={() => {
          // Handle new appointment
        }}
      />
    </View>
  );
}; 