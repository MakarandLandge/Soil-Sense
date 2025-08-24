import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Modal, 
  TouchableOpacity, 
  ScrollView,
  Alert 
} from 'react-native';
import { X, Plus, Users } from 'lucide-react-native';
import ProfileCard from './ProfileCard';
import ProfileModal from './ProfileModal';
import { useLanguage } from '@/contexts/LanguageContext';

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

interface ProfileManagementModalProps {
  visible: boolean;
  onClose: () => void;
  profiles: Profile[];
  activeProfileId: number;
  onProfilesUpdate: (profiles: Profile[]) => void;
  onActiveProfileChange: (profileId: number) => void;
}

export default function ProfileManagementModal({ 
  visible, 
  onClose, 
  profiles, 
  activeProfileId, 
  onProfilesUpdate,
  onActiveProfileChange 
}: ProfileManagementModalProps) {
  const { t, tf } = useLanguage();
  const [profileModalVisible, setProfileModalVisible] = useState(false);
  const [editingProfile, setEditingProfile] = useState<Profile | null>(null);

  const handleAddProfile = () => {
    setEditingProfile(null);
    setProfileModalVisible(true);
  };

  const handleEditProfile = (profile: Profile) => {
    setEditingProfile(profile);
    setProfileModalVisible(true);
  };

  const handleDeleteProfile = (profile: Profile) => {
    if (profiles.length === 1) {
      Alert.alert(t('cannotDelete'), 'You must have at least one profile');
      return;
    }

    Alert.alert(
      t('deleteProfile'),
      tf('deleteConfirmation', { name: profile.name }),
      [
        { text: t('cancel'), style: 'cancel' },
        { 
          text: t('delete'), 
          style: 'destructive',
          onPress: () => {
            const updatedProfiles = profiles.filter(p => p.id !== profile.id);
            onProfilesUpdate(updatedProfiles);
            
            // If deleting active profile, switch to first available
            if (profile.id === activeProfileId && updatedProfiles.length > 0) {
              onActiveProfileChange(updatedProfiles[0].id);
            }
          }
        },
      ]
    );
  };

  const handleSaveProfile = (profileData: Profile) => {
    if (editingProfile) {
      // Update existing profile
      const updatedProfiles = profiles.map(p => 
        p.id === editingProfile.id ? profileData : p
      );
      onProfilesUpdate(updatedProfiles);
    } else {
      // Add new profile
      onProfilesUpdate([...profiles, profileData]);
    }
  };

  const handleSelectProfile = (profileId: number) => {
    onActiveProfileChange(profileId);
    Alert.alert(t('profileSwitched'), t('profileChanged'));
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.titleSection}>
              <Users size={24} color="#22C55E" />
              <Text style={styles.title}>{t('manageProfiles')}</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <View style={styles.statsSection}>
            <Text style={styles.statsText}>
              {profiles.length} {t('profilesCount')}{profiles.length !== 1 ? 's' : ''} • 
              {t('active')}: {profiles.find(p => p.id === activeProfileId)?.name}
            </Text>
            <TouchableOpacity style={styles.addButton} onPress={handleAddProfile}>
              <Plus size={20} color="#FFFFFF" />
              <Text style={styles.addButtonText}>{t('addProfile')}</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            <View style={styles.profilesList}>
              {profiles.map((profile) => (
                <ProfileCard
                  key={profile.id}
                  profile={profile}
                  isActive={profile.id === activeProfileId}
                  onSelect={() => handleSelectProfile(profile.id)}
                  onEdit={() => handleEditProfile(profile)}
                  onDelete={() => handleDeleteProfile(profile)}
                />
              ))}
            </View>

            <View style={styles.infoSection}>
              <Text style={styles.infoTitle}>{t('aboutMultipleProfiles')}</Text>
              <Text style={styles.infoText}>
                {t('multipleProfilesDescription')}
              </Text>
            </View>
          </ScrollView>
        </View>
      </View>

      <ProfileModal
        visible={profileModalVisible}
        onClose={() => setProfileModalVisible(false)}
        onSave={handleSaveProfile}
        editingProfile={editingProfile}
      />
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '90%',
    paddingBottom: 34,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  titleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  closeButton: {
    padding: 4,
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#F9FAFB',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  statsText: {
    fontSize: 14,
    color: '#6B7280',
    flex: 1,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#22C55E',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  content: {
    maxHeight: 500,
  },
  profilesList: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  infoSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#F9FAFB',
    marginTop: 16,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
});