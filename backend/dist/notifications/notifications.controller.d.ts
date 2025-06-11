import { NotificationsService } from './notifications.service';
import { SendNotificationDto, NotificationResponseDto } from './dto/notification.dto';
export declare class NotificationsController {
    private readonly notificationsService;
    constructor(notificationsService: NotificationsService);
    sendNotification(sendNotificationDto: SendNotificationDto): Promise<NotificationResponseDto>;
}
