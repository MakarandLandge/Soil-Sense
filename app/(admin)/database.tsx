import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { 
  ArrowLeft, 
  Plus, 
  Database, 
  Building2, 
  BarChart3, 
  Activity,
  Trash2,
  Edit3
} from 'lucide-react-native';
import { databaseService } from '@/services/databaseService';

export default function DatabaseManagement() {
  const [farms, setFarms] = useState([]);
  const [fields, setFields] = useState([]);
  const [soilReadings, setSoilReadings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('farms');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [farmsData, fieldsData, readingsData] = await Promise.all([
        databaseService.getFarms(),
        databaseService.getFields(),
        databaseService.getSoilReadings(),
      ]);
      
      setFarms(farmsData);
      setFields(fieldsData);
      setSoilReadings(readingsData);
    } catch (error) {
      console.error('Error loading data:', error);
      Alert.alert('Error', 'Failed to load database data');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteFarm = async (farmId: string, farmName: string) => {
    Alert.alert(
      'Delete Farm',
      `Are you sure you want to delete "${farmName}"? This will also delete all associated fields and soil readings.`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: async () => {
            try {
              await databaseService.deleteFarm(farmId);
              await loadData();
              Alert.alert('Success', 'Farm deleted successfully');
            } catch (error) {
              Alert.alert('Error', 'Failed to delete farm');
            }
          }
        },
      ]
    );
  };

  const handleDeleteField = async (fieldId: string, fieldName: string) => {
    Alert.alert(
      'Delete Field',
      `Are you sure you want to delete "${fieldName}"? This will also delete all associated soil readings.`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: async () => {
            try {
              await databaseService.deleteField(fieldId);
              await loadData();
              Alert.alert('Success', 'Field deleted successfully');
            } catch (error) {
              Alert.alert('Error', 'Failed to delete field');
            }
          }
        },
      ]
    );
  };

  const TabButton = ({ 
    id, 
    title, 
    icon, 
    count 
  }: {
    id: string;
    title: string;
    icon: React.ReactNode;
    count: number;
  }) => (
    <TouchableOpacity
      style={[styles.tabButton, activeTab === id && styles.tabButtonActive]}
      onPress={() => setActiveTab(id)}
    >
      {icon}
      <Text style={[
        styles.tabButtonText,
        activeTab === id && styles.tabButtonTextActive
      ]}>
        {title} ({count})
      </Text>
    </TouchableOpacity>
  );

  const renderFarms = () => (
    <View style={styles.dataSection}>
      {farms.map((farm: any) => (
        <View key={farm.id} style={styles.dataCard}>
          <View style={styles.dataHeader}>
            <View>
              <Text style={styles.dataTitle}>{farm.name}</Text>
              <Text style={styles.dataSubtitle}>{farm.location}</Text>
            </View>
            <View style={styles.dataActions}>
              <TouchableOpacity style={styles.editButton}>
                <Edit3 size={16} color="#6B7280" />
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.deleteButton}
                onPress={() => handleDeleteFarm(farm.id, farm.name)}
              >
                <Trash2 size={16} color="#EF4444" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.dataDetails}>
            <Text style={styles.dataDetail}>Owner: {farm.owner_name}</Text>
            <Text style={styles.dataDetail}>Area: {farm.total_area} acres</Text>
            <Text style={styles.dataDetail}>Soil: {farm.soil_type || 'Not specified'}</Text>
          </View>
        </View>
      ))}
    </View>
  );

  const renderFields = () => (
    <View style={styles.dataSection}>
      {fields.map((field: any) => (
        <View key={field.id} style={styles.dataCard}>
          <View style={styles.dataHeader}>
            <View>
              <Text style={styles.dataTitle}>{field.name}</Text>
              <Text style={styles.dataSubtitle}>{field.crop_type}</Text>
            </View>
            <View style={styles.dataActions}>
              <TouchableOpacity style={styles.editButton}>
                <Edit3 size={16} color="#6B7280" />
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.deleteButton}
                onPress={() => handleDeleteField(field.id, field.name)}
              >
                <Trash2 size={16} color="#EF4444" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.dataDetails}>
            <Text style={styles.dataDetail}>Variety: {field.variety || 'Standard'}</Text>
            <Text style={styles.dataDetail}>Area: {field.area} acres</Text>
            <Text style={styles.dataDetail}>Status: {field.status}</Text>
          </View>
        </View>
      ))}
    </View>
  );

  const renderSoilReadings = () => (
    <View style={styles.dataSection}>
      {soilReadings.slice(0, 20).map((reading: any) => (
        <View key={reading.id} style={styles.dataCard}>
          <View style={styles.dataHeader}>
            <View>
              <Text style={styles.dataTitle}>pH {reading.ph_level}</Text>
              <Text style={styles.dataSubtitle}>
                {new Date(reading.recorded_at).toLocaleDateString()}
              </Text>
            </View>
          </View>
          <View style={styles.dataDetails}>
            <Text style={styles.dataDetail}>
              Moisture: {reading.moisture ? `${reading.moisture}%` : 'N/A'}
            </Text>
            <Text style={styles.dataDetail}>
              Temperature: {reading.temperature ? `${reading.temperature}°C` : 'N/A'}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#111827" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Database Management</Text>
          <Text style={styles.headerSubtitle}>Manage all system data</Text>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.tabs}>
            <TabButton
              id="farms"
              title="Farms"
              icon={<Building2 size={16} color={activeTab === 'farms' ? '#FFFFFF' : '#6B7280'} />}
              count={farms.length}
            />
            <TabButton
              id="fields"
              title="Fields"
              icon={<BarChart3 size={16} color={activeTab === 'fields' ? '#FFFFFF' : '#6B7280'} />}
              count={fields.length}
            />
            <TabButton
              id="readings"
              title="Readings"
              icon={<Activity size={16} color={activeTab === 'readings' ? '#FFFFFF' : '#6B7280'} />}
              count={soilReadings.length}
            />
          </View>
        </ScrollView>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading database data...</Text>
          </View>
        ) : (
          <>
            {activeTab === 'farms' && renderFarms()}
            {activeTab === 'fields' && renderFields()}
            {activeTab === 'readings' && renderSoilReadings()}
          </>
        )}
        
        <View style={{ height: 20 }} />
      </ScrollView>
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
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    marginRight: 16,
    padding: 4,
  },
  headerContent: {
    flex: 1,
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
  tabsContainer: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    gap: 6,
  },
  tabButtonActive: {
    backgroundColor: '#22C55E',
  },
  tabButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  tabButtonTextActive: {
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  loadingText: {
    fontSize: 16,
    color: '#6B7280',
  },
  dataSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  dataCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  dataHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  dataTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  dataSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  dataActions: {
    flexDirection: 'row',
    gap: 8,
  },
  editButton: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: '#F3F4F6',
  },
  deleteButton: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: '#FEE2E2',
  },
  dataDetails: {
    gap: 4,
  },
  dataDetail: {
    fontSize: 14,
    color: '#6B7280',
  },
});