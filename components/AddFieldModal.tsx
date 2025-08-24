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
import { X } from 'lucide-react-native';
import { useLanguage } from '@/contexts/LanguageContext';

interface AddFieldModalProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (fieldData: any) => void;
}

export default function AddFieldModal({ visible, onClose, onAdd }: AddFieldModalProps) {
  const { t } = useLanguage();
  const [fieldName, setFieldName] = useState('');
  const [crop, setCrop] = useState('');
  const [variety, setVariety] = useState('');
  const [area, setArea] = useState('');
  const [sowingDate, setSowingDate] = useState('');

  const crops = [
    { key: 'wheat', label: t('wheat') },
    { key: 'rice', label: t('rice') },
    { key: 'maize', label: t('maize') },
    { key: 'cotton', label: t('cotton') },
    { key: 'sugarcane', label: t('sugarcane') },
    { key: 'soybean', label: t('soybean') },
  ];

  const resetForm = () => {
    setFieldName('');
    setCrop('');
    setVariety('');
    setArea('');
    setSowingDate('');
  };

  const handleSubmit = () => {
    if (!fieldName || !crop || !area) {
      Alert.alert(t('missingInformation'), t('fillRequiredFields'));
      return;
    }

    const fieldData = {
      name: fieldName,
      crop,
      variety: variety || t('standard'),
      area: area + ' ' + t('acres'),
      sowingDate: sowingDate || new Date().toISOString().split('T')[0],
    };

    onAdd(fieldData);
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
            <Text style={styles.title}>{t('addNewField')}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>{t('fieldName')} *</Text>
              <TextInput
                style={styles.input}
                value={fieldName}
                onChangeText={setFieldName}
                placeholder="e.g., North Field"
                autoFocus
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>{t('cropType')} *</Text>
              <View style={styles.cropGrid}>
                {crops.map((cropType) => (
                  <TouchableOpacity
                    key={cropType.key}
                    style={[
                      styles.cropButton,
                      crop === cropType.label && styles.cropButtonActive
                    ]}
                    onPress={() => setCrop(cropType.label)}
                  >
                    <Text style={[
                      styles.cropButtonText,
                      crop === cropType.label && styles.cropButtonTextActive
                    ]}>
                      {cropType.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>{t('variety')}</Text>
              <TextInput
                style={styles.input}
                value={variety}
                onChangeText={setVariety}
                placeholder="e.g., HD-2967, Basmati-370"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>{t('area')} *</Text>
              <TextInput
                style={styles.input}
                value={area}
                onChangeText={setArea}
                placeholder="e.g., 2.5"
                keyboardType="decimal-pad"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>{t('sowingDate')}</Text>
              <TextInput
                style={styles.input}
                value={sowingDate}
                onChangeText={setSowingDate}
                placeholder="YYYY-MM-DD (optional)"
              />
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>{t('cancel')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>{t('addField')}</Text>
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
    maxHeight: '80%',
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
    maxHeight: 400,
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
  cropGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  cropButton: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
  },
  cropButtonActive: {
    backgroundColor: '#22C55E',
    borderColor: '#22C55E',
  },
  cropButtonText: {
    fontSize: 14,
    color: '#6B7280',
  },
  cropButtonTextActive: {
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