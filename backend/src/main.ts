import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import type { AppConfig, CorsConfig, ApiDocsConfig, ContactConfig, DatabaseConfig } from './config/config.types';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Get configuration values with proper typing
  const appConfig = configService.get<AppConfig>('app')!;
  const corsConfig = configService.get<CorsConfig>('cors')!;
  const apiDocsConfig = configService.get<ApiDocsConfig>('apiDocs')!;
  const contactConfig = configService.get<ContactConfig>('contact')!;
  const databaseConfig = configService.get<DatabaseConfig>('database')!;

  // Enable CORS with environment-based configuration
  app.enableCors({
    origin: corsConfig.origins,
    credentials: corsConfig.credentials,
  });

  // Conditionally enable Swagger API documentation
  // API docs are enabled for development and staging, disabled for production
  if (apiDocsConfig.enabled) {
    console.log(
      `🔍 API Documentation enabled for environment: ${appConfig.environment}`,
    );

    const config = new DocumentBuilder()
      .setTitle(appConfig.name)
      .setDescription(
        `
${appConfig.description}

## Environment: ${appConfig.environment.toUpperCase()}

## Features
- ✅ Create and manage webhooks
- ✅ Support for Discord, LINE, and Telegram
- ✅ Real-time notification sending
- ✅ SQLite database with TypeORM
- ✅ Comprehensive error handling
- ✅ Environment-based configuration

## Database
This API uses SQLite with TypeORM for data persistence. All webhook configurations are stored in a local SQLite database.

## Supported Platforms
- **Discord**: Send messages via Discord webhooks
- **LINE**: Send notifications via LINE Notify
- **Telegram**: Send messages via Telegram Bot API
      `,
      )
      .setVersion(appConfig.version)
      .addTag('webhooks', 'Webhook management endpoints')
      .addTag('notifications', 'Notification sending endpoints')
      .setContact(contactConfig.name, contactConfig.url, contactConfig.email)
      .setLicense('MIT', 'https://opensource.org/licenses/MIT')
      .addServer(
        `http://localhost:${appConfig.port}`,
        `${appConfig.environment} server`,
      )
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(apiDocsConfig.path, app, document, {
      customSiteTitle: `${appConfig.name} - ${appConfig.environment}`,
      customfavIcon: '/favicon.ico',
      customCss: `
        .topbar-wrapper img { content: url('data:image/svg+xml;base64,'); }
        .swagger-ui .topbar { background-color: ${appConfig.environment === 'production' ? '#d32f2f' : appConfig.environment === 'staging' ? '#ff9800' : '#1976d2'}; }
        .swagger-ui .topbar .download-url-wrapper input[type=text] { border: 2px solid #fff; }
      `,
      swaggerOptions: {
        persistAuthorization: true,
        displayRequestDuration: true,
        docExpansion: 'list',
        filter: true,
        showRequestHeaders: true,
        tryItOutEnabled: true,
      },
    });

    console.log(
      `📖 Swagger documentation available at: http://localhost:${appConfig.port}/${apiDocsConfig.path}`,
    );
  } else {
    console.log(
      `🔒 API Documentation disabled for environment: ${appConfig.environment}`,
    );
  }

  await app.listen(appConfig.port);
  console.log(
    `🚀 Application is running on: http://localhost:${appConfig.port}`,
  );
  console.log(`🌍 Environment: ${appConfig.environment}`);
  console.log(`🗄️  Database: ${databaseConfig.database}`);
}
void bootstrap();
