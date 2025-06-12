import { ApiProperty } from '@nestjs/swagger';
import { NotificationPlatform } from '../../webhooks/dto/webhook.dto';

export class SendNotificationDto {
  @ApiProperty({ 
    description: 'Webhook ID to send notification from',
    example: 'cd410407-640b-4a8d-9dee-b89b88e31659'
  })
  webhookId: string;

  @ApiProperty({ 
    description: 'Message content',
    example: 'Server is experiencing high load!'
  })
  message: string;

  @ApiProperty({
    description: 'Optional title for the notification',
    required: false,
    example: 'System Alert'
  })
  title?: string;

  @ApiProperty({
    enum: NotificationPlatform,
    isArray: true,
    description:
      'Specific platforms to send to (optional, will use webhook config if not provided)',
    required: false,
    example: ['discord']
  })
  platforms?: NotificationPlatform[];

  @ApiProperty({
    description: 'Additional metadata for the notification',
    required: false,
    example: {
      severity: 'high',
      server: 'web-01',
      timestamp: '2025-01-01T00:00:00Z'
    }
  })
  metadata?: any;
}

export class NotificationResponseDto {
  @ApiProperty({
    description: 'Whether the notification was sent successfully',
    example: true
  })
  success: boolean;

  @ApiProperty({ 
    description: 'Response message',
    example: 'Notification sent successfully'
  })
  message: string;

  @ApiProperty({
    description: 'Details about each platform response',
    required: false,
    example: {
      discord: {
        success: true,
        platform: 'discord',
        timestamp: '2025-01-01T00:00:00.000Z'
      }
    }
  })
  platformResults?: { [key in NotificationPlatform]?: any };
}
