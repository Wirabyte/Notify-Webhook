import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebhooksModule } from './webhooks/webhooks.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [WebhooksModule, NotificationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
