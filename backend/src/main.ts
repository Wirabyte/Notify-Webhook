import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for frontend communication
  app.enableCors({
    origin: ['http://localhost:4200', 'http://localhost:3000'],
    credentials: true,
  });

  // Enhanced Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Webhook Notification API')
    .setDescription(`
API for managing webhooks and notifications to multiple platforms (Discord, Line, Telegram)

## Features
- ✅ Create and manage webhooks
- ✅ Support for Discord, LINE, and Telegram
- ✅ Real-time notification sending
- ✅ SQLite database with TypeORM
- ✅ Comprehensive error handling

## Database
This API uses SQLite with TypeORM for data persistence. All webhook configurations are stored in a local SQLite database.

## Supported Platforms
- **Discord**: Send messages via Discord webhooks
- **LINE**: Send notifications via LINE Notify
- **Telegram**: Send messages via Telegram Bot API
    `)
    .setVersion('1.0.0')
    .addTag('webhooks', 'Webhook management endpoints')
    .addTag('notifications', 'Notification sending endpoints')
    .setContact('API Support', 'https://github.com/Thanaphol47825/Notify-Webhook', 'support@example.com')
    .setLicense('MIT', 'https://opensource.org/licenses/MIT')
    .addServer('http://localhost:3000', 'Development server')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    customSiteTitle: 'Webhook Notification API',
    customfavIcon: '/favicon.ico',
    customCss: `
      .topbar-wrapper img { content: url('data:image/svg+xml;base64,'); }
      .swagger-ui .topbar { background-color: #1976d2; }
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

  await app.listen(process.env.PORT ?? 3000);
  console.log(
    `Application is running on: http://localhost:${process.env.PORT ?? 3000}`,
  );
  console.log(
    `Swagger documentation: http://localhost:${process.env.PORT ?? 3000}/api`,
  );
}
void bootstrap();
