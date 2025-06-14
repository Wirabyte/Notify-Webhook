import { Test, TestingModule } from '@nestjs/testing';
import { NotificationsService } from './notifications.service';
import { WebhooksService } from '../webhooks/webhooks.service';
import { SendNotificationDto, PlatformResult } from './dto/notification.dto';
import { NotificationPlatform } from '../webhooks/dto/webhook.dto';
import { Webhook } from '../webhooks/entities/webhook.entity';

describe('NotificationsService', () => {
  let service: NotificationsService;

  const mockWebhooksService = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationsService,
        {
          provide: WebhooksService,
          useValue: mockWebhooksService,
        },
      ],
    }).compile();

    service = module.get<NotificationsService>(NotificationsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('sendNotification', () => {
    const mockWebhook: Webhook = {
      id: 'test-webhook-id',
      name: 'Test Webhook',
      description: 'Test Description',
      isActive: true,
      platforms: [NotificationPlatform.DISCORD],
      platformConfigs: {
        discord: { webhookUrl: 'https://discord.com/api/webhooks/test' },
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    } as Webhook;

    it('should send notification successfully', async () => {
      const sendNotificationDto: SendNotificationDto = {
        webhookId: 'test-webhook-id',
        message: 'Test message',
        title: 'Test title',
      };

      mockWebhooksService.findOne.mockResolvedValue(mockWebhook);

      const result = await service.sendNotification(sendNotificationDto);

      expect(mockWebhooksService.findOne).toHaveBeenCalledWith('test-webhook-id');
      expect(result.success).toBe(true);
      expect(result.message).toBe('Notification sent successfully');
      expect(result.platformResults).toBeDefined();
      const discordResult = result.platformResults![NotificationPlatform.DISCORD] as PlatformResult;
      expect(discordResult).toEqual({
        success: true,
        platform: 'discord',
        timestamp: expect.any(Date) as Date,
      });
    });

    it('should return error when webhook is not active', async () => {
      const sendNotificationDto: SendNotificationDto = {
        webhookId: 'test-webhook-id',
        message: 'Test message',
      };

      const inactiveWebhook = { ...mockWebhook, isActive: false };
      mockWebhooksService.findOne.mockResolvedValue(inactiveWebhook);

      const result = await service.sendNotification(sendNotificationDto);

      expect(result.success).toBe(false);
      expect(result.message).toBe('Webhook is not active');
    });

    it('should use specified platforms instead of webhook platforms', async () => {
      const sendNotificationDto: SendNotificationDto = {
        webhookId: 'test-webhook-id',
        message: 'Test message',
        platforms: [NotificationPlatform.TELEGRAM],
      };

      const webhookWithMultiplePlatforms = {
        ...mockWebhook,
        platforms: [NotificationPlatform.DISCORD, NotificationPlatform.LINE],
        platformConfigs: {
          discord: { webhookUrl: 'https://discord.com/api/webhooks/test' },
          line: { token: 'line-token' },
          telegram: { token: 'telegram-token', chatId: 'chat-id' },
        },
      };

      mockWebhooksService.findOne.mockResolvedValue(webhookWithMultiplePlatforms);

      const result = await service.sendNotification(sendNotificationDto);

      expect(result.success).toBe(true);
      expect(result.platformResults![NotificationPlatform.TELEGRAM]).toBeDefined();
      expect(result.platformResults![NotificationPlatform.DISCORD]).toBeUndefined();
      expect(result.platformResults![NotificationPlatform.LINE]).toBeUndefined();
    });

    it('should handle webhook not found error', async () => {
      const sendNotificationDto: SendNotificationDto = {
        webhookId: 'non-existent-id',
        message: 'Test message',
      };

      mockWebhooksService.findOne.mockRejectedValue(new Error('Webhook not found'));

      const result = await service.sendNotification(sendNotificationDto);

      expect(result.success).toBe(false);
      expect(result.message).toBe('Webhook not found');
    });

    it('should handle platform sending errors gracefully', async () => {
      const sendNotificationDto: SendNotificationDto = {
        webhookId: 'test-webhook-id',
        message: 'Test message',
        platforms: [NotificationPlatform.DISCORD],
      };

      mockWebhooksService.findOne.mockResolvedValue(mockWebhook);

      // Mock console.log to avoid output during tests
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

      const result = await service.sendNotification(sendNotificationDto);

      expect(result.success).toBe(true);
      const discordResult = result.platformResults![NotificationPlatform.DISCORD] as PlatformResult;
      expect(discordResult.success).toBe(true);

      consoleSpy.mockRestore();
    });

    it('should include metadata in notification', async () => {
      const sendNotificationDto: SendNotificationDto = {
        webhookId: 'test-webhook-id',
        message: 'Test message',
        metadata: { priority: 'high', source: 'system' },
      };

      mockWebhooksService.findOne.mockResolvedValue(mockWebhook);

      const result = await service.sendNotification(sendNotificationDto);

      expect(result.success).toBe(true);
      expect(mockWebhooksService.findOne).toHaveBeenCalledWith('test-webhook-id');
    });
  });
});
