import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Webhook } from './entities/webhook.entity';
import { CreateWebhookDto, UpdateWebhookDto } from './dto/webhook.dto';

@Injectable()
export class WebhooksService {
  constructor(
    @InjectRepository(Webhook)
    private webhookRepository: Repository<Webhook>,
  ) {}

  async create(createWebhookDto: CreateWebhookDto): Promise<Webhook> {
    const webhook = this.webhookRepository.create({
      ...createWebhookDto,
      isActive: true,
    });

    return await this.webhookRepository.save(webhook);
  }

  async findAll(): Promise<Webhook[]> {
    return await this.webhookRepository.find();
  }

  async findOne(id: string): Promise<Webhook> {
    const webhook = await this.webhookRepository.findOne({ where: { id } });
    if (!webhook) {
      throw new NotFoundException(`Webhook with ID ${id} not found`);
    }
    return webhook;
  }

  async update(id: string, updateWebhookDto: UpdateWebhookDto): Promise<Webhook> {
    const webhook = await this.findOne(id);
    Object.assign(webhook, updateWebhookDto);
    return await this.webhookRepository.save(webhook);
  }

  async remove(id: string): Promise<void> {
    const result = await this.webhookRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Webhook with ID ${id} not found`);
    }
  }

  // Method to trigger a webhook
  async trigger(id: string, payload: any): Promise<{ success: boolean; message: string }> {
    const webhook = await this.findOne(id);

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
