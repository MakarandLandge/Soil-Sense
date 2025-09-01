import { supabase } from '@/lib/supabase';

export interface Farm {
  id: string;
  name: string;
  location: string;
  total_area: number;
  owner_name: string;
  contact_number: string | null;
  soil_type: string | null;
  created_at: string;
}

export interface Field {
  id: string;
  farm_id: string;
  name: string;
  crop_type: string;
  variety: string | null;
  area: number;
  sowing_date: string | null;
  status: string;
  created_at: string;
}

export interface SoilReading {
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
}

class DatabaseService {
  // Farm operations
  async getFarms(): Promise<Farm[]> {
    const { data, error } = await supabase
      .from('farms')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async createFarm(farmData: Omit<Farm, 'id' | 'created_at'>): Promise<Farm> {
    const { data, error } = await supabase
      .from('farms')
      .insert(farmData)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateFarm(id: string, farmData: Partial<Farm>): Promise<Farm> {
    const { data, error } = await supabase
      .from('farms')
      .update(farmData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async deleteFarm(id: string): Promise<void> {
    const { error } = await supabase
      .from('farms')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  // Field operations
  async getFields(farmId?: string): Promise<Field[]> {
    let query = supabase
      .from('fields')
      .select('*')
      .order('created_at', { ascending: false });

    if (farmId) {
      query = query.eq('farm_id', farmId);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  async createField(fieldData: Omit<Field, 'id' | 'created_at'>): Promise<Field> {
    const { data, error } = await supabase
      .from('fields')
      .insert(fieldData)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateField(id: string, fieldData: Partial<Field>): Promise<Field> {
    const { data, error } = await supabase
      .from('fields')
      .update(fieldData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async deleteField(id: string): Promise<void> {
    const { error } = await supabase
      .from('fields')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  // Soil reading operations
  async getSoilReadings(fieldId?: string): Promise<SoilReading[]> {
    let query = supabase
      .from('soil_readings')
      .select('*')
      .order('recorded_at', { ascending: false });

    if (fieldId) {
      query = query.eq('field_id', fieldId);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  async createSoilReading(readingData: Omit<SoilReading, 'id' | 'created_at'>): Promise<SoilReading> {
    const { data, error } = await supabase
      .from('soil_readings')
      .insert(readingData)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getLatestSoilReading(fieldId: string): Promise<SoilReading | null> {
    const { data, error } = await supabase
      .from('soil_readings')
      .select('*')
      .eq('field_id', fieldId)
      .order('recorded_at', { ascending: false })
      .limit(1)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data || null;
  }

  // Analytics and reporting
  async getDashboardStats(): Promise<{
    totalFarms: number;
    totalFields: number;
    totalReadings: number;
    averagePH: number;
  }> {
    const [farmsResult, fieldsResult, readingsResult] = await Promise.all([
      supabase.from('farms').select('id', { count: 'exact' }),
      supabase.from('fields').select('id', { count: 'exact' }),
      supabase.from('soil_readings').select('ph_level'),
    ]);

    const totalFarms = farmsResult.count || 0;
    const totalFields = fieldsResult.count || 0;
    const totalReadings = readingsResult.data?.length || 0;
    
    const averagePH = readingsResult.data?.length 
      ? readingsResult.data.reduce((sum, reading) => sum + reading.ph_level, 0) / readingsResult.data.length
      : 0;

    return {
      totalFarms,
      totalFields,
      totalReadings,
      averagePH: Math.round(averagePH * 10) / 10,
    };
  }
}

export const databaseService = new DatabaseService();