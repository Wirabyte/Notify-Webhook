import { Webhook } from './entities/webhook.entity';
import { CreateWebhookDto, UpdateWebhookDto } from './dto/webhook.dto';
export declare class WebhooksService {
    private webhooks;
    create(createWebhookDto: CreateWebhookDto): Webhook;
    findAll(): Webhook[];
    findOne(id: string): Webhook;
    update(id: string, updateWebhookDto: UpdateWebhookDto): Webhook;
    remove(id: string): void;
    trigger(id: string, payload: any): {
        success: boolean;
        message: string;
    };
}
