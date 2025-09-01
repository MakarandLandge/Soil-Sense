import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Cloud, Thermometer, Droplets, RefreshCw } from 'lucide-react-native';
import { weatherService, WeatherForecast } from '@/services/weatherService';

interface WeatherWidgetProps {
  location: string;
}

export default function WeatherWidget({ location }: WeatherWidgetProps) {
  const [weatherData, setWeatherData] = useState<WeatherForecast | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWeatherData();
  }, [location]);

  const loadWeatherData = async () => {
    try {
      const data = await weatherService.getCurrentWeather(location);
      setWeatherData(data);
    } catch (error) {
      console.error('Error loading weather data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setLoading(true);
    await loadWeatherData();
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

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <RefreshCw size={20} color="#6B7280" />
          <Text style={styles.loadingText}>Loading weather...</Text>
        </View>
      </View>
    );
  }

  if (!weatherData) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Unable to load weather data</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleSection}>
          <Cloud size={20} color="#06B6D4" />
          <Text style={styles.title}>Weather Forecast</Text>
        </View>
        <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
          <RefreshCw size={16} color="#6B7280" />
        </TouchableOpacity>
      </View>

      <View style={styles.currentWeather}>
        <View style={styles.currentMain}>
          <Text style={styles.weatherIcon}>{getWeatherIcon(weatherData.current.condition)}</Text>
          <View>
            <Text style={styles.temperature}>{weatherData.current.temperature}°C</Text>
            <Text style={styles.condition}>{weatherData.current.condition}</Text>
          </View>
        </View>
        
        <View style={styles.metrics}>
          <View style={styles.metric}>
            <Droplets size={16} color="#06B6D4" />
            <Text style={styles.metricValue}>{weatherData.current.humidity}%</Text>
          </View>
          <View style={styles.metric}>
            <Cloud size={16} color="#8B5CF6" />
            <Text style={styles.metricValue}>{weatherData.current.windSpeed} km/h</Text>
          </View>
        </View>
      </View>

      <View style={styles.forecast}>
        <Text style={styles.forecastTitle}>5-Day Forecast</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.forecastList}>
            {weatherData.forecast.map((day, index) => (
              <View key={index} style={styles.forecastItem}>
                <Text style={styles.forecastDay}>
                  {index === 0 ? 'Today' : new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                </Text>
                <Text style={styles.forecastItemIcon}>{getWeatherIcon(day.condition)}</Text>
                <Text style={styles.forecastItemTemp}>{day.temperature}°</Text>
                {day.precipitation > 0 && (
                  <Text style={styles.forecastItemRain}>{day.precipitation}mm</Text>
                )}
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    margin: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    gap: 8,
  },
  loadingText: {
    fontSize: 14,
    color: '#6B7280',
  },
  errorText: {
    fontSize: 14,
    color: '#EF4444',
    textAlign: 'center',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  titleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  refreshButton: {
    padding: 4,
  },
  currentWeather: {
    padding: 16,
  },
  currentMain: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 16,
  },
  weatherIcon: {
    fontSize: 48,
  },
  temperature: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#111827',
  },
  condition: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  metrics: {
    flexDirection: 'row',
    gap: 16,
  },
  metric: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  metricValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
  },
  forecast: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  forecastTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  forecastList: {
    flexDirection: 'row',
    gap: 12,
    paddingRight: 16,
  },
  forecastItem: {
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 12,
    minWidth: 80,
  },
  forecastDay: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 6,
  },
  forecastItemIcon: {
    fontSize: 24,
    marginBottom: 6,
  },
  forecastItemTemp: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  forecastItemRain: {
    fontSize: 11,
    color: '#3B82F6',
    fontWeight: '500',
  },
});