import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Plus, Droplets, ThermometerSun, TriangleAlert as AlertTriangle, TrendingUp } from 'lucide-react-native';
import PHMeter from '@/components/PHMeter';
import MetricCard from '@/components/MetricCard';
import RecommendationCard from '@/components/RecommendationCard';
import AddPHModal from '@/components/AddPHModal';
import { useLanguage } from '@/contexts/LanguageContext';

const { width } = Dimensions.get('window');

export default function Dashboard() {
  const { t } = useLanguage();
  const [modalVisible, setModalVisible] = useState(false);
  const [phReadings, setPHReadings] = useState([
  ]);
  const [currentProfile] = useState({
    name: 'Farmer Singh',
    farmName: 'Green Valley Farm'
  });

  const currentPH = phReadings[0]?.value || 0;
  const phStatus = currentPH < 6.0 ? t('acidic') : currentPH > 8.0 ? t('alkaline') : t('optimal');
  const phColor = currentPH < 6.0 ? '#EF4444' : currentPH > 8.0 ? '#F59E0B' : '#22C55E';

  const addPHReading = (value: number, field: string) => {
    const newReading = {
      id: Date.now(),
      value,
      date: new Date().toISOString().split('T')[0],
      field,
    };
    setPHReadings([newReading, ...phReadings]);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>{t('welcomeBack')}</Text>
          <Text style={styles.farmerName}>{currentProfile.name}</Text>
        </View>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
          <Plus size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {/* pH Level Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('currentSoilPH')}</Text>
          <PHMeter value={currentPH} status={phStatus} color={phColor} />
        </View>

        {/* Metrics Grid */}
        <View style={styles.metricsContainer}>
          <MetricCard
            icon={<Droplets size={24} color="#3B82F6" />}
            title={t('moistureLevel')}
            value="68%"
            trend="+5%"
            trendColor="#22C55E"
          />
          <MetricCard
            icon={<ThermometerSun size={24} color="#F59E0B" />}
            title={t('soilTemp')}
            value="24°C"
            trend="+2°C"
            trendColor="#22C55E"
          />
        </View>

        <View style={styles.metricsRow}>
          <MetricCard
            icon={<TrendingUp size={24} color="#22C55E" />}
            title={t('fieldsActive')}
            value="3"
            trend="100%"
            trendColor="#22C55E"
          />
          <MetricCard
            icon={<AlertTriangle size={24} color="#EF4444" />}
            title={t('alerts')}
            value="2"
            trend={t('new')}
            trendColor="#EF4444"
          />
        </View>

        {/* Smart Recommendations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('smartRecommendations')}</Text>
          <RecommendationCard
            title={t('reduceNitrogenFertilizer')}
            description={t('nitrogenRecommendation')}
            priority="medium"
            field="North Field"
          />
          <RecommendationCard
            title={t('weatherAlert')}
            description={t('weatherRecommendation')}
            priority="high"
            field={t('allFields')}
          />
        </View>

        {/* Recent pH Readings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('recentPHReadings')}</Text>
          {phReadings.slice(0, 3).map((reading) => (
            <View key={reading.id} style={styles.readingCard}>
              <View style={styles.readingHeader}>
                <Text style={styles.fieldName}>{reading.field}</Text>
                <Text style={styles.readingDate}>{reading.date}</Text>
              </View>
              <View style={styles.readingContent}>
                <Text style={styles.phValue}>pH {reading.value}</Text>
                <View style={[
                  styles.statusBadge,
                  { backgroundColor: reading.value < 6.0 ? '#FEE2E2' : reading.value > 8.0 ? '#FEF3C7' : '#DCFCE7' }
                ]}>
                  <Text style={[
                    styles.statusText,
                    { color: reading.value < 6.0 ? '#DC2626' : reading.value > 8.0 ? '#D97706' : '#16A34A' }
                  ]}>
                    {reading.value < 6.0 ? t('acidic') : reading.value > 8.0 ? t('alkaline') : t('optimal')}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>

      <AddPHModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAdd={addPHReading}
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
  welcomeText: {
    fontSize: 16,
    color: '#6B7280',
  },
  farmerName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  addButton: {
    backgroundColor: '#22C55E',
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  metricsGrid: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginTop: 12,
  },
  readingCard: {
    backgroundColor: '#FFFFFF',
     borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  readingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  fieldName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  readingDate: {
    fontSize: 14,
    color: '#6B7280',
  },
  readingContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  phValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
});