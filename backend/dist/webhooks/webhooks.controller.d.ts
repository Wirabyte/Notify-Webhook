import { WebhooksService } from './webhooks.service';
import { CreateWebhookDto, UpdateWebhookDto } from './dto/webhook.dto';
export declare class WebhooksController {
    private readonly webhooksService;
    constructor(webhooksService: WebhooksService);
    create(createWebhookDto: CreateWebhookDto): import("./entities/webhook.entity").Webhook;
    findAll(): import("./entities/webhook.entity").Webhook[];
    findOne(id: string): import("./entities/webhook.entity").Webhook;
    update(id: string, updateWebhookDto: UpdateWebhookDto): import("./entities/webhook.entity").Webhook;
    remove(id: string): void;
    trigger(id: string, payload: any): {
        success: boolean;
        message: string;
    };
}
