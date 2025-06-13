import { Test, TestingModule } from '@nestjs/testing';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { SendNotificationDto } from './dto/notification.dto';
import { NotificationPlatform } from '../webhooks/dto/webhook.dto';

describe('NotificationsController', () => {
  let controller: NotificationsController;

  const mockNotificationsService = {
    sendNotification: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotificationsController],
      providers: [
        {
          provide: NotificationsService,
          useValue: mockNotificationsService,
        },
      ],
    }).compile();

    controller = module.get<NotificationsController>(NotificationsController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('sendNotification', () => {
    it('should call NotificationsService.sendNotification with correct parameters', async () => {
      const sendNotificationDto: SendNotificationDto = {
        webhookId: 'test-webhook-id',
        message: 'Test message',
        title: 'Test title',
        platforms: [NotificationPlatform.DISCORD],
        metadata: { test: 'data' },
      };

      const expectedResponse = {
        success: true,
        message: 'Notification sent successfully',
        platformResults: {
          discord: {
            success: true,
            platform: 'discord',
            timestamp: new Date(),
          },
        },
      };

      mockNotificationsService.sendNotification.mockResolvedValue(expectedResponse);

      const result = await controller.sendNotification(sendNotificationDto);

      expect(mockNotificationsService.sendNotification).toHaveBeenCalledWith(sendNotificationDto);
      expect(result).toEqual(expectedResponse);
    });

    it('should handle service errors', async () => {
      const sendNotificationDto: SendNotificationDto = {
        webhookId: 'test-webhook-id',
        message: 'Test message',
      };

      const expectedResponse = {
        success: false,
        message: 'Webhook not found',
      };

      mockNotificationsService.sendNotification.mockResolvedValue(expectedResponse);

      const result = await controller.sendNotification(sendNotificationDto);

      expect(mockNotificationsService.sendNotification).toHaveBeenCalledWith(sendNotificationDto);
      expect(result).toEqual(expectedResponse);
    });
  });
});
