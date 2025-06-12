import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { NotificationPlatform } from '../dto/webhook.dto';

@Entity('webhooks')
export class Webhook {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ default: true })
  isActive: boolean;

  @Column('simple-json')
  platforms: NotificationPlatform[];

  @Column('simple-json')
  platformConfigs: { [key in NotificationPlatform]?: any };

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(partial?: Partial<Webhook>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }
}
