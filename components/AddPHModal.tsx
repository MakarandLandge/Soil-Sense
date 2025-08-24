import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Modal, 
  TouchableOpacity, 
  TextInput, 
  Alert 
} from 'react-native';
import { X } from 'lucide-react-native';
import { useLanguage } from '@/contexts/LanguageContext';

interface AddPHModalProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (value: number, field: string) => void;
}

export default function AddPHModal({ visible, onClose, onAdd }: AddPHModalProps) {
  const { t } = useLanguage();
  const [phValue, setPHValue] = useState('');
  const [selectedField, setSelectedField] = useState('North Field');

  const fields = ['North Field', 'South Field', 'East Field'];

  const handleSubmit = () => {
    const value = parseFloat(phValue);
    
    if (isNaN(value) || value < 0 || value > 14) {
      Alert.alert(t('invalidPHValue'), t('enterPHBetween'));
      return;
    }

    onAdd(value, selectedField);
    setPHValue('');
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
            <Text style={styles.title}>{t('addPHReading')}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <View style={styles.content}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>{t('phValue')}</Text>
              <TextInput
                style={styles.input}
                value={phValue}
                onChangeText={setPHValue}
                placeholder="Enter pH value"
                keyboardType="decimal-pad"
                autoFocus
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>{t('selectField')}</Text>
              <View style={styles.fieldButtons}>
                {fields.map((field) => (
                  <TouchableOpacity
                    key={field}
                    style={[
                      styles.fieldButton,
                      selectedField === field && styles.fieldButtonActive
                    ]}
                    onPress={() => setSelectedField(field)}
                  >
                    <Text style={[
                      styles.fieldButtonText,
                      selectedField === field && styles.fieldButtonTextActive
                    ]}>
                      {field}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          <View style={styles.footer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>{t('cancel')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>{t('addReading')}</Text>
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
    padding: 20,
  },
  inputGroup: {
    marginBottom: 24,
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
  fieldButtons: {
    gap: 8,
  },
  fieldButton: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#FFFFFF',
  },
  fieldButtonActive: {
    backgroundColor: '#22C55E',
    borderColor: '#22C55E',
  },
  fieldButtonText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  fieldButtonTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
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