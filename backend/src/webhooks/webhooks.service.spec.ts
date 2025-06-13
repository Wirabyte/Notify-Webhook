import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { WebhooksService } from './webhooks.service';
import { Webhook } from './entities/webhook.entity';
import { CreateWebhookDto, UpdateWebhookDto } from './dto/webhook.dto';
import { NotificationPlatform } from './dto/webhook.dto';

describe('WebhooksService', () => {
  let service: WebhooksService;

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

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WebhooksService,
        {
          provide: getRepositoryToken(Webhook),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<WebhooksService>(WebhooksService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and save a webhook', async () => {
      const createWebhookDto: CreateWebhookDto = {
        name: 'Test Webhook',
        description: 'Test Description',
        platforms: [NotificationPlatform.DISCORD],
        platformConfigs: {
          discord: { webhookUrl: 'https://discord.com/api/webhooks/test' },
        },
      };

      mockRepository.create.mockReturnValue(mockWebhook);
      mockRepository.save.mockResolvedValue(mockWebhook);

      const result = await service.create(createWebhookDto);

      expect(mockRepository.create).toHaveBeenCalledWith({
        ...createWebhookDto,
        isActive: true,
      });
      expect(mockRepository.save).toHaveBeenCalledWith(mockWebhook);
      expect(result).toEqual(mockWebhook);
    });
  });

  describe('findAll', () => {
    it('should return all webhooks', async () => {
      const webhooks = [mockWebhook];
      mockRepository.find.mockResolvedValue(webhooks);

      const result = await service.findAll();

      expect(mockRepository.find).toHaveBeenCalled();
      expect(result).toEqual(webhooks);
    });
  });

  describe('findOne', () => {
    it('should return a webhook by id', async () => {
      mockRepository.findOne.mockResolvedValue(mockWebhook);

      const result = await service.findOne('test-webhook-id');

      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 'test-webhook-id' } });
      expect(result).toEqual(mockWebhook);
    });

    it('should throw NotFoundException when webhook is not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne('non-existent-id')).rejects.toThrow(
        new NotFoundException('Webhook with ID non-existent-id not found'),
      );
    });
  });

  describe('update', () => {
    it('should update and save a webhook', async () => {
      const updateWebhookDto: UpdateWebhookDto = {
        name: 'Updated Webhook',
        isActive: false,
      };

      const updatedWebhook = { ...mockWebhook, ...updateWebhookDto };

      mockRepository.findOne.mockResolvedValue(mockWebhook);
      mockRepository.save.mockResolvedValue(updatedWebhook);

      const result = await service.update('test-webhook-id', updateWebhookDto);

      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 'test-webhook-id' } });
      expect(mockRepository.save).toHaveBeenCalledWith({
        ...mockWebhook,
        ...updateWebhookDto,
      });
      expect(result).toEqual(updatedWebhook);
    });

    it('should throw NotFoundException when webhook to update is not found', async () => {
      const updateWebhookDto: UpdateWebhookDto = {
        name: 'Updated Webhook',
      };

      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.update('non-existent-id', updateWebhookDto)).rejects.toThrow(
        new NotFoundException('Webhook with ID non-existent-id not found'),
      );
    });
  });

  describe('remove', () => {
    it('should delete a webhook', async () => {
      mockRepository.delete.mockResolvedValue({ affected: 1 });

      await service.remove('test-webhook-id');

      expect(mockRepository.delete).toHaveBeenCalledWith('test-webhook-id');
    });

    it('should throw NotFoundException when webhook to delete is not found', async () => {
      mockRepository.delete.mockResolvedValue({ affected: 0 });

      await expect(service.remove('non-existent-id')).rejects.toThrow(
        new NotFoundException('Webhook with ID non-existent-id not found'),
      );
    });
  });

  describe('trigger', () => {
    it('should trigger an active webhook successfully', async () => {
      const payload = { message: 'Test message' };

      // Create a fresh mock webhook for this test
      const activeWebhook = new Webhook({
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
      });

      // Spy on the findOne method and return the active webhook
      const findOneSpy = jest.spyOn(service, 'findOne').mockResolvedValue(activeWebhook);

      // Mock console.log to avoid output during tests
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

      const result = await service.trigger('test-webhook-id', payload);

      expect(findOneSpy).toHaveBeenCalledWith('test-webhook-id');
      expect(result).toEqual({
        success: true,
        message: 'Webhook triggered successfully',
      });

      consoleSpy.mockRestore();
      findOneSpy.mockRestore();
    });

    it('should return error when webhook is not active', async () => {
      const payload = { message: 'Test message' };
      const inactiveWebhook = { ...mockWebhook, isActive: false };

      // Spy on the findOne method and return the inactive webhook
      const findOneSpy = jest.spyOn(service, 'findOne').mockResolvedValue(inactiveWebhook);

      const result = await service.trigger('test-webhook-id', payload);

      expect(result).toEqual({
        success: false,
        message: 'Webhook is not active',
      });

      findOneSpy.mockRestore();
    });

    it('should throw NotFoundException when webhook to trigger is not found', async () => {
      const payload = { message: 'Test message' };

      // Spy on the findOne method and make it throw NotFoundException
      const findOneSpy = jest
        .spyOn(service, 'findOne')
        .mockRejectedValue(new NotFoundException('Webhook with ID non-existent-id not found'));

      await expect(service.trigger('non-existent-id', payload)).rejects.toThrow(
        new NotFoundException('Webhook with ID non-existent-id not found'),
      );

      findOneSpy.mockRestore();
    });
  });
});
