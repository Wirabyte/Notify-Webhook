import { ApiProperty } from '@nestjs/swagger';

export enum NotificationPlatform {
  DISCORD = 'discord',
  LINE = 'line',
  TELEGRAM = 'telegram',
}

export class WebhookDto {
  @ApiProperty({
    description: 'Unique identifier for the webhook',
    example: 'cd410407-640b-4a8d-9dee-b89b88e31659',
  })
  id?: string;

  @ApiProperty({
    description: 'Name of the webhook',
    example: 'Discord Server Alerts',
  })
  name: string;

  @ApiProperty({
    description: 'Description of the webhook',
    example: 'Sends critical alerts to Discord server',
  })
  description?: string;

  @ApiProperty({
    description: 'Whether the webhook is active',
    example: true,
  })
  isActive: boolean;

  @ApiProperty({
    type: [String],
    enum: NotificationPlatform,
    description: 'Platforms to send notifications to',
    example: ['discord', 'telegram'],
  })
  platforms: NotificationPlatform[];

  @ApiProperty({
    description: 'Configuration for each platform',
    example: {
      discord: {
        webhookUrl: 'https://discord.com/api/webhooks/123456789/abcdef',
      },
    },
  })
  platformConfigs: { [key in NotificationPlatform]?: any };

  @ApiProperty({
    description: 'Creation timestamp',
    example: '2025-01-01T00:00:00.000Z',
  })
  createdAt?: Date;

  @ApiProperty({
    description: 'Last updated timestamp',
    example: '2025-01-01T00:00:00.000Z',
  })
  updatedAt?: Date;
}

export class CreateWebhookDto {
  @ApiProperty({
    description: 'Name of the webhook',
    example: 'Discord Server Alerts',
  })
  name: string;

  @ApiProperty({
    description: 'Description of the webhook',
    required: false,
    example: 'Sends critical alerts to Discord server',
  })
  description?: string;

  @ApiProperty({
    type: [String],
    enum: NotificationPlatform,
    description: 'Platforms to send notifications to',
    example: ['discord', 'telegram'],
  })
  platforms: NotificationPlatform[];

  @ApiProperty({
    description: 'Configuration for each platform',
    example: {
      discord: {
        webhookUrl: 'https://discord.com/api/webhooks/123456789/abcdef',
      },
      telegram: {
        botToken: 'bot123456789:abcdef',
        chatId: '-123456789',
      },
    },
  })
  platformConfigs: { [key in NotificationPlatform]?: any };
}

export class UpdateWebhookDto {
  @ApiProperty({ description: 'Name of the webhook', required: false })
  name?: string;

  @ApiProperty({ description: 'Description of the webhook', required: false })
  description?: string;

  @ApiProperty({
    description: 'Whether the webhook is active',
    required: false,
  })
  isActive?: boolean;

  @ApiProperty({
    type: [String],
    enum: NotificationPlatform,
    description: 'Platforms to send notifications to',
    required: false,
  })
  platforms?: NotificationPlatform[];

  @ApiProperty({
    description: 'Configuration for each platform',
    required: false,
  })
  platformConfigs?: { [key in NotificationPlatform]?: any };
}
