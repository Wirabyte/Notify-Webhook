/**
 * Environment Configuration Constants
 * Centralized constants for managing environment variables with type safety
 */

export const ENV_KEYS = {
  // Application Environment
  NODE_ENV: 'NODE_ENV',
  PORT: 'PORT',

  // Database Configuration
  DB_TYPE: 'DB_TYPE',
  DB_HOST: 'DB_HOST',
  DB_PORT: 'DB_PORT',
  DB_NAME: 'DB_NAME',
  DB_USERNAME: 'DB_USERNAME',
  DB_PASSWORD: 'DB_PASSWORD',
  DB_DATABASE: 'DB_DATABASE',
  DB_SYNCHRONIZE: 'DB_SYNCHRONIZE',
  DB_LOGGING: 'DB_LOGGING',

  // API Documentation
  API_DOCS_ENABLED: 'API_DOCS_ENABLED',
  API_DOCS_PATH: 'API_DOCS_PATH',

  // CORS Configuration
  CORS_ORIGINS: 'CORS_ORIGINS',
  CORS_CREDENTIALS: 'CORS_CREDENTIALS',

  // Application Information
  APP_NAME: 'APP_NAME',
  APP_VERSION: 'APP_VERSION',
  APP_DESCRIPTION: 'APP_DESCRIPTION',

  // Contact Information
  CONTACT_NAME: 'CONTACT_NAME',
  CONTACT_URL: 'CONTACT_URL',
  CONTACT_EMAIL: 'CONTACT_EMAIL',
} as const;

export const ENVIRONMENT = {
  DEVELOPMENT: 'development',
  STAGING: 'staging',
  PRODUCTION: 'production',
} as const;

export type Environment = (typeof ENVIRONMENT)[keyof typeof ENVIRONMENT];

export const DEFAULT_VALUES = {
  PORT: 3000,
  NODE_ENV: ENVIRONMENT.DEVELOPMENT,
  DB_TYPE: 'sqlite',
  DB_DATABASE: 'database.sqlite',
  DB_SYNCHRONIZE: true,
  DB_LOGGING: false,
  API_DOCS_ENABLED: true,
  API_DOCS_PATH: 'api',
  CORS_ORIGINS: 'http://localhost:4200,http://localhost:3000',
  CORS_CREDENTIALS: true,
  APP_NAME: 'Webhook Notification API',
  APP_VERSION: '1.0.0',
  APP_DESCRIPTION: 'API for managing webhooks and notifications to multiple platforms',
  CONTACT_NAME: 'API Support',
  CONTACT_URL: 'https://github.com/Thanaphol47825/Notify-Webhook',
  CONTACT_EMAIL: 'support@example.com',
} as const;

/**
 * Required environment variables that must be set
 */
export const REQUIRED_ENV_VARS: string[] = [
  // Add any required environment variables here
  // For now, all have defaults, but this can be extended
];

/**
 * Utility function to get environment-specific API docs setting
 */
export function shouldEnableApiDocs(nodeEnv: string): boolean {
  // API docs are enabled for development and staging, disabled for production
  return nodeEnv !== ENVIRONMENT.PRODUCTION;
}

/**
 * Utility function to get environment-specific database synchronization setting
 */
export function shouldSynchronizeDb(nodeEnv: string): boolean {
  // Database synchronization is enabled for development, disabled for staging and production
  return nodeEnv === ENVIRONMENT.DEVELOPMENT;
}

/**
 * Utility function to get environment-specific database logging setting
 */
export function shouldEnableDbLogging(nodeEnv: string): boolean {
  // Database logging is enabled for development, disabled for staging and production
  return nodeEnv === ENVIRONMENT.DEVELOPMENT;
}
