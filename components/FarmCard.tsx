import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MapPin, Calendar, Layers, Phone, ChevronRight } from 'lucide-react-native';

interface Farm {
  id: number;
  name: string;
  location: string;
  totalArea: string;
  ownerName: string;
  contactNumber: string;
  soilType: string;
  fieldsCount: number;
  createdDate: string;
}

interface FarmCardProps {
  farm: Farm;
  onPress: () => void;
}

export default function FarmCard({ farm, onPress }: FarmCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.header}>
        <View style={styles.titleSection}>
          <View style={styles.nameRow}>
            <Text style={styles.farmName}>{farm.name}</Text>
            <ChevronRight size={20} color="#9CA3AF" />
          </View>
          <View style={styles.locationRow}>
            <MapPin size={14} color="#6B7280" />
            <Text style={styles.location}>{farm.location}</Text>
          </View>
        </View>
      </View>

      <View style={styles.infoGrid}>
        <View style={styles.infoItem}>
          <Layers size={16} color="#22C55E" />
          <Text style={styles.infoLabel}>Area</Text>
          <Text style={styles.infoValue}>{farm.totalArea}</Text>
        </View>
        
        <View style={styles.infoItem}>
          <Calendar size={16} color="#3B82F6" />
          <Text style={styles.infoLabel}>Fields</Text>
          <Text style={styles.infoValue}>{farm.fieldsCount}</Text>
        </View>
      </View>

      <View style={styles.detailsRow}>
        <View style={styles.detail}>
          <Text style={styles.detailLabel}>Owner:</Text>
          <Text style={styles.detailValue}>{farm.ownerName}</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.detailLabel}>Soil:</Text>
          <Text style={styles.detailValue}>{farm.soilType}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.createdDate}>Added {formatDate(farm.createdDate)}</Text>
        {farm.contactNumber !== 'Not specified' && (
          <View style={styles.contactInfo}>
            <Phone size={12} color="#6B7280" />
            <Text style={styles.contactText}>{farm.contactNumber}</Text>
          </View>
        )}
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  header: {
    marginBottom: 16,
  },
  titleSection: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  farmName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  location: {
    fontSize: 14,
    color: '#6B7280',
  },
  infoGrid: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  infoItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 12,
    gap: 8,
  },
  infoLabel: {
    flex: 1,
    fontSize: 12,
    color: '#6B7280',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detail: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  createdDate: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  contactText: {
    fontSize: 12,
    color: '#6B7280',
  },
});