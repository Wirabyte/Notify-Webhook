import { Test, TestingModule } from '@nestjs/testing';
import { WebhooksController } from './webhooks.controller';
import { WebhooksService } from './webhooks.service';
import { CreateWebhookDto, UpdateWebhookDto } from './dto/webhook.dto';
import { NotificationPlatform } from './dto/webhook.dto';
import { Webhook } from './entities/webhook.entity';

describe('WebhooksController', () => {
  let controller: WebhooksController;

  const mockWebhooksService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    trigger: jest.fn(),
  };

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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WebhooksController],
      providers: [
        {
          provide: WebhooksService,
          useValue: mockWebhooksService,
        },
      ],
    }).compile();

    controller = module.get<WebhooksController>(WebhooksController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a webhook', async () => {
      const createWebhookDto: CreateWebhookDto = {
        name: 'Test Webhook',
        description: 'Test Description',
        platforms: [NotificationPlatform.DISCORD],
        platformConfigs: {
          discord: { webhookUrl: 'https://discord.com/api/webhooks/test' },
        },
      };

      mockWebhooksService.create.mockResolvedValue(mockWebhook);

      const result = await controller.create(createWebhookDto);

      expect(mockWebhooksService.create).toHaveBeenCalledWith(createWebhookDto);
      expect(result).toEqual(mockWebhook);
    });
  });

  describe('findAll', () => {
    it('should return all webhooks', async () => {
      const webhooks = [mockWebhook];
      mockWebhooksService.findAll.mockResolvedValue(webhooks);

      const result = await controller.findAll();

      expect(mockWebhooksService.findAll).toHaveBeenCalled();
      expect(result).toEqual(webhooks);
    });
  });

  describe('findOne', () => {
    it('should return a webhook by id', async () => {
      mockWebhooksService.findOne.mockResolvedValue(mockWebhook);

      const result = await controller.findOne('test-webhook-id');

      expect(mockWebhooksService.findOne).toHaveBeenCalledWith('test-webhook-id');
      expect(result).toEqual(mockWebhook);
    });
  });

  describe('update', () => {
    it('should update a webhook', async () => {
      const updateWebhookDto: UpdateWebhookDto = {
        name: 'Updated Webhook',
        isActive: false,
      };

      const updatedWebhook = { ...mockWebhook, ...updateWebhookDto };
      mockWebhooksService.update.mockResolvedValue(updatedWebhook);

      const result = await controller.update('test-webhook-id', updateWebhookDto);

      expect(mockWebhooksService.update).toHaveBeenCalledWith('test-webhook-id', updateWebhookDto);
      expect(result).toEqual(updatedWebhook);
    });
  });

  describe('remove', () => {
    it('should delete a webhook', async () => {
      mockWebhooksService.remove.mockResolvedValue(undefined);

      const result = await controller.remove('test-webhook-id');

      expect(mockWebhooksService.remove).toHaveBeenCalledWith('test-webhook-id');
      expect(result).toBeUndefined();
    });
  });

  describe('trigger', () => {
    it('should trigger a webhook', async () => {
      const payload = { message: 'Test message' };
      const triggerResponse = { success: true, message: 'Webhook triggered successfully' };

      mockWebhooksService.trigger.mockResolvedValue(triggerResponse);

      const result = await controller.trigger('test-webhook-id', payload);

      expect(mockWebhooksService.trigger).toHaveBeenCalledWith('test-webhook-id', payload);
      expect(result).toEqual(triggerResponse);
    });
  });
});
