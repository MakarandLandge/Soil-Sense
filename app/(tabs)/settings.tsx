import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Bell, Globe, Cloud, User, Shield, CircleHelp as HelpCircle, ChevronRight, Smartphone, Mail, Users, UserPlus } from 'lucide-react-native';
import LanguageModal from '@/components/LanguageModal';
import ProfileManagementModal from '@/components/ProfileManagementModal';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Settings() {
  const { t, currentLanguage, setLanguage } = useLanguage();
  const [notifications, setNotifications] = useState(true);
  const [weatherAlerts, setWeatherAlerts] = useState(true);
  const [autoSync, setAutoSync] = useState(false);
  const [languageModalVisible, setLanguageModalVisible] = useState(false);
  const [profileModalVisible, setProfileModalVisible] = useState(false);
  const [activeProfileId, setActiveProfileId] = useState(1);
  const [profiles, setProfiles] = useState([
    {
      id: 1,
      name: 'Farmer Singh',
      email: 'farmer.singh@example.com',
      phone: '+91 98765 43210',
      location: 'Ludhiana, Punjab',
      farmName: 'Green Valley Farm',
      experience: 'Expert (10+ years)',
      specialization: 'Organic Farming',
    },
    {
      id: 2,
      name: 'Rajesh Kumar',
      email: 'rajesh.kumar@example.com',
      phone: '+91 87654 32109',
      location: 'Nashik, Maharashtra',
      farmName: 'Sunrise Agriculture',
      experience: 'Intermediate (3-10 years)',
      specialization: 'Crop Rotation',
    },
  ]);

  const getLanguageName = (code: string) => {
    const languageMap: { [key: string]: keyof typeof import('@/utils/translations').translations.en } = {
      'en': 'english',
      'hi': 'hindi',
      'mr': 'marathi',
      'te': 'telugu',
      'ta': 'tamil',
      'bn': 'bengali',
      'gu': 'gujarati',
      'kn': 'kannada',
      'ml': 'malayalam',
      'pa': 'punjabi',
      'or': 'odia',
      'as': 'assamese',
    };
    return t(languageMap[code] || 'english');
  };

  const activeProfile = profiles.find(p => p.id === activeProfileId);

  const SettingItem = ({ 
    icon, 
    title, 
    subtitle, 
    onPress, 
    rightElement 
  }: {
    icon: React.ReactNode;
    title: string;
    subtitle?: string;
    onPress?: () => void;
    rightElement?: React.ReactNode;
  }) => (
    <TouchableOpacity style={styles.settingItem} onPress={onPress}>
      <View style={styles.settingLeft}>
        <View style={styles.iconContainer}>
          {icon}
        </View>
        <View style={styles.settingText}>
          <Text style={styles.settingTitle}>{title}</Text>
          {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      {rightElement || <ChevronRight size={20} color="#9CA3AF" />}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('settings')}</Text>
        <Text style={styles.headerSubtitle}>{t('customizeExperience')}</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {/* Profile Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('profile')}</Text>
          <SettingItem
            icon={<Users size={24} color="#3B82F6" />}
            title={t('manageProfiles')}
            subtitle={`${profiles.length} ${t('profilesCount')} • ${t('active')}: ${activeProfile?.name}`}
            onPress={() => setProfileModalVisible(true)}
          />
          <SettingItem
            icon={<User size={24} color="#22C55E" />}
            title={t('currentProfile')}
            subtitle={`${activeProfile?.name} • ${activeProfile?.farmName}`}
            onPress={() => setProfileModalVisible(true)}
          />
        </View>

        {/* Notifications Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('notifications')}</Text>
          <SettingItem
            icon={<Bell size={24} color="#22C55E" />}
            title={t('pushNotifications')}
            subtitle={t('getAlerts')}
            rightElement={
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: '#D1D5DB', true: '#22C55E' }}
                thumbColor={notifications ? '#FFFFFF' : '#FFFFFF'}
              />
            }
          />
          <SettingItem
            icon={<Cloud size={24} color="#F59E0B" />}
            title={t('weatherAlerts')}
            subtitle={t('receiveNotifications')}
            rightElement={
              <Switch
                value={weatherAlerts}
                onValueChange={setWeatherAlerts}
                trackColor={{ false: '#D1D5DB', true: '#22C55E' }}
                thumbColor={weatherAlerts ? '#FFFFFF' : '#FFFFFF'}
              />
            }
          />
        </View>

        {/* Data & Sync Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('dataSync')}</Text>
          <SettingItem
            icon={<Cloud size={24} color="#8B5CF6" />}
            title={t('googleDriveSync')}
            subtitle={t('backupReports')}
            rightElement={
              <Switch
                value={autoSync}
                onValueChange={setAutoSync}
                trackColor={{ false: '#D1D5DB', true: '#22C55E' }}
                thumbColor={autoSync ? '#FFFFFF' : '#FFFFFF'}
              />
            }
          />
        </View>

        {/* Language & Region */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('languageRegion')}</Text>
          <SettingItem
            icon={<Globe size={24} color="#06B6D4" />}
            title={t('language')}
            subtitle={getLanguageName(currentLanguage)}
            onPress={() => setLanguageModalVisible(true)}
          />
        </View>

        {/* Device Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('device')}</Text>
          <SettingItem
            icon={<Smartphone size={24} color="#EF4444" />}
            title={t('sensorConnection')}
            subtitle={t('bluetoothSensors')}
            onPress={() => {}}
          />
        </View>

        {/* Support Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('support')}</Text>
          <SettingItem
            icon={<HelpCircle size={24} color="#6B7280" />}
            title={t('helpFAQ')}
            subtitle={t('getHelp')}
            onPress={() => {}}
          />
          <SettingItem
            icon={<Mail size={24} color="#6B7280" />}
            title={t('contactSupport')}
            subtitle="support@soilsense.com"
            onPress={() => {}}
          />
        </View>

        {/* Privacy & Security */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('privacySecurity')}</Text>
          <SettingItem
            icon={<Shield size={24} color="#10B981" />}
            title={t('privacyPolicy')}
            subtitle={t('howWeProtect')}
            onPress={() => {}}
          />
        </View>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appName}>SoilSense</Text>
          <Text style={styles.appVersion}>{t('version')} 1.0.0</Text>
          <Text style={styles.appDescription}>
            {t('smartSoilMonitoring')}
          </Text>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>

      <LanguageModal
        visible={languageModalVisible}
        onClose={() => setLanguageModalVisible(false)}
        currentLanguage={currentLanguage}
        onLanguageSelect={setLanguage}
      />

      <ProfileManagementModal
        visible={profileModalVisible}
        onClose={() => setProfileModalVisible(false)}
        profiles={profiles}
        activeProfileId={activeProfileId}
        onProfilesUpdate={setProfiles}
        onActiveProfileChange={setActiveProfileId}
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
  scrollView: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  settingItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    marginRight: 12,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  appInfo: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 32,
  },
  appName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#22C55E',
  },
  appVersion: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  appDescription: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
    marginTop: 8,
  },
});