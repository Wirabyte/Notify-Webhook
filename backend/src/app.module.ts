import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebhooksModule } from './webhooks/webhooks.module';
import { NotificationsModule } from './notifications/notifications.module';
import { Webhook } from './webhooks/entities/webhook.entity';
import { configOptions } from './config';
import type { DatabaseConfig } from './config/config.types';

@Module({
  imports: [
    // Configuration module with environment-based setup
    ConfigModule.forRoot(configOptions),

    // TypeORM configuration using ConfigService
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const dbConfig = configService.get<DatabaseConfig>('database')!;
        return {
          type: dbConfig.type,
          host: dbConfig.host,
          port: dbConfig.port,
          username: dbConfig.username,
          password: dbConfig.password,
          database: dbConfig.database,
          entities: [Webhook],
          synchronize: dbConfig.synchronize,
          logging: dbConfig.logging,
        };
      },
    }),

    WebhooksModule,
    NotificationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
