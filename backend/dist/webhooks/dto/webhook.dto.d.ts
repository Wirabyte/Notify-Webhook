export declare enum NotificationPlatform {
    DISCORD = "discord",
    LINE = "line",
    TELEGRAM = "telegram"
}
export declare class WebhookDto {
    id?: string;
    name: string;
    description?: string;
    isActive: boolean;
    platforms: NotificationPlatform[];
    platformConfigs: {
        [key in NotificationPlatform]?: any;
    };
    createdAt?: Date;
    updatedAt?: Date;
}
export declare class CreateWebhookDto {
    name: string;
    description?: string;
    platforms: NotificationPlatform[];
    platformConfigs: {
        [key in NotificationPlatform]?: any;
    };
}
export declare class UpdateWebhookDto {
    name?: string;
    description?: string;
    isActive?: boolean;
    platforms?: NotificationPlatform[];
    platformConfigs?: {
        [key in NotificationPlatform]?: any;
    };
}
