import { ConfigModuleOptions } from '@nestjs/config';
import {
  appConfig,
  databaseConfig,
  apiDocsConfig,
  corsConfig,
  contactConfig,
} from './configuration';
import {
  ENV_KEYS,
  REQUIRED_ENV_VARS,
  DEFAULT_VALUES,
  ENVIRONMENT,
} from './env.constants';

/**
 * Validates environment variables and provides defaults
 */
export function validateEnv(config: Record<string, any>): Record<string, any> {
  const errors: string[] = [];

  // Check required environment variables
  for (const requiredVar of REQUIRED_ENV_VARS) {
    if (!config[requiredVar]) {
      errors.push(`Missing required environment variable: ${requiredVar}`);
    }
  }

  if (errors.length > 0) {
    throw new Error(`Environment validation failed:\n${errors.join('\n')}`);
  }

  // Validate NODE_ENV
  const nodeEnv = config[ENV_KEYS.NODE_ENV] || DEFAULT_VALUES.NODE_ENV;
  const validEnvironments = Object.values(ENVIRONMENT);
  if (!validEnvironments.includes(nodeEnv)) {
    console.warn(
      `Invalid NODE_ENV "${nodeEnv}". Using default: ${DEFAULT_VALUES.NODE_ENV}`,
    );
    config[ENV_KEYS.NODE_ENV] = DEFAULT_VALUES.NODE_ENV;
  }

  // Validate PORT
  const port = config[ENV_KEYS.PORT];
  if (
    port &&
    (isNaN(Number(port)) || Number(port) < 1 || Number(port) > 65535)
  ) {
    console.warn(
      `Invalid PORT "${port}". Using default: ${DEFAULT_VALUES.PORT}`,
    );
    config[ENV_KEYS.PORT] = DEFAULT_VALUES.PORT.toString();
  }

  // Validate boolean values
  const booleanFields = [
    ENV_KEYS.DB_SYNCHRONIZE,
    ENV_KEYS.DB_LOGGING,
    ENV_KEYS.API_DOCS_ENABLED,
    ENV_KEYS.CORS_CREDENTIALS,
  ];

  for (const field of booleanFields) {
    if (config[field] && !['true', 'false'].includes(config[field])) {
      console.warn(
        `Invalid boolean value for ${field}: "${config[field]}". Expected "true" or "false"`,
      );
    }
  }

  return config;
}

/**
 * Configuration module options
 */
export const configOptions: ConfigModuleOptions = {
  isGlobal: true,
  envFilePath: [`.env.${process.env.NODE_ENV || 'development'}`, '.env'],
  load: [appConfig, databaseConfig, apiDocsConfig, corsConfig, contactConfig],
  validate: validateEnv,
  validationOptions: {
    allowUnknown: true,
    abortEarly: false,
  },
};
