import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TriangleAlert as AlertTriangle, Info, CircleCheck as CheckCircle } from 'lucide-react-native';

interface RecommendationCardProps {
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  field: string;
}

export default function RecommendationCard({ title, description, priority, field }: RecommendationCardProps) {
  const getPriorityConfig = (priority: string) => {
    switch (priority) {
      case 'high':
        return {
          color: '#EF4444',
          backgroundColor: '#FEE2E2',
          icon: <AlertTriangle size={20} color="#EF4444" />,
        };
      case 'medium':
        return {
          color: '#F59E0B',
          backgroundColor: '#FEF3C7',
          icon: <Info size={20} color="#F59E0B" />,
        };
      case 'low':
        return {
          color: '#22C55E',
          backgroundColor: '#DCFCE7',
          icon: <CheckCircle size={20} color="#22C55E" />,
        };
      default:
        return {
          color: '#6B7280',
          backgroundColor: '#F3F4F6',
          icon: <Info size={20} color="#6B7280" />,
        };
    }
  };

  const config = getPriorityConfig(priority);

  return (
    <View style={[styles.container, { borderLeftColor: config.color }]}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          {config.icon}
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={[styles.priorityBadge, { backgroundColor: config.backgroundColor }]}>
          <Text style={[styles.priorityText, { color: config.color }]}>
            {priority.toUpperCase()}
          </Text>
        </View>
      </View>
      
      <Text style={styles.description}>{description}</Text>
      
      <View style={styles.footer}>
        <Text style={styles.fieldText}>Field: {field}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderLeftWidth: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  priorityText: {
    fontSize: 10,
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fieldText: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '500',
  },
});