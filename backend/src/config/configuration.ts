import { registerAs } from '@nestjs/config';
import {
  ENV_KEYS,
  DEFAULT_VALUES,
  ENVIRONMENT,
  shouldEnableApiDocs,
  shouldSynchronizeDb,
  shouldEnableDbLogging,
} from './env.constants';
import type {
  DatabaseConfig,
  AppConfig,
  ApiDocsConfig,
  CorsConfig,
  ContactConfig,
} from './config.types';

export const databaseConfig = registerAs('database', (): DatabaseConfig => {
  const nodeEnv = process.env[ENV_KEYS.NODE_ENV] || DEFAULT_VALUES.NODE_ENV;

  return {
    type: (process.env[ENV_KEYS.DB_TYPE] || DEFAULT_VALUES.DB_TYPE) as
      | 'sqlite'
      | 'postgres'
      | 'mysql',
    host: process.env[ENV_KEYS.DB_HOST],
    port: process.env[ENV_KEYS.DB_PORT]
      ? parseInt(process.env[ENV_KEYS.DB_PORT]!, 10)
      : undefined,
    username: process.env[ENV_KEYS.DB_USERNAME],
    password: process.env[ENV_KEYS.DB_PASSWORD],
    database: process.env[ENV_KEYS.DB_DATABASE] || DEFAULT_VALUES.DB_DATABASE,
    synchronize: process.env[ENV_KEYS.DB_SYNCHRONIZE]
      ? process.env[ENV_KEYS.DB_SYNCHRONIZE] === 'true'
      : shouldSynchronizeDb(nodeEnv),
    logging: process.env[ENV_KEYS.DB_LOGGING]
      ? process.env[ENV_KEYS.DB_LOGGING] === 'true'
      : shouldEnableDbLogging(nodeEnv),
  };
});

export const appConfig = registerAs('app', (): AppConfig => {
  const nodeEnv = process.env[ENV_KEYS.NODE_ENV] || DEFAULT_VALUES.NODE_ENV;

  return {
    port: process.env[ENV_KEYS.PORT]
      ? parseInt(process.env[ENV_KEYS.PORT]!, 10)
      : DEFAULT_VALUES.PORT,
    environment: nodeEnv,
    isDevelopment: nodeEnv === ENVIRONMENT.DEVELOPMENT,
    isStaging: nodeEnv === ENVIRONMENT.STAGING,
    isProduction: nodeEnv === ENVIRONMENT.PRODUCTION,
    name: process.env[ENV_KEYS.APP_NAME] || DEFAULT_VALUES.APP_NAME,
    version: process.env[ENV_KEYS.APP_VERSION] || DEFAULT_VALUES.APP_VERSION,
    description:
      process.env[ENV_KEYS.APP_DESCRIPTION] || DEFAULT_VALUES.APP_DESCRIPTION,
  };
});

export const apiDocsConfig = registerAs('apiDocs', (): ApiDocsConfig => {
  const nodeEnv = process.env[ENV_KEYS.NODE_ENV] || DEFAULT_VALUES.NODE_ENV;

  return {
    enabled: process.env[ENV_KEYS.API_DOCS_ENABLED]
      ? process.env[ENV_KEYS.API_DOCS_ENABLED] === 'true'
      : shouldEnableApiDocs(nodeEnv),
    path: process.env[ENV_KEYS.API_DOCS_PATH] || DEFAULT_VALUES.API_DOCS_PATH,
  };
});

export const corsConfig = registerAs('cors', (): CorsConfig => {
  const originsEnv =
    process.env[ENV_KEYS.CORS_ORIGINS] || DEFAULT_VALUES.CORS_ORIGINS;
  const origins = originsEnv.split(',').map((origin) => origin.trim());

  return {
    origins,
    credentials: process.env[ENV_KEYS.CORS_CREDENTIALS]
      ? process.env[ENV_KEYS.CORS_CREDENTIALS] === 'true'
      : DEFAULT_VALUES.CORS_CREDENTIALS,
  };
});

export const contactConfig = registerAs(
  'contact',
  (): ContactConfig => ({
    name: process.env[ENV_KEYS.CONTACT_NAME] || DEFAULT_VALUES.CONTACT_NAME,
    url: process.env[ENV_KEYS.CONTACT_URL] || DEFAULT_VALUES.CONTACT_URL,
    email: process.env[ENV_KEYS.CONTACT_EMAIL] || DEFAULT_VALUES.CONTACT_EMAIL,
  }),
);
