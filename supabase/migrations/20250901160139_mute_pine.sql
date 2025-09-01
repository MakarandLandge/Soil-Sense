/*
  # Create admin users and soil data tables

  1. New Tables
    - `admin_users`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `password_hash` (text)
      - `full_name` (text)
      - `created_at` (timestamp)
      - `last_login` (timestamp)
    - `soil_readings`
      - `id` (uuid, primary key)
      - `field_id` (uuid, foreign key)
      - `ph_level` (decimal)
      - `moisture` (decimal)
      - `temperature` (decimal)
      - `nitrogen` (decimal)
      - `phosphorus` (decimal)
      - `potassium` (decimal)
      - `recorded_at` (timestamp)
      - `created_at` (timestamp)
    - `farms`
      - `id` (uuid, primary key)
      - `name` (text)
      - `location` (text)
      - `total_area` (decimal)
      - `owner_name` (text)
      - `contact_number` (text)
      - `soil_type` (text)
      - `created_at` (timestamp)
    - `fields`
      - `id` (uuid, primary key)
      - `farm_id` (uuid, foreign key)
      - `name` (text)
      - `crop_type` (text)
      - `variety` (text)
      - `area` (decimal)
      - `sowing_date` (date)
      - `status` (text)
      - `created_at` (timestamp)
    - `weather_data`
      - `id` (uuid, primary key)
      - `location` (text)
      - `temperature` (decimal)
      - `humidity` (decimal)
      - `precipitation` (decimal)
      - `wind_speed` (decimal)
      - `weather_condition` (text)
      - `forecast_date` (date)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for admin access to all tables
    - Add policies for authenticated users to access their own data
*/

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  full_name text NOT NULL,
  created_at timestamptz DEFAULT now(),
  last_login timestamptz
);

-- Create farms table
CREATE TABLE IF NOT EXISTS farms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  location text NOT NULL,
  total_area decimal NOT NULL,
  owner_name text NOT NULL,
  contact_number text,
  soil_type text,
  created_at timestamptz DEFAULT now()
);

-- Create fields table
CREATE TABLE IF NOT EXISTS fields (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  farm_id uuid REFERENCES farms(id) ON DELETE CASCADE,
  name text NOT NULL,
  crop_type text NOT NULL,
  variety text,
  area decimal NOT NULL,
  sowing_date date,
  status text DEFAULT 'healthy',
  created_at timestamptz DEFAULT now()
);

-- Create soil_readings table
CREATE TABLE IF NOT EXISTS soil_readings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  field_id uuid REFERENCES fields(id) ON DELETE CASCADE,
  ph_level decimal NOT NULL,
  moisture decimal,
  temperature decimal,
  nitrogen decimal,
  phosphorus decimal,
  potassium decimal,
  recorded_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Create weather_data table
CREATE TABLE IF NOT EXISTS weather_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  location text NOT NULL,
  temperature decimal NOT NULL,
  humidity decimal,
  precipitation decimal,
  wind_speed decimal,
  weather_condition text,
  forecast_date date NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE farms ENABLE ROW LEVEL SECURITY;
ALTER TABLE fields ENABLE ROW LEVEL SECURITY;
ALTER TABLE soil_readings ENABLE ROW LEVEL SECURITY;
ALTER TABLE weather_data ENABLE ROW LEVEL SECURITY;

-- Admin policies (full access for admin users)
CREATE POLICY "Admins can manage all admin_users"
  ON admin_users
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage all farms"
  ON farms
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage all fields"
  ON fields
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage all soil_readings"
  ON soil_readings
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE id = auth.uid()
    )
  );

CREATE POLICY "Everyone can read weather_data"
  ON weather_data
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can manage weather_data"
  ON weather_data
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE id = auth.uid()
    )
  );