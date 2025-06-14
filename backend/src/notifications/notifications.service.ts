import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { WebhooksService } from '../webhooks/webhooks.service';
import { SendNotificationDto, NotificationResponseDto, PlatformResult } from './dto/notification.dto';
import { NotificationPlatform } from '../webhooks/dto/webhook.dto';

interface PlatformData {
  message: string;
  title?: string;
  metadata?: Record<string, unknown>;
  config?: Record<string, unknown>;
}

@Injectable()
export class NotificationsService {
  constructor(
    @Inject(forwardRef(() => WebhooksService))
    private readonly webhooksService: WebhooksService,
  ) {}

  async sendNotification(sendNotificationDto: SendNotificationDto): Promise<NotificationResponseDto> {
    const { webhookId, message, title, platforms } = sendNotificationDto;
    const metadata = sendNotificationDto.metadata;

    try {
      const webhook = await this.webhooksService.findOne(webhookId);

      if (!webhook.isActive) {
        return {
          success: false,
          message: 'Webhook is not active',
        };
      }

      // Use specified platforms or fallback to webhook platforms
      const targetPlatforms = platforms || webhook.platforms;
      const platformResults: { [key in NotificationPlatform]?: PlatformResult } = {};

      // Send to each platform
      for (const platform of targetPlatforms) {
        try {
          const result = await this.sendToPlatform(platform, {
            message,
            title,
            metadata: metadata || {},
            config: (webhook.platformConfigs[platform] as Record<string, unknown>) || {},
          });
          platformResults[platform] = result;
        } catch (error: unknown) {
          platformResults[platform] = {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error occurred',
          };
        }
      }

      return {
        success: true,
        message: 'Notification sent successfully',
        platformResults,
      };
    } catch (error: unknown) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  private async sendToPlatform(platform: NotificationPlatform, data: PlatformData): Promise<PlatformResult> {
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
        throw new Error(`Unsupported platform: ${platform as string}`);
    }
  }

  private async sendToDiscord(data: PlatformData): Promise<PlatformResult> {
    // Implement Discord webhook logic here
    console.log('Sending to Discord:', data);
    return Promise.resolve({ success: true, platform: 'discord', timestamp: new Date() });
  }

  private async sendToLine(data: PlatformData): Promise<PlatformResult> {
    // Implement LINE notification logic here
    console.log('Sending to LINE:', data);
    return Promise.resolve({ success: true, platform: 'line', timestamp: new Date() });
  }

  private async sendToTelegram(data: PlatformData): Promise<PlatformResult> {
    // Implement Telegram bot logic here
    console.log('Sending to Telegram:', data);
    return Promise.resolve({ success: true, platform: 'telegram', timestamp: new Date() });
  }
}
