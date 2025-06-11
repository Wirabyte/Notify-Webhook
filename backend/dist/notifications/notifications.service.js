"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsService = void 0;
const common_1 = require("@nestjs/common");
const webhooks_service_1 = require("../webhooks/webhooks.service");
const webhook_dto_1 = require("../webhooks/dto/webhook.dto");
let NotificationsService = class NotificationsService {
    webhooksService;
    constructor(webhooksService) {
        this.webhooksService = webhooksService;
    }
    async sendNotification(sendNotificationDto) {
        const { webhookId, message, title, platforms, metadata } = sendNotificationDto;
        try {
            const webhook = this.webhooksService.findOne(webhookId);
            if (!webhook.isActive) {
                return {
                    success: false,
                    message: 'Webhook is not active',
                };
            }
            const targetPlatforms = platforms || webhook.platforms;
            const platformResults = {};
            for (const platform of targetPlatforms) {
                try {
                    const result = await this.sendToPlatform(platform, {
                        message,
                        title,
                        metadata,
                        config: webhook.platformConfigs[platform],
                    });
                    platformResults[platform] = result;
                }
                catch (error) {
                    platformResults[platform] = {
                        success: false,
                        error: error.message,
                    };
                }
            }
            return {
                success: true,
                message: 'Notification sent successfully',
                platformResults,
            };
        }
        catch (error) {
            return {
                success: false,
                message: error.message,
            };
        }
    }
    async sendToPlatform(platform, data) {
        console.log(`Sending to ${platform}:`, data);
        switch (platform) {
            case webhook_dto_1.NotificationPlatform.DISCORD:
                return await this.sendToDiscord(data);
            case webhook_dto_1.NotificationPlatform.LINE:
                return await this.sendToLine(data);
            case webhook_dto_1.NotificationPlatform.TELEGRAM:
                return await this.sendToTelegram(data);
            default:
                throw new Error(`Unsupported platform: ${platform}`);
        }
    }
    async sendToDiscord(data) {
        console.log('Sending to Discord:', data);
        return { success: true, platform: 'discord', timestamp: new Date() };
    }
    async sendToLine(data) {
        console.log('Sending to LINE:', data);
        return { success: true, platform: 'line', timestamp: new Date() };
    }
    async sendToTelegram(data) {
        console.log('Sending to Telegram:', data);
        return { success: true, platform: 'telegram', timestamp: new Date() };
    }
};
exports.NotificationsService = NotificationsService;
exports.NotificationsService = NotificationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => webhooks_service_1.WebhooksService))),
    __metadata("design:paramtypes", [webhooks_service_1.WebhooksService])
], NotificationsService);
//# sourceMappingURL=notifications.service.js.map