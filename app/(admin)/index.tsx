import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { Database, Cloud, Users, ChartBar as BarChart3, Settings, LogOut, Shield, Activity, TrendingUp } from 'lucide-react-native';
import { databaseService } from '@/services/databaseService';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalFarms: 0,
    totalFields: 0,
    totalReadings: 0,
    averagePH: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardStats();
  }, []);

  const loadDashboardStats = async () => {
    try {
      const dashboardStats = await databaseService.getDashboardStats();
      setStats(dashboardStats);
    } catch (error) {
      console.error('Error loading dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: () => router.replace('/(auth)/login')
        },
      ]
    );
  };

  const AdminCard = ({ 
    icon, 
    title, 
    subtitle, 
    onPress, 
    color = '#22C55E' 
  }: {
    icon: React.ReactNode;
    title: string;
    subtitle: string;
    onPress: () => void;
    color?: string;
  }) => (
    <TouchableOpacity style={styles.adminCard} onPress={onPress}>
      <View style={[styles.cardIcon, { backgroundColor: color + '20' }]}>
        {icon}
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardSubtitle}>{subtitle}</Text>
      </View>
    </TouchableOpacity>
  );

  const StatCard = ({ 
    icon, 
    title, 
    value, 
    color 
  }: {
    icon: React.ReactNode;
    title: string;
    value: string | number;
    color: string;
  }) => (
    <View style={styles.statCard}>
      <View style={[styles.statIcon, { backgroundColor: color + '20' }]}>
        {icon}
      </View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statTitle}>{title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Admin Dashboard</Text>
          <Text style={styles.headerSubtitle}>SoilSense Management Portal</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <LogOut size={20} color="#EF4444" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {/* Quick Stats */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>System Overview</Text>
          <View style={styles.statsGrid}>
            <StatCard
              icon={<Users size={20} color="#3B82F6" />}
              title="Total Farms"
              value={stats.totalFarms}
              color="#3B82F6"
            />
            <StatCard
              icon={<BarChart3 size={20} color="#22C55E" />}
              title="Total Fields"
              value={stats.totalFields}
              color="#22C55E"
            />
            <StatCard
              icon={<Activity size={20} color="#F59E0B" />}
              title="pH Readings"
              value={stats.totalReadings}
              color="#F59E0B"
            />
            <StatCard
              icon={<TrendingUp size={20} color="#8B5CF6" />}
              title="Avg pH Level"
              value={stats.averagePH}
              color="#8B5CF6"
            />
          </View>
        </View>

        {/* Admin Functions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Management Tools</Text>
          
          <AdminCard
            icon={<Database size={24} color="#3B82F6" />}
            title="Database Management"
            subtitle="Manage farms, fields, and soil readings"
            onPress={() => router.push('/(admin)/database')}
            color="#3B82F6"
          />
          
          <AdminCard
            icon={<Cloud size={24} color="#06B6D4" />}
            title="Weather Management"
            subtitle="Monitor and update weather forecasts"
            onPress={() => router.push('/(admin)/weather')}
            color="#06B6D4"
          />
          
          <AdminCard
            icon={<Users size={24} color="#8B5CF6" />}
            title="User Management"
            subtitle="Manage farmer profiles and access"
            onPress={() => Alert.alert('Coming Soon', 'User management features will be available soon')}
            color="#8B5CF6"
          />
          
          <AdminCard
            icon={<Settings size={24} color="#6B7280" />}
            title="System Settings"
            subtitle="Configure app settings and preferences"
            onPress={() => Alert.alert('Coming Soon', 'System settings will be available soon')}
            color="#6B7280"
          />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
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
  logoutButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#FEE2E2',
  },
  scrollView: {
    flex: 1,
  },
  statsSection: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  section: {
    paddingHorizontal: 20,
    paddingTop: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  adminCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  cardIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
});