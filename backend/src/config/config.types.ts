export interface DatabaseConfig {
  type: 'sqlite' | 'postgres' | 'mysql';
  host?: string;
  port?: number;
  username?: string;
  password?: string;
  database: string;
  synchronize: boolean;
  logging: boolean;
}

export interface AppConfig {
  port: number;
  environment: string;
  isDevelopment: boolean;
  isStaging: boolean;
  isProduction: boolean;
  name: string;
  version: string;
  description: string;
}

export interface ApiDocsConfig {
  enabled: boolean;
  path: string;
}

export interface CorsConfig {
  origins: string[];
  credentials: boolean;
}

export interface ContactConfig {
  name: string;
  url: string;
  email: string;
}