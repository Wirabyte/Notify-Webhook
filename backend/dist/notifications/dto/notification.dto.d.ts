import { NotificationPlatform } from '../../webhooks/dto/webhook.dto';
export declare class SendNotificationDto {
    webhookId: string;
    message: string;
    title?: string;
    platforms?: NotificationPlatform[];
    metadata?: any;
}
export declare class NotificationResponseDto {
    success: boolean;
    message: string;
    platformResults?: {
        [key in NotificationPlatform]?: any;
    };
}
