import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Plus, Building2, MapPin, Layers } from 'lucide-react-native';
import FarmCard from '@/components/FarmCard';
import AddFarmModal from '@/components/AddFarmModal';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Farms() {
  const { t } = useLanguage();
  const [modalVisible, setModalVisible] = useState(false);
  const [farms, setFarms] = useState([
  ]);

  const addFarm = (farmData: any) => {
    const newFarm = {
      id: Date.now(),
      ...farmData,
    };
    setFarms([...farms, newFarm]);
  };

  const handleFarmPress = (farm: any) => {
    Alert.alert(
      farm.name,
      `${t('location')}: ${farm.location}\n${t('area')}: ${farm.totalArea}\n${t('fields')}: ${farm.fieldsCount}\n${t('owner')}: ${farm.ownerName}`,
      [
        { text: t('viewDetails'), onPress: () => {} },
        { text: t('ok'), style: 'cancel' },
      ]
    );
  };

  const totalArea = farms.reduce((sum, farm) => {
    return sum + parseFloat(farm.totalArea.split(' ')[0]);
  }, 0);

  const totalFields = farms.reduce((sum, farm) => sum + farm.fieldsCount, 0);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>{t('myFarms')}</Text>
          <Text style={styles.headerSubtitle}>{farms.length} {t('farms')} • {totalArea} {t('acres')} total</Text>
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
          <Building2 size={20} color="#22C55E" />
          <Text style={styles.statValue}>{farms.length}</Text>
          <Text style={styles.statLabel}>{t('totalFarms')}</Text>
        </View>
        <View style={styles.statCard}>
          <Layers size={20} color="#3B82F6" />
          <Text style={styles.statValue}>{totalFields}</Text>
          <Text style={styles.statLabel}>{t('totalFields')}</Text>
        </View>
        <View style={styles.statCard}>
          <MapPin size={20} color="#F59E0B" />
          <Text style={styles.statValue}>{totalArea}</Text>
          <Text style={styles.statLabel}>{t('totalAcres')}</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        <View style={styles.farmsContainer}>
          {farms.map((farm) => (
            <FarmCard
              key={farm.id}
              farm={farm}
              onPress={() => handleFarmPress(farm)}
            />
          ))}
        </View>
        
        <View style={{ height: 20 }} />
      </ScrollView>

      <AddFarmModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAdd={addFarm}
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
  farmsContainer: {
    paddingHorizontal: 20,
  },
});