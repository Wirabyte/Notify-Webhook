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
exports.UpdateWebhookDto = exports.CreateWebhookDto = exports.WebhookDto = exports.NotificationPlatform = void 0;
const swagger_1 = require("@nestjs/swagger");
var NotificationPlatform;
(function (NotificationPlatform) {
    NotificationPlatform["DISCORD"] = "discord";
    NotificationPlatform["LINE"] = "line";
    NotificationPlatform["TELEGRAM"] = "telegram";
})(NotificationPlatform || (exports.NotificationPlatform = NotificationPlatform = {}));
class WebhookDto {
    id;
    name;
    description;
    isActive;
    platforms;
    platformConfigs;
    createdAt;
    updatedAt;
}
exports.WebhookDto = WebhookDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Unique identifier for the webhook' }),
    __metadata("design:type", String)
], WebhookDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Name of the webhook' }),
    __metadata("design:type", String)
], WebhookDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Description of the webhook' }),
    __metadata("design:type", String)
], WebhookDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Whether the webhook is active' }),
    __metadata("design:type", Boolean)
], WebhookDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [String],
        enum: NotificationPlatform,
        description: 'Platforms to send notifications to'
    }),
    __metadata("design:type", Array)
], WebhookDto.prototype, "platforms", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Configuration for each platform' }),
    __metadata("design:type", Object)
], WebhookDto.prototype, "platformConfigs", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Creation timestamp' }),
    __metadata("design:type", Date)
], WebhookDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Last updated timestamp' }),
    __metadata("design:type", Date)
], WebhookDto.prototype, "updatedAt", void 0);
class CreateWebhookDto {
    name;
    description;
    platforms;
    platformConfigs;
}
exports.CreateWebhookDto = CreateWebhookDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Name of the webhook' }),
    __metadata("design:type", String)
], CreateWebhookDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Description of the webhook', required: false }),
    __metadata("design:type", String)
], CreateWebhookDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [String],
        enum: NotificationPlatform,
        description: 'Platforms to send notifications to'
    }),
    __metadata("design:type", Array)
], CreateWebhookDto.prototype, "platforms", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Configuration for each platform' }),
    __metadata("design:type", Object)
], CreateWebhookDto.prototype, "platformConfigs", void 0);
class UpdateWebhookDto {
    name;
    description;
    isActive;
    platforms;
    platformConfigs;
}
exports.UpdateWebhookDto = UpdateWebhookDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Name of the webhook', required: false }),
    __metadata("design:type", String)
], UpdateWebhookDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Description of the webhook', required: false }),
    __metadata("design:type", String)
], UpdateWebhookDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Whether the webhook is active', required: false }),
    __metadata("design:type", Boolean)
], UpdateWebhookDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [String],
        enum: NotificationPlatform,
        description: 'Platforms to send notifications to',
        required: false
    }),
    __metadata("design:type", Array)
], UpdateWebhookDto.prototype, "platforms", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Configuration for each platform', required: false }),
    __metadata("design:type", Object)
], UpdateWebhookDto.prototype, "platformConfigs", void 0);
//# sourceMappingURL=webhook.dto.js.map