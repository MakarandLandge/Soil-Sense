import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { 
  ArrowLeft, 
  Cloud, 
  Thermometer, 
  Droplets, 
  Wind,
  RefreshCw,
  MapPin,
  Calendar
} from 'lucide-react-native';
import { weatherService, WeatherForecast } from '@/services/weatherService';

export default function WeatherManagement() {
  const [weatherData, setWeatherData] = useState<WeatherForecast | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('Ludhiana, Punjab');

  const locations = [
    'Ludhiana, Punjab',
    'Nashik, Maharashtra',
    'Bangalore, Karnataka',
    'Hyderabad, Telangana',
    'Ahmedabad, Gujarat',
  ];

  useEffect(() => {
    loadWeatherData();
  }, [selectedLocation]);

  const loadWeatherData = async () => {
    try {
      const data = await weatherService.getCurrentWeather(selectedLocation);
      setWeatherData(data);
    } catch (error) {
      console.error('Error loading weather data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadWeatherData();
    setRefreshing(false);
  };

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
      case 'clear':
        return '☀️';
      case 'partly cloudy':
      case 'cloudy':
        return '⛅';
      case 'rainy':
        return '🌧️';
      case 'thunderstorm':
        return '⛈️';
      default:
        return '🌤️';
    }
  };

  const WeatherCard = ({ 
    title, 
    value, 
    unit, 
    icon, 
    color 
  }: {
    title: string;
    value: string | number;
    unit: string;
    icon: React.ReactNode;
    color: string;
  }) => (
    <View style={styles.weatherCard}>
      <View style={[styles.weatherIcon, { backgroundColor: color + '20' }]}>
        {icon}
      </View>
      <Text style={styles.weatherValue}>{value}{unit}</Text>
      <Text style={styles.weatherTitle}>{title}</Text>
    </View>
  );

  const ForecastCard = ({ 
    date, 
    temperature, 
    condition, 
    precipitation 
  }: {
    date: string;
    temperature: number;
    condition: string;
    precipitation: number;
  }) => (
    <View style={styles.forecastCard}>
      <Text style={styles.forecastDate}>
        {new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
      </Text>
      <Text style={styles.forecastIcon}>{getWeatherIcon(condition)}</Text>
      <Text style={styles.forecastTemp}>{temperature}°C</Text>
      <Text style={styles.forecastCondition}>{condition}</Text>
      {precipitation > 0 && (
        <Text style={styles.forecastRain}>{precipitation}mm</Text>
      )}
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
          <Text style={styles.headerTitle}>Weather Management</Text>
          <Text style={styles.headerSubtitle}>Real-time weather monitoring</Text>
        </View>
        <TouchableOpacity 
          style={styles.refreshButton}
          onPress={handleRefresh}
        >
          <RefreshCw size={20} color="#22C55E" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false} 
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        {/* Location Selector */}
        <View style={styles.locationSection}>
          <Text style={styles.sectionTitle}>Select Location</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.locationButtons}>
              {locations.map((location) => (
                <TouchableOpacity
                  key={location}
                  style={[
                    styles.locationButton,
                    selectedLocation === location && styles.locationButtonActive
                  ]}
                  onPress={() => setSelectedLocation(location)}
                >
                  <MapPin size={16} color={selectedLocation === location ? '#FFFFFF' : '#6B7280'} />
                  <Text style={[
                    styles.locationButtonText,
                    selectedLocation === location && styles.locationButtonTextActive
                  ]}>
                    {location}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {weatherData && (
          <>
            {/* Current Weather */}
            <View style={styles.currentWeatherSection}>
              <Text style={styles.sectionTitle}>Current Weather</Text>
              <View style={styles.currentWeatherCard}>
                <View style={styles.currentWeatherHeader}>
                  <Text style={styles.currentLocation}>{selectedLocation}</Text>
                  <Text style={styles.currentCondition}>{weatherData.current.condition}</Text>
                </View>
                <View style={styles.currentWeatherMain}>
                  <Text style={styles.currentTemp}>{weatherData.current.temperature}°C</Text>
                  <Text style={styles.currentIcon}>{getWeatherIcon(weatherData.current.condition)}</Text>
                </View>
              </View>

              <View style={styles.weatherMetrics}>
                <WeatherCard
                  title="Humidity"
                  value={weatherData.current.humidity}
                  unit="%"
                  icon={<Droplets size={20} color="#06B6D4" />}
                  color="#06B6D4"
                />
                <WeatherCard
                  title="Wind Speed"
                  value={weatherData.current.windSpeed}
                  unit=" km/h"
                  icon={<Wind size={20} color="#8B5CF6" />}
                  color="#8B5CF6"
                />
              </View>
            </View>

            {/* 5-Day Forecast */}
            <View style={styles.forecastSection}>
              <Text style={styles.sectionTitle}>5-Day Forecast</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.forecastContainer}>
                  {weatherData.forecast.map((forecast, index) => (
                    <ForecastCard
                      key={index}
                      date={forecast.date}
                      temperature={forecast.temperature}
                      condition={forecast.condition}
                      precipitation={forecast.precipitation}
                    />
                  ))}
                </View>
              </ScrollView>
            </View>
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
  refreshButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#F0FDF4',
  },
  scrollView: {
    flex: 1,
  },
  locationSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  locationButtons: {
    flexDirection: 'row',
    gap: 12,
    paddingRight: 20,
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    gap: 6,
  },
  locationButtonActive: {
    backgroundColor: '#22C55E',
    borderColor: '#22C55E',
  },
  locationButtonText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  locationButtonTextActive: {
    color: '#FFFFFF',
  },
  currentWeatherSection: {
    paddingHorizontal: 20,
    paddingTop: 32,
  },
  currentWeatherCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  currentWeatherHeader: {
    marginBottom: 16,
  },
  currentLocation: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  currentCondition: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  currentWeatherMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  currentTemp: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#111827',
  },
  currentIcon: {
    fontSize: 48,
  },
  weatherMetrics: {
    flexDirection: 'row',
    gap: 12,
  },
  weatherCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  weatherIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  weatherValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  weatherTitle: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  forecastSection: {
    paddingHorizontal: 20,
    paddingTop: 32,
  },
  forecastContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingRight: 20,
  },
  forecastCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    minWidth: 120,
  },
  forecastDate: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 8,
    textAlign: 'center',
  },
  forecastIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  forecastTemp: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  forecastCondition: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 4,
  },
  forecastRain: {
    fontSize: 11,
    color: '#3B82F6',
    fontWeight: '500',
  },
});