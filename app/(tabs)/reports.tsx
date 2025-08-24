import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Download, Calendar, FileText, Share, ChartBar as BarChart3, TrendingUp } from 'lucide-react-native';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Reports() {
  const { t } = useLanguage();
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');

  const reports = [
    {
      id: 1,
      title: 'January 2025 - Soil Analysis Report',
      period: 'Monthly',
      date: '2025-01-01',
      fields: 3,
      phReadings: 24,
      size: '2.3 MB',
    },
    {
      id: 2,
      title: 'Week 1 - Field Monitoring Report',
      period: 'Weekly',
      date: '2025-01-01',
      fields: 3,
      phReadings: 7,
      size: '856 KB',
    },
    {
      id: 3,
      title: 'December 2024 - Soil Analysis Report',
      period: 'Monthly',
      date: '2024-12-01',
      fields: 3,
      phReadings: 31,
      size: '2.8 MB',
    },
  ];

  const generateReport = (period: string) => {
    Alert.alert(
      t('generateReport'),
      `This will create a new ${period} report with current soil data, pH readings, and recommendations. Continue?`,
      [
        { text: t('cancel'), style: 'cancel' },
        { 
          text: t('generateReport'), 
          onPress: () => {
            // Simulate report generation
            Alert.alert(t('success'), `${period} report generated successfully!`);
          }
        },
      ]
    );
  };

  const downloadReport = (reportTitle: string) => {
    Alert.alert(t('download'), `Downloading ${reportTitle}...`);
  };

  const shareReport = (reportTitle: string) => {
    Alert.alert(t('share'), `Sharing ${reportTitle} via email/WhatsApp...`);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>{t('reports')}</Text>
          <Text style={styles.headerSubtitle}>{t('exportAndAnalyze')}</Text>
        </View>
      </View>

      {/* Generate Report Section */}
      <View style={styles.generateSection}>
        <Text style={styles.sectionTitle}>{t('generateNewReport')}</Text>
        <View style={styles.periodButtons}>
          <TouchableOpacity
            style={[
              styles.periodButton,
              selectedPeriod === 'weekly' && styles.periodButtonActive
            ]}
            onPress={() => setSelectedPeriod('weekly')}
          >
            <Calendar size={20} color={selectedPeriod === 'weekly' ? '#FFFFFF' : '#6B7280'} />
            <Text style={[
              styles.periodButtonText,
              selectedPeriod === 'weekly' && styles.periodButtonTextActive
            ]}>
              {t('weekly')}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.periodButton,
              selectedPeriod === 'monthly' && styles.periodButtonActive
            ]}
            onPress={() => setSelectedPeriod('monthly')}
          >
            <BarChart3 size={20} color={selectedPeriod === 'monthly' ? '#FFFFFF' : '#6B7280'} />
            <Text style={[
              styles.periodButtonText,
              selectedPeriod === 'monthly' && styles.periodButtonTextActive
            ]}>
              {t('monthly')}
            </Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity
          style={styles.generateButton}
          onPress={() => generateReport(selectedPeriod)}
        >
          <FileText size={20} color="#FFFFFF" />
          <Text style={styles.generateButtonText}>{t('generateReport')} {selectedPeriod}</Text>
        </TouchableOpacity>
      </View>

      {/* Report Summary */}
      <View style={styles.summarySection}>
        <Text style={styles.sectionTitle}>{t('quickStats')}</Text>
        <View style={styles.summaryGrid}>
          <View style={styles.summaryCard}>
            <TrendingUp size={24} color="#22C55E" />
            <Text style={styles.summaryValue}>62</Text>
            <Text style={styles.summaryLabel}>{t('totalPHReadings')}</Text>
          </View>
          <View style={styles.summaryCard}>
            <BarChart3 size={24} color="#3B82F6" />
            <Text style={styles.summaryValue}>8</Text>
            <Text style={styles.summaryLabel}>{t('reportsGenerated')}</Text>
          </View>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {/* Recent Reports */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('recentReports')}</Text>
          {reports.map((report) => (
            <View key={report.id} style={styles.reportCard}>
              <View style={styles.reportHeader}>
                <View style={styles.reportInfo}>
                  <Text style={styles.reportTitle}>{report.title}</Text>
                  <Text style={styles.reportMeta}>
                    {report.period} • {report.fields} fields • {report.phReadings} readings
                  </Text>
                  <Text style={styles.reportDate}>{report.date} • {report.size}</Text>
                </View>
                <View style={[
                  styles.periodBadge,
                  { backgroundColor: report.period === 'Monthly' ? '#DBEAFE' : '#FEF3C7' }
                ]}>
                  <Text style={[
                    styles.periodBadgeText,
                    { color: report.period === 'Monthly' ? '#1D4ED8' : '#D97706' }
                  ]}>
                    {report.period}
                  </Text>
                </View>
              </View>
              
              <View style={styles.reportActions}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => downloadReport(report.title)}
                >
                  <Download size={18} color="#6B7280" />
                  <Text style={styles.actionButtonText}>{t('download')}</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => shareReport(report.title)}
                >
                  <Share size={18} color="#6B7280" />
                  <Text style={styles.actionButtonText}>{t('share')}</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
        
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
  generateSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  periodButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  periodButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    backgroundColor: '#FFFFFF',
    gap: 8,
  },
  periodButtonActive: {
    backgroundColor: '#22C55E',
    borderColor: '#22C55E',
  },
  periodButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  periodButtonTextActive: {
    color: '#FFFFFF',
  },
  generateButton: {
    backgroundColor: '#22C55E',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  generateButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  summarySection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  summaryGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginTop: 8,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 4,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  reportCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  reportHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  reportInfo: {
    flex: 1,
  },
  reportTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  reportMeta: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 2,
  },
  reportDate: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  periodBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 12,
  },
  periodBadgeText: {
    fontSize: 12,
    fontWeight: '500',
  },
  reportActions: {
    flexDirection: 'row',
    gap: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actionButtonText: {
    fontSize: 14,
    color: '#6B7280',
  },
});