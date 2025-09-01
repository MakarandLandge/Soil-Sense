import { Tabs } from 'expo-router';
import { Chrome as Home, ChartBar as BarChart3, FileText, Settings, Building2, Shield } from 'lucide-react-native';
import { useLanguage } from '@/contexts/LanguageContext';

export default function TabLayout() {
  const { t } = useLanguage();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#22C55E',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#E5E7EB',
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: t('dashboard'),
          tabBarIcon: ({ size, color }) => (
            <Home size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="farms"
        options={{
          title: t('farms'),
          tabBarIcon: ({ size, color }) => (
            <Building2 size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="fields"
        options={{
          title: t('fields'),
          tabBarIcon: ({ size, color }) => (
            <BarChart3 size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="reports"
        options={{
          title: t('reports'),
          tabBarIcon: ({ size, color }) => (
            <FileText size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="crop-info"
        options={{ 
          title: 'Crop Info',
          tabBarIcon: ({ size, color }) => (
            <BarChart3 size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: t('settings'),
          tabBarIcon: ({ size, color }) => (
            <Settings size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="admin-access"
        options={{
          title: 'Admin',
          tabBarIcon: ({ size, color }) => (
            <Shield size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}