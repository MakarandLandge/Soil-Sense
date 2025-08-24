import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { User, Phone, MapPin, CreditCard as Edit3, Trash2, CircleCheck as CheckCircle } from 'lucide-react-native';

interface Profile {
  id: number;
  name: string;
  email: string;
  phone: string;
  location: string;
  farmName: string;
  experience: string;
  specialization: string;
  avatar?: string;
}

interface ProfileCardProps {
  profile: Profile;
  isActive: boolean;
  onSelect: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export default function ProfileCard({ profile, isActive, onSelect, onEdit, onDelete }: ProfileCardProps) {
  return (
    <TouchableOpacity 
      style={[styles.container, isActive && styles.activeContainer]} 
      onPress={onSelect}
    >
      {/* Header with Avatar and Actions */}
      <View style={styles.header}>
        <View style={styles.avatarSection}>
          <View style={[styles.avatar, isActive && styles.activeAvatar]}>
            <User size={24} color={isActive ? '#FFFFFF' : '#6B7280'} />
          </View>
          <View style={styles.nameSection}>
            <View style={styles.nameRow}>
              <Text style={[styles.name, isActive && styles.activeName]}>{profile.name}</Text>
              {isActive && <CheckCircle size={16} color="#22C55E" />}
            </View>
            <Text style={styles.farmName}>{profile.farmName}</Text>
          </View>
        </View>
        
        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionButton} onPress={onEdit}>
            <Edit3 size={16} color="#6B7280" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={onDelete}>
            <Trash2 size={16} color="#EF4444" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Profile Details */}
      <View style={styles.details}>
        <View style={styles.detailRow}>
          <Phone size={14} color="#6B7280" />
          <Text style={styles.detailText}>{profile.phone}</Text>
        </View>
        <View style={styles.detailRow}>
          <MapPin size={14} color="#6B7280" />
          <Text style={styles.detailText}>{profile.location}</Text>
        </View>
      </View>

      {/* Experience and Specialization */}
      <View style={styles.badges}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{profile.experience}</Text>
        </View>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{profile.specialization}</Text>
        </View>
      </View>

      {isActive && (
        <View style={styles.activeIndicator}>
          <Text style={styles.activeText}>Current Profile</Text>
        </View>
      )}
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
  activeContainer: {
    borderColor: '#22C55E',
    borderWidth: 2,
    backgroundColor: '#F0FDF4',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  avatarSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  activeAvatar: {
    backgroundColor: '#22C55E',
    borderColor: '#22C55E',
  },
  nameSection: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  activeName: {
    color: '#22C55E',
  },
  farmName: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#F9FAFB',
  },
  details: {
    marginBottom: 12,
    gap: 6,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#6B7280',
  },
  badges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  badge: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  activeIndicator: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#22C55E',
    alignItems: 'center',
  },
  activeText: {
    fontSize: 12,
    color: '#22C55E',
    fontWeight: '600',
  },
});