import { Injectable, NotFoundException } from '@nestjs/common';
import { Webhook } from './entities/webhook.entity';
import { CreateWebhookDto, UpdateWebhookDto } from './dto/webhook.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class WebhooksService {
  private webhooks: Webhook[] = [];

  create(createWebhookDto: CreateWebhookDto): Webhook {
    const webhook = new Webhook({
      id: uuidv4(),
      ...createWebhookDto,
    });

    this.webhooks.push(webhook);
    return webhook;
  }

  findAll(): Webhook[] {
    return this.webhooks;
  }

  findOne(id: string): Webhook {
    const webhook = this.webhooks.find((w) => w.id === id);
    if (!webhook) {
      throw new NotFoundException(`Webhook with ID ${id} not found`);
    }
    return webhook;
  }

  update(id: string, updateWebhookDto: UpdateWebhookDto): Webhook {
    const webhookIndex = this.webhooks.findIndex((w) => w.id === id);
    if (webhookIndex === -1) {
      throw new NotFoundException(`Webhook with ID ${id} not found`);
    }

    const webhook = this.webhooks[webhookIndex];
    Object.assign(webhook, updateWebhookDto);
    webhook.updatedAt = new Date();

    this.webhooks[webhookIndex] = webhook;
    return webhook;
  }

  remove(id: string): void {
    const webhookIndex = this.webhooks.findIndex((w) => w.id === id);
    if (webhookIndex === -1) {
      throw new NotFoundException(`Webhook with ID ${id} not found`);
    }

    this.webhooks.splice(webhookIndex, 1);
  }

  // Method to trigger a webhook
  trigger(id: string, payload: any): { success: boolean; message: string } {
    const webhook = this.findOne(id);

    if (!webhook.isActive) {
      return { success: false, message: 'Webhook is not active' };
    }

    // Here you would implement the actual notification logic
    // For now, just return success
    console.log(`Triggered webhook ${webhook.name} with payload:`, payload);
    console.log(`Platforms to notify: ${webhook.platforms.join(', ')}`);

    return { success: true, message: 'Webhook triggered successfully' };
  }
}
