import { ApiProperty } from '@nestjs/swagger';
import { NotificationPlatform } from '../../webhooks/dto/webhook.dto';

export class SendNotificationDto {
  @ApiProperty({ description: 'Webhook ID to send notification from' })
  webhookId: string;

  @ApiProperty({ description: 'Message content' })
  message: string;

  @ApiProperty({
    description: 'Optional title for the notification',
    required: false,
  })
  title?: string;

  @ApiProperty({
    enum: NotificationPlatform,
    isArray: true,
    description:
      'Specific platforms to send to (optional, will use webhook config if not provided)',
    required: false,
  })
  platforms?: NotificationPlatform[];

  @ApiProperty({
    description: 'Additional metadata for the notification',
    required: false,
  })
  metadata?: any;
}

export class NotificationResponseDto {
  @ApiProperty({
    description: 'Whether the notification was sent successfully',
  })
  success: boolean;

  @ApiProperty({ description: 'Response message' })
  message: string;

  @ApiProperty({
    description: 'Details about each platform response',
    required: false,
  })
  platformResults?: { [key in NotificationPlatform]?: any };
}
