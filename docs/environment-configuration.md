# Environment Configuration Guide

This document explains the environment configuration system implemented for the Webhook Notification API.

## Overview

The application now uses a comprehensive environment configuration system with:
- ✅ **Environment constants** for managing environment variables
- ✅ **Type-safe configuration** with proper TypeScript typing
- ✅ **Environment-specific settings** for development, staging, and production
- ✅ **Conditional API documentation** (disabled in production)
- ✅ **Validation and default values** for all configuration options

## Environment Files

### Available Environment Files

- `.env.development` - Development environment settings
- `.env.staging` - Staging environment settings  
- `.env.production` - Production environment settings
- `.env.example` - Template file with all available options

### File Priority

The configuration system loads files in this order:
1. `.env.{NODE_ENV}` (e.g., `.env.production`)
2. `.env` (fallback)

## Configuration Structure

### Environment Constants (`src/config/env.constants.ts`)

All environment variable keys are defined as constants:

```typescript
export const ENV_KEYS = {
  NODE_ENV: 'NODE_ENV',
  PORT: 'PORT',
  DB_TYPE: 'DB_TYPE',
  // ... more keys
};

export const ENVIRONMENT = {
  DEVELOPMENT: 'development',
  STAGING: 'staging',
  PRODUCTION: 'production',
} as const;
```

### Configuration Types (`src/config/config.types.ts`)

Type-safe interfaces for all configuration sections:

```typescript
export interface AppConfig {
  port: number;
  environment: string;
  isDevelopment: boolean;
  isStaging: boolean;
  isProduction: boolean;
  // ... more properties
}
```

## Environment Variables

### Application Settings

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `NODE_ENV` | No | `development` | Environment mode |
| `PORT` | No | `3000` | Server port |

### Database Settings

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `DB_TYPE` | No | `sqlite` | Database type |
| `DB_DATABASE` | No | `database.sqlite` | Database file/name |
| `DB_SYNCHRONIZE` | No | Auto | Enable schema sync |
| `DB_LOGGING` | No | Auto | Enable query logging |

### API Documentation

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `API_DOCS_ENABLED` | No | Auto | Enable Swagger docs |
| `API_DOCS_PATH` | No | `api` | Swagger endpoint path |

**Auto Behavior:**
- **Development**: API docs enabled, DB sync enabled, logging enabled
- **Staging**: API docs enabled, DB sync disabled, logging disabled  
- **Production**: API docs **DISABLED**, DB sync disabled, logging disabled

### CORS Settings

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `CORS_ORIGINS` | No | `http://localhost:4200,http://localhost:3000` | Allowed origins |
| `CORS_CREDENTIALS` | No | `true` | Allow credentials |

## Environment-Specific Behavior

### Development Environment
```bash
NODE_ENV=development npm run start:dev
```
- ✅ API Documentation enabled at `/api`
- ✅ Database synchronization enabled
- ✅ Query logging enabled
- ✅ Development-friendly CORS settings

### Staging Environment  
```bash
NODE_ENV=staging npm run start:staging
```
- ✅ API Documentation enabled at `/api`
- ❌ Database synchronization disabled
- ❌ Query logging disabled
- 🔧 Staging-specific CORS settings

### Production Environment
```bash
NODE_ENV=production npm run start:prod
```
- ❌ **API Documentation DISABLED**
- ❌ Database synchronization disabled
- ❌ Query logging disabled
- 🔐 Production-only CORS settings

## Usage Examples

### Starting the Application

```bash
# Development (default)
npm run start:dev

# Staging
npm run start:staging  

# Production
npm run start:prod
```

### Custom Environment Variables

Create a `.env` file:

```env
NODE_ENV=development
PORT=4000
DB_DATABASE=custom-database.sqlite
API_DOCS_ENABLED=false
CORS_ORIGINS=https://myapp.com
```

### Environment Validation

The system validates:
- ✅ NODE_ENV must be one of: `development`, `staging`, `production`
- ✅ PORT must be a number between 1-65535
- ✅ Boolean values must be `true` or `false`
- ✅ Required variables are checked (none currently required)

## Configuration Files

### Core Files

- `src/config/env.constants.ts` - Environment variable constants and defaults
- `src/config/config.types.ts` - TypeScript type definitions
- `src/config/configuration.ts` - Configuration factories  
- `src/config/env.validation.ts` - Validation logic
- `src/config/index.ts` - Exports

### Integration

- `src/app.module.ts` - ConfigModule setup and TypeORM integration
- `src/main.ts` - Environment-based application bootstrap

## Benefits

1. **Type Safety**: Full TypeScript support with proper typing
2. **Environment Isolation**: Clear separation between dev/staging/prod
3. **Security**: API docs automatically disabled in production
4. **Maintainability**: Centralized configuration management
5. **Validation**: Built-in validation with helpful error messages
6. **Flexibility**: Support for multiple database types and configurations

## Migration from Previous Setup

The system maintains backward compatibility while adding:
- Environment-based configuration loading
- Type-safe access to configuration values
- Automatic environment-specific defaults
- Comprehensive validation

No breaking changes to existing functionality.