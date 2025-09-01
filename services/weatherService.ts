import { supabase } from '@/lib/supabase';

export interface WeatherData {
  id: string;
  location: string;
  temperature: number;
  humidity: number | null;
  precipitation: number | null;
  wind_speed: number | null;
  weather_condition: string | null;
  forecast_date: string;
  created_at: string;
}

export interface WeatherForecast {
  current: {
    temperature: number;
    humidity: number;
    condition: string;
    windSpeed: number;
  };
  forecast: Array<{
    date: string;
    temperature: number;
    condition: string;
    precipitation: number;
  }>;
}

class WeatherService {
  private readonly API_KEY = 'demo_key'; // In production, use environment variable
  private readonly BASE_URL = 'https://api.openweathermap.org/data/2.5';

  async getCurrentWeather(location: string): Promise<WeatherForecast> {
    try {
      // Simulate API call for demo purposes
      const mockWeatherData: WeatherForecast = {
        current: {
          temperature: 28,
          humidity: 65,
          condition: 'Partly Cloudy',
          windSpeed: 12,
        },
        forecast: [
          {
            date: new Date().toISOString().split('T')[0],
            temperature: 28,
            condition: 'Partly Cloudy',
            precipitation: 0,
          },
          {
            date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
            temperature: 30,
            condition: 'Sunny',
            precipitation: 0,
          },
          {
            date: new Date(Date.now() + 172800000).toISOString().split('T')[0],
            temperature: 26,
            condition: 'Rainy',
            precipitation: 15,
          },
          {
            date: new Date(Date.now() + 259200000).toISOString().split('T')[0],
            temperature: 24,
            condition: 'Thunderstorm',
            precipitation: 25,
          },
          {
            date: new Date(Date.now() + 345600000).toISOString().split('T')[0],
            temperature: 27,
            condition: 'Cloudy',
            precipitation: 5,
          },
        ],
      };

      // Store weather data in database
      await this.storeWeatherData(location, mockWeatherData);
      
      return mockWeatherData;
    } catch (error) {
      console.error('Error fetching weather data:', error);
      throw new Error('Failed to fetch weather data');
    }
  }

  private async storeWeatherData(location: string, weatherData: WeatherForecast): Promise<void> {
    try {
      // Store current weather
      await supabase.from('weather_data').insert({
        location,
        temperature: weatherData.current.temperature,
        humidity: weatherData.current.humidity,
        precipitation: 0,
        wind_speed: weatherData.current.windSpeed,
        weather_condition: weatherData.current.condition,
        forecast_date: new Date().toISOString().split('T')[0],
      });

      // Store forecast data
      const forecastInserts = weatherData.forecast.map(forecast => ({
        location,
        temperature: forecast.temperature,
        humidity: null,
        precipitation: forecast.precipitation,
        wind_speed: null,
        weather_condition: forecast.condition,
        forecast_date: forecast.date,
      }));

      await supabase.from('weather_data').insert(forecastInserts);
    } catch (error) {
      console.error('Error storing weather data:', error);
    }
  }

  async getStoredWeatherData(location: string): Promise<WeatherData[]> {
    try {
      const { data, error } = await supabase
        .from('weather_data')
        .select('*')
        .eq('location', location)
        .gte('forecast_date', new Date().toISOString().split('T')[0])
        .order('forecast_date', { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching stored weather data:', error);
      return [];
    }
  }
}

export const weatherService = new WeatherService();