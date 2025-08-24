import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const cardWidth = (width - 60) / 2; // Accounting for padding and gap

interface MetricCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  trend: string;
  trendColor: string;
}

export default function MetricCard({ icon, title, value, trend, trendColor }: MetricCardProps) {
  return (
    <View style={[styles.container, { width: cardWidth }]}>
      <View style={styles.header}>
        {icon}
        <Text style={[styles.trend, { color: trendColor }]}>{trend}</Text>
      </View>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  trend: {
    fontSize: 12,
    fontWeight: '600',
  },
  value: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  title: {
    fontSize: 14,
    color: '#6B7280',
  },
});