import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLanguage } from '@/contexts/LanguageContext';

interface PHMeterProps {
  value: number;
  status: string;
  color: string;
}

export default function PHMeter({ value, status, color }: PHMeterProps) {
  const { t } = useLanguage();
  // Convert pH value (0-14) to percentage for the meter
  const percentage = (value / 14) * 100;
  
  return (
    <View style={styles.container}>
      <View style={styles.meterContainer}>
        <View style={styles.meterBackground}>
          <View 
            style={[
              styles.meterFill, 
              { width: `${percentage}%`, backgroundColor: color }
            ]} 
          />
        </View>
        <View style={styles.scaleContainer}>
          {[0, 7, 14].map((mark) => (
            <View key={mark} style={styles.scaleMark}>
              <Text style={styles.scaleText}>{mark}</Text>
            </View>
          ))}
        </View>
      </View>
      
      <View style={styles.readingContainer}>
        <Text style={styles.phValue}>pH {value.toFixed(1)}</Text>
        <View style={[styles.statusBadge, { backgroundColor: color + '20' }]}>
          <Text style={[styles.statusText, { color }]}>{status}</Text>
        </View>
      </View>
      
      <View style={styles.rangeLabels}>
        <Text style={styles.rangeLabel}>{t('acidic')}</Text>
        <Text style={styles.rangeLabel}>{t('neutral')}</Text>
        <Text style={styles.rangeLabel}>{t('alkaline')}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  meterContainer: {
    marginBottom: 16,
  },
  meterBackground: {
    height: 12,
    backgroundColor: '#F3F4F6',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 8,
  },
  meterFill: {
    height: '100%',
    borderRadius: 6,
    minWidth: 4,
  },
  scaleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scaleMark: {
    alignItems: 'center',
  },
  scaleText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  readingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  phValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
  },
  rangeLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rangeLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
});