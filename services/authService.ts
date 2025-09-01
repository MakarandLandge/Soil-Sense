import { supabase } from '@/lib/supabase';
import bcrypt from 'bcryptjs';

export interface AdminUser {
  id: string;
  email: string;
  full_name: string;
  created_at: string;
  last_login: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  email: string;
  password: string;
  fullName: string;
}

class AuthService {
  async login(credentials: LoginCredentials): Promise<{ user: AdminUser; token: string }> {
    try {
      const { data: user, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('email', credentials.email)
        .single();

      if (error || !user) {
        throw new Error('Invalid email or password');
      }

      const isValidPassword = await bcrypt.compare(credentials.password, user.password_hash);
      if (!isValidPassword) {
        throw new Error('Invalid email or password');
      }

      // Update last login
      await supabase
        .from('admin_users')
        .update({ last_login: new Date().toISOString() })
        .eq('id', user.id);

      // Generate a simple token (in production, use proper JWT)
      const token = btoa(JSON.stringify({ userId: user.id, email: user.email }));

      return {
        user: {
          id: user.id,
          email: user.email,
          full_name: user.full_name,
          created_at: user.created_at,
          last_login: user.last_login,
        },
        token,
      };
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async signup(signupData: SignupData): Promise<{ user: AdminUser; token: string }> {
    try {
      // Check if user already exists
      const { data: existingUser } = await supabase
        .from('admin_users')
        .select('id')
        .eq('email', signupData.email)
        .single();

      if (existingUser) {
        throw new Error('User already exists with this email');
      }

      // Hash password
      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(signupData.password, saltRounds);

      // Create new admin user
      const { data: newUser, error } = await supabase
        .from('admin_users')
        .insert({
          email: signupData.email,
          password_hash: passwordHash,
          full_name: signupData.fullName,
        })
        .select()
        .single();

      if (error || !newUser) {
        throw new Error('Failed to create user account');
      }

      // Generate token
      const token = btoa(JSON.stringify({ userId: newUser.id, email: newUser.email }));

      return {
        user: {
          id: newUser.id,
          email: newUser.email,
          full_name: newUser.full_name,
          created_at: newUser.created_at,
          last_login: newUser.last_login,
        },
        token,
      };
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    // Clear stored token/session data
    // In a real app, you'd clear AsyncStorage or secure storage
  }

  validateToken(token: string): { userId: string; email: string } | null {
    try {
      const decoded = JSON.parse(atob(token));
      return decoded;
    } catch {
      return null;
    }
  }
}

export const authService = new AuthService();