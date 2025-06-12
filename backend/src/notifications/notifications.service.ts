import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { WebhooksService } from '../webhooks/webhooks.service';
import {
  SendNotificationDto,
  NotificationResponseDto,
} from './dto/notification.dto';
import { NotificationPlatform } from '../webhooks/dto/webhook.dto';

@Injectable()
export class NotificationsService {
  constructor(
    @Inject(forwardRef(() => WebhooksService))
    private readonly webhooksService: WebhooksService,
  ) {}

  async sendNotification(
    sendNotificationDto: SendNotificationDto,
  ): Promise<NotificationResponseDto> {
    const { webhookId, message, title, platforms, metadata } =
      sendNotificationDto;

    try {
      const webhook = this.webhooksService.findOne(webhookId);

      if (!webhook.isActive) {
        return {
          success: false,
          message: 'Webhook is not active',
        };
      }

      // Use specified platforms or fallback to webhook platforms
      const targetPlatforms = platforms || webhook.platforms;
      const platformResults: { [key in NotificationPlatform]?: any } = {};

      // Send to each platform
      for (const platform of targetPlatforms) {
        try {
          const result = await this.sendToPlatform(platform, {
            message,
            title,
            metadata,
            config: webhook.platformConfigs[platform],
          });
          platformResults[platform] = result;
        } catch (error) {
          platformResults[platform] = {
            success: false,
            error: error.message,
          };
        }
      }

      return {
        success: true,
        message: 'Notification sent successfully',
        platformResults,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  private async sendToPlatform(
    platform: NotificationPlatform,
    data: any,
  ): Promise<any> {
    // This is where you would implement the actual platform-specific logic
    console.log(`Sending to ${platform}:`, data);

    switch (platform) {
      case NotificationPlatform.DISCORD:
        return await this.sendToDiscord(data);
      case NotificationPlatform.LINE:
        return await this.sendToLine(data);
      case NotificationPlatform.TELEGRAM:
        return await this.sendToTelegram(data);
      default:
        throw new Error(`Unsupported platform: ${platform}`);
    }
  }

  private async sendToDiscord(data: any): Promise<any> {
    // Implement Discord webhook logic here
    console.log('Sending to Discord:', data);
    return { success: true, platform: 'discord', timestamp: new Date() };
  }

  private async sendToLine(data: any): Promise<any> {
    // Implement LINE notification logic here
    console.log('Sending to LINE:', data);
    return { success: true, platform: 'line', timestamp: new Date() };
  }

  private async sendToTelegram(data: any): Promise<any> {
    // Implement Telegram bot logic here
    console.log('Sending to Telegram:', data);
    return { success: true, platform: 'telegram', timestamp: new Date() };
  }
}
