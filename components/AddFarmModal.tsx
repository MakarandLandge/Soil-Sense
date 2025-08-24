import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Modal, 
  TouchableOpacity, 
  TextInput, 
  Alert,
  ScrollView 
} from 'react-native';
import { X, MapPin } from 'lucide-react-native';
import { useLanguage } from '@/contexts/LanguageContext';

interface AddFarmModalProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (farmData: any) => void;
}

export default function AddFarmModal({ visible, onClose, onAdd }: AddFarmModalProps) {
  const { t } = useLanguage();
  const [farmName, setFarmName] = useState('');
  const [location, setLocation] = useState('');
  const [totalArea, setTotalArea] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [soilType, setSoilType] = useState('');

  const soilTypes = [
    { key: 'loamy', label: t('loamy') },
    { key: 'clay', label: t('clay') },
    { key: 'sandy', label: t('sandy') },
    { key: 'silt', label: t('silt') },
    { key: 'peaty', label: t('peaty') },
    { key: 'chalky', label: t('chalky') },
  ];

  const resetForm = () => {
    setFarmName('');
    setLocation('');
    setTotalArea('');
    setOwnerName('');
    setContactNumber('');
    setSoilType('');
  };

  const handleSubmit = () => {
    if (!farmName || !location || !totalArea) {
      Alert.alert(t('missingInformation'), t('fillRequiredFields'));
      return;
    }

    const farmData = {
      name: farmName,
      location,
      totalArea: totalArea + ' ' + t('acres'),
      ownerName: ownerName || t('notSpecified'),
      contactNumber: contactNumber || t('notSpecified'),
      soilType: soilType || t('notSpecified'),
      fieldsCount: 0,
      createdDate: new Date().toISOString().split('T')[0],
    };

    onAdd(farmData);
    resetForm();
    onClose();
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
            <Text style={styles.title}>{t('addNewFarm')}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>{t('farmName')} *</Text>
              <TextInput
                style={styles.input}
                value={farmName}
                onChangeText={setFarmName}
                placeholder="e.g., Green Valley Farm"
                autoFocus
              />
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

            <View style={styles.inputGroup}>
              <Text style={styles.label}>{t('totalArea')} *</Text>
              <TextInput
                style={styles.input}
                value={totalArea}
                onChangeText={setTotalArea}
                placeholder="e.g., 10.5"
                keyboardType="decimal-pad"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>{t('ownerName')}</Text>
              <TextInput
                style={styles.input}
                value={ownerName}
                onChangeText={setOwnerName}
                placeholder="Farm owner's name"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>{t('contactNumber')}</Text>
              <TextInput
                style={styles.input}
                value={contactNumber}
                onChangeText={setContactNumber}
                placeholder="Mobile number"
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>{t('primarySoilType')}</Text>
              <View style={styles.soilGrid}>
                {soilTypes.map((type) => (
                  <TouchableOpacity
                    key={type.key}
                    style={[
                      styles.soilButton,
                      soilType === type.label && styles.soilButtonActive
                    ]}
                    onPress={() => setSoilType(type.label)}
                  >
                    <Text style={[
                      styles.soilButtonText,
                      soilType === type.label && styles.soilButtonTextActive
                    ]}>
                      {type.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>{t('cancel')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>{t('addFarm')}</Text>
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
    maxHeight: '85%',
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
    maxHeight: 450,
    paddingHorizontal: 20,
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
  soilGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  soilButton: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
  },
  soilButtonActive: {
    backgroundColor: '#22C55E',
    borderColor: '#22C55E',
  },
  soilButtonText: {
    fontSize: 14,
    color: '#6B7280',
  },
  soilButtonTextActive: {
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