import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Modal, 
  TouchableOpacity, 
  TextInput, 
  Alert,
  ScrollView,
  Image 
} from 'react-native';
import { X, Camera, User, Phone, Mail, MapPin } from 'lucide-react-native';
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

interface ProfileModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (profileData: Profile) => void;
  editingProfile?: Profile | null;
}

export default function ProfileModal({ visible, onClose, onSave, editingProfile }: ProfileModalProps) {
  const { t } = useLanguage();
  const [name, setName] = useState(editingProfile?.name || '');
  const [email, setEmail] = useState(editingProfile?.email || '');
  const [phone, setPhone] = useState(editingProfile?.phone || '');
  const [location, setLocation] = useState(editingProfile?.location || '');
  const [farmName, setFarmName] = useState(editingProfile?.farmName || '');
  const [experience, setExperience] = useState(editingProfile?.experience || '');
  const [specialization, setSpecialization] = useState(editingProfile?.specialization || '');

  const specializations = [
    { key: 'organicFarming', label: t('organicFarming') },
    { key: 'cropRotation', label: t('cropRotation') },
    { key: 'soilManagement', label: t('soilManagement') },
    { key: 'irrigation', label: t('irrigation') },
    { key: 'pestControl', label: t('pestControl') },
    { key: 'dairyFarming', label: t('dairyFarming') },
  ];

  const experienceLevels = [
    { key: 'beginner', label: t('beginner') },
    { key: 'intermediate', label: t('intermediate') },
    { key: 'expert', label: t('expert') },
  ];

  const resetForm = () => {
    setName('');
    setEmail('');
    setPhone('');
    setLocation('');
    setFarmName('');
    setExperience('');
    setSpecialization('');
  };

  const handleSubmit = () => {
    if (!name || !phone || !location) {
      Alert.alert(t('missingInformation'), t('namePhoneLocationRequired'));
      return;
    }

    const profileData: Profile = {
      id: editingProfile?.id || Date.now(),
      name,
      email: email || t('notSpecified'),
      phone,
      location,
      farmName: farmName || t('notSpecified'),
      experience: experience || t('notSpecified'),
      specialization: specialization || t('generalFarming'),
    };

    onSave(profileData);
    if (!editingProfile) resetForm();
    onClose();
  };

  const handleClose = () => {
    if (!editingProfile) resetForm();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>
              {editingProfile ? t('editProfile') : t('createNewProfile')}
            </Text>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <X size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {/* Avatar Section */}
            <View style={styles.avatarSection}>
              <View style={styles.avatarContainer}>
                <View style={styles.avatar}>
                  <User size={40} color="#6B7280" />
                </View>
                <TouchableOpacity style={styles.cameraButton}>
                  <Camera size={16} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
              <Text style={styles.avatarText}>{t('addPhoto')}</Text>
            </View>

            {/* Basic Information */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{t('basicInformation')}</Text>
              
              <View style={styles.inputGroup}>
                <Text style={styles.label}>{t('fullName')} *</Text>
                <View style={styles.inputWithIcon}>
                  <User size={20} color="#6B7280" style={styles.inputIcon} />
                  <TextInput
                    style={[styles.input, styles.inputWithIconText]}
                    value={name}
                    onChangeText={setName}
                    placeholder="Enter full name"
                    autoFocus={!editingProfile}
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>{t('phoneNumber')} *</Text>
                <View style={styles.inputWithIcon}>
                  <Phone size={20} color="#6B7280" style={styles.inputIcon} />
                  <TextInput
                    style={[styles.input, styles.inputWithIconText]}
                    value={phone}
                    onChangeText={setPhone}
                    placeholder="Mobile number"
                    keyboardType="phone-pad"
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>{t('emailAddress')}</Text>
                <View style={styles.inputWithIcon}>
                  <Mail size={20} color="#6B7280" style={styles.inputIcon} />
                  <TextInput
                    style={[styles.input, styles.inputWithIconText]}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Email address (optional)"
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>{t('location')} *</Text>
                <View style={styles.inputWithIcon}>
                  <MapPin size={20} color="#6B7280" style={styles.inputIcon} />
                  <TextInput
                    style={[styles.input, styles.inputWithIconText]}
                    value={location}
                    onChangeText={setLocation}
                    placeholder="Village, District, State"
                  />
                </View>
              </View>
            </View>

            {/* Farm Information */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{t('farmInformation')}</Text>
              
              <View style={styles.inputGroup}>
                <Text style={styles.label}>{t('primaryFarmName')}</Text>
                <TextInput
                  style={styles.input}
                  value={farmName}
                  onChangeText={setFarmName}
                  placeholder="Main farm name (optional)"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>{t('farmingExperience')}</Text>
                <View style={styles.optionGrid}>
                  {experienceLevels.map((level) => (
                    <TouchableOpacity
                      key={level.key}
                      style={[
                        styles.optionButton,
                        experience === level.label && styles.optionButtonActive
                      ]}
                      onPress={() => setExperience(level.label)}
                    >
                      <Text style={[
                        styles.optionButtonText,
                        experience === level.label && styles.optionButtonTextActive
                      ]}>
                        {level.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>{t('specialization')}</Text>
                <View style={styles.optionGrid}>
                  {specializations.map((spec) => (
                    <TouchableOpacity
                      key={spec.key}
                      style={[
                        styles.optionButton,
                        specialization === spec.label && styles.optionButtonActive
                      ]}
                      onPress={() => setSpecialization(spec.label)}
                    >
                      <Text style={[
                        styles.optionButtonText,
                        specialization === spec.label && styles.optionButtonTextActive
                      ]}>
                        {spec.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity style={styles.cancelButton} onPress={handleClose}>
              <Text style={styles.cancelButtonText}>{t('cancel')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>
                {editingProfile ? t('updateProfile') : t('createProfile')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  closeButton: {
    padding: 4,
  },
  content: {
    maxHeight: 500,
  },
  avatarSection: {
    alignItems: 'center',
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 8,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#E5E7EB',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#22C55E',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  avatarText: {
    fontSize: 14,
    color: '#6B7280',
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#F9FAFB',
  },
  inputWithIcon: {
    position: 'relative',
  },
  inputIcon: {
    position: 'absolute',
    left: 12,
    top: 12,
    zIndex: 1,
  },
  inputWithIconText: {
    paddingLeft: 40,
  },
  optionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  optionButton: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
    marginBottom: 8,
  },
  optionButtonActive: {
    backgroundColor: '#22C55E',
    borderColor: '#22C55E',
  },
  optionButtonText: {
    fontSize: 14,
    color: '#6B7280',
  },
  optionButtonTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#6B7280',
  },
  submitButton: {
    flex: 1,
    backgroundColor: '#22C55E',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});