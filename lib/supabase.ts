import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      admin_users: {
        Row: {
          id: string;
          email: string;
          password_hash: string;
          full_name: string;
          created_at: string;
          last_login: string | null;
        };
        Insert: {
          id?: string;
          email: string;
          password_hash: string;
          full_name: string;
          created_at?: string;
          last_login?: string | null;
        };
        Update: {
          id?: string;
          email?: string;
          password_hash?: string;
          full_name?: string;
          created_at?: string;
          last_login?: string | null;
        };
      };
      farms: {
        Row: {
          id: string;
          name: string;
          location: string;
          total_area: number;
          owner_name: string;
          contact_number: string | null;
          soil_type: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          location: string;
          total_area: number;
          owner_name: string;
          contact_number?: string | null;
          soil_type?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          location?: string;
          total_area?: number;
          owner_name?: string;
          contact_number?: string | null;
          soil_type?: string | null;
          created_at?: string;
        };
      };
      fields: {
        Row: {
          id: string;
          farm_id: string;
          name: string;
          crop_type: string;
          variety: string | null;
          area: number;
          sowing_date: string | null;
          status: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          farm_id: string;
          name: string;
          crop_type: string;
          variety?: string | null;
          area: number;
          sowing_date?: string | null;
          status?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          farm_id?: string;
          name?: string;
          crop_type?: string;
          variety?: string | null;
          area?: number;
          sowing_date?: string | null;
          status?: string;
          created_at?: string;
        };
      };
      soil_readings: {
        Row: {
          id: string;
          field_id: string;
          ph_level: number;
          moisture: number | null;
          temperature: number | null;
          nitrogen: number | null;
          phosphorus: number | null;
          potassium: number | null;
          recorded_at: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          field_id: string;
          ph_level: number;
          moisture?: number | null;
          temperature?: number | null;
          nitrogen?: number | null;
          phosphorus?: number | null;
          potassium?: number | null;
          recorded_at?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          field_id?: string;
          ph_level?: number;
          moisture?: number | null;
          temperature?: number | null;
          nitrogen?: number | null;
          phosphorus?: number | null;
          potassium?: number | null;
          recorded_at?: string;
          created_at?: string;
        };
      };
      weather_data: {
        Row: {
          id: string;
          location: string;
          temperature: number;
          humidity: number | null;
          precipitation: number | null;
          wind_speed: number | null;
          weather_condition: string | null;
          forecast_date: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          location: string;
          temperature: number;
          humidity?: number | null;
          precipitation?: number | null;
          wind_speed?: number | null;
          weather_condition?: string | null;
          forecast_date: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          location?: string;
          temperature?: number;
          humidity?: number | null;
          precipitation?: number | null;
          wind_speed?: number | null;
          weather_condition?: string | null;
          forecast_date?: string;
          created_at?: string;
        };
      };
    };
  };
};