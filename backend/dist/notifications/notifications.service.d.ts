import { WebhooksService } from '../webhooks/webhooks.service';
import { SendNotificationDto, NotificationResponseDto } from './dto/notification.dto';
export declare class NotificationsService {
    private readonly webhooksService;
    constructor(webhooksService: WebhooksService);
    sendNotification(sendNotificationDto: SendNotificationDto): Promise<NotificationResponseDto>;
    private sendToPlatform;
    private sendToDiscord;
    private sendToLine;
    private sendToTelegram;
}
