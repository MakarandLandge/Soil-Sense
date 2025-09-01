import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { Shield, Lock, Database, Cloud } from 'lucide-react-native';

export default function AdminAccess() {
  const handleAdminLogin = () => {
    router.push('/(auth)/login');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Shield size={64} color="#22C55E" />
          </View>
          <Text style={styles.title}>Admin Access</Text>
          <Text style={styles.subtitle}>
            Access the SoilSense admin dashboard to manage farms, weather data, and system settings
          </Text>
        </View>

        {/* Features */}
        <View style={styles.featuresContainer}>
          <View style={styles.feature}>
            <Database size={24} color="#3B82F6" />
            <Text style={styles.featureText}>Database Management</Text>
          </View>
          <View style={styles.feature}>
            <Cloud size={24} color="#06B6D4" />
            <Text style={styles.featureText}>Weather Control</Text>
          </View>
          <View style={styles.feature}>
            <Lock size={24} color="#8B5CF6" />
            <Text style={styles.featureText}>System Security</Text>
          </View>
        </View>

        {/* Login Button */}
        <TouchableOpacity style={styles.loginButton} onPress={handleAdminLogin}>
          <Shield size={20} color="#FFFFFF" />
          <Text style={styles.loginButtonText}>Access Admin Dashboard</Text>
        </TouchableOpacity>

        {/* Security Notice */}
        <View style={styles.securityNotice}>
          <Lock size={16} color="#92400E" />
          <Text style={styles.securityText}>
            Admin access is restricted to authorized personnel only. 
            All admin activities are logged and monitored for security purposes.
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
  featuresContainer: {
    marginBottom: 48,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    gap: 12,
  },
  featureText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  loginButton: {
    backgroundColor: '#22C55E',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 24,
    gap: 8,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  securityNotice: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FEF3C7',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  securityText: {
    fontSize: 12,
    color: '#92400E',
    flex: 1,
    lineHeight: 16,
  },
});