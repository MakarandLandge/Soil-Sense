import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MapPin, Calendar, Sprout, Droplets, TestTube } from 'lucide-react-native';

interface Field {
  id: number;
  name: string;
  crop: string;
  area: string;
  sowingDate: string;
  phLevel: number;
  moisture: number;
  status: string;
  variety: string;
}

interface FieldCardProps {
  field: Field;
  statusColor: string;
  statusText: string;
}

export default function FieldCard({ field, statusColor, statusText }: FieldCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const daysSinceSowing = Math.floor(
    (new Date().getTime() - new Date(field.sowingDate).getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleSection}>
          <View style={styles.nameRow}>
            <MapPin size={16} color="#6B7280" />
            <Text style={styles.fieldName}>{field.name}</Text>
          </View>
          <Text style={styles.fieldArea}>{field.area}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: statusColor + '20' }]}>
          <Text style={[styles.statusText, { color: statusColor }]}>{statusText}</Text>
        </View>
      </View>

      <View style={styles.cropInfo}>
        <View style={styles.cropRow}>
          <Sprout size={20} color="#22C55E" />
          <View>
            <Text style={styles.cropName}>{field.crop}</Text>
            <Text style={styles.varietyName}>{field.variety}</Text>
          </View>
        </View>
        <View style={styles.dateInfo}>
          <Calendar size={14} color="#6B7280" />
          <Text style={styles.dateText}>
            Sown {formatDate(field.sowingDate)} • {daysSinceSowing} days
          </Text>
        </View>
      </View>

      <View style={styles.metricsRow}>
        <View style={styles.metric}>
          <TestTube size={16} color="#3B82F6" />
          <Text style={styles.metricLabel}>pH Level</Text>
          <Text style={styles.metricValue}>{field.phLevel}</Text>
        </View>
        <View style={styles.metric}>
          <Droplets size={16} color="#06B6D4" />
          <Text style={styles.metricLabel}>Moisture</Text>
          <Text style={styles.metricValue}>{field.moisture}%</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  titleSection: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  fieldName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  fieldArea: {
    fontSize: 14,
    color: '#6B7280',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  cropInfo: {
    marginBottom: 16,
  },
  cropRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  cropName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  varietyName: {
    fontSize: 14,
    color: '#6B7280',
  },
  dateInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dateText: {
    fontSize: 12,
    color: '#6B7280',
  },
  metricsRow: {
    flexDirection: 'row',
    gap: 16,
  },
  metric: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 12,
    gap: 8,
  },
  metricLabel: {
    flex: 1,
    fontSize: 12,
    color: '#6B7280',
  },
  metricValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
});