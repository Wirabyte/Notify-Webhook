import { NotificationPlatform } from '../dto/webhook.dto';
export declare class Webhook {
    id: string;
    name: string;
    description?: string;
    isActive: boolean;
    platforms: NotificationPlatform[];
    platformConfigs: {
        [key in NotificationPlatform]?: any;
    };
    createdAt: Date;
    updatedAt: Date;
    constructor(partial: Partial<Webhook>);
}
