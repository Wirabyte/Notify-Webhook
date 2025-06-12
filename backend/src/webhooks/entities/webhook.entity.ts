import { NotificationPlatform } from '../dto/webhook.dto';

export class Webhook {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
  platforms: NotificationPlatform[];
  platformConfigs: { [key in NotificationPlatform]?: any };
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<Webhook>) {
    Object.assign(this, partial);
    this.createdAt = this.createdAt || new Date();
    this.updatedAt = new Date();
    this.isActive = this.isActive ?? true;
  }
}
