import { ApiProperty } from '@nestjs/swagger';

export enum NotificationPlatform {
  DISCORD = 'discord',
  LINE = 'line',
  TELEGRAM = 'telegram',
}

export class WebhookDto {
  @ApiProperty({ description: 'Unique identifier for the webhook' })
  id?: string;

  @ApiProperty({ description: 'Name of the webhook' })
  name: string;

  @ApiProperty({ description: 'Description of the webhook' })
  description?: string;

  @ApiProperty({ description: 'Whether the webhook is active' })
  isActive: boolean;

  @ApiProperty({ 
    type: [String], 
    enum: NotificationPlatform,
    description: 'Platforms to send notifications to'
  })
  platforms: NotificationPlatform[];

  @ApiProperty({ description: 'Configuration for each platform' })
  platformConfigs: { [key in NotificationPlatform]?: any };

  @ApiProperty({ description: 'Creation timestamp' })
  createdAt?: Date;

  @ApiProperty({ description: 'Last updated timestamp' })
  updatedAt?: Date;
}

export class CreateWebhookDto {
  @ApiProperty({ description: 'Name of the webhook' })
  name: string;

  @ApiProperty({ description: 'Description of the webhook', required: false })
  description?: string;

  @ApiProperty({ 
    type: [String], 
    enum: NotificationPlatform,
    description: 'Platforms to send notifications to'
  })
  platforms: NotificationPlatform[];

  @ApiProperty({ description: 'Configuration for each platform' })
  platformConfigs: { [key in NotificationPlatform]?: any };
}

export class UpdateWebhookDto {
  @ApiProperty({ description: 'Name of the webhook', required: false })
  name?: string;

  @ApiProperty({ description: 'Description of the webhook', required: false })
  description?: string;

  @ApiProperty({ description: 'Whether the webhook is active', required: false })
  isActive?: boolean;

  @ApiProperty({ 
    type: [String], 
    enum: NotificationPlatform,
    description: 'Platforms to send notifications to',
    required: false
  })
  platforms?: NotificationPlatform[];

  @ApiProperty({ description: 'Configuration for each platform', required: false })
  platformConfigs?: { [key in NotificationPlatform]?: any };
}