import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Plus, MapPin, Calendar, Sprout, Droplets } from 'lucide-react-native';
import FieldCard from '@/components/FieldCard';
import AddFieldModal from '@/components/AddFieldModal';
import { useLanguage } from '@/contexts/LanguageContext';
import { useFieldContext } from '@/contexts/FieldContext';

export default function Fields() {
  const { t } = useLanguage();
  const [modalVisible, setModalVisible] = useState(false);
  const [fields, setFields] = useState([
  ]);

  const addField = (fieldData: any) => {
    const newField = {
      id: Date.now(),
      ...fieldData,
      phLevel: 7.0,
      moisture: 65,
      status: 'healthy',
    };
    setFields([...fields, newField]);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return '#22C55E';
      case 'needs_attention': return '#F59E0B';
      case 'critical': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'healthy': return t('healthy');
      case 'needs_attention': return t('needsAttention');
      case 'critical': return t('critical');
      default: return 'Unknown';
    }
  };

  const totalArea = fields.reduce((sum, field) => {
    return sum + parseFloat(field.area.split(' ')[0]);
  }, 0);
  
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>{t('myFields')}</Text>
          <Text style={styles.headerSubtitle}>{fields.length} {t('fields')} • {totalArea} {t('acres')} total</Text>
        </View>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
          <Plus size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Quick Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Sprout size={20} color="#22C55E" />
          <Text style={styles.statValue}>{fields.filter(f => f.status === 'healthy').length}</Text>
          <Text style={styles.statLabel}>{t('healthy')}</Text>
        </View>
        <View style={styles.statCard}>
          <Calendar size={20} color="#F59E0B" />
          <Text style={styles.statValue}>{fields.filter(f => f.status === 'needs_attention').length}</Text>
          <Text style={styles.statLabel}>{t('needsAttention')}</Text>
        </View>
        <View style={styles.statCard}>
          <MapPin size={20} color="#3B82F6" />
          <Text style={styles.statValue}>{totalArea}</Text>
          <Text style={styles.statLabel}>{t('totalAcres')}</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        <View style={styles.fieldsContainer}>
          {fields.map((field) => (
            <FieldCard
              key={field.id}
              field={field}
              statusColor={getStatusColor(field.status)}
              statusText={getStatusText(field.status)}
            />
          ))}
        </View>
        
        <View style={{ height: 20 }} />
      </ScrollView>

      <AddFieldModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAdd={addField}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  addButton: {
    backgroundColor: '#22C55E',
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 4,
  },
  scrollView: {
    flex: 1,
  },
  fieldsContainer: {
    paddingHorizontal: 20,
  },
});