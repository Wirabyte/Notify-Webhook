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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationResponseDto = exports.SendNotificationDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const webhook_dto_1 = require("../../webhooks/dto/webhook.dto");
class SendNotificationDto {
    webhookId;
    message;
    title;
    platforms;
    metadata;
}
exports.SendNotificationDto = SendNotificationDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Webhook ID to send notification from' }),
    __metadata("design:type", String)
], SendNotificationDto.prototype, "webhookId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Message content' }),
    __metadata("design:type", String)
], SendNotificationDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Optional title for the notification', required: false }),
    __metadata("design:type", String)
], SendNotificationDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: webhook_dto_1.NotificationPlatform,
        isArray: true,
        description: 'Specific platforms to send to (optional, will use webhook config if not provided)',
        required: false
    }),
    __metadata("design:type", Array)
], SendNotificationDto.prototype, "platforms", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Additional metadata for the notification', required: false }),
    __metadata("design:type", Object)
], SendNotificationDto.prototype, "metadata", void 0);
class NotificationResponseDto {
    success;
    message;
    platformResults;
}
exports.NotificationResponseDto = NotificationResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Whether the notification was sent successfully' }),
    __metadata("design:type", Boolean)
], NotificationResponseDto.prototype, "success", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Response message' }),
    __metadata("design:type", String)
], NotificationResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Details about each platform response', required: false }),
    __metadata("design:type", Object)
], NotificationResponseDto.prototype, "platformResults", void 0);
//# sourceMappingURL=notification.dto.js.map