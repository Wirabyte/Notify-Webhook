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
exports.WebhooksController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const webhooks_service_1 = require("./webhooks.service");
const webhook_dto_1 = require("./dto/webhook.dto");
let WebhooksController = class WebhooksController {
    webhooksService;
    constructor(webhooksService) {
        this.webhooksService = webhooksService;
    }
    create(createWebhookDto) {
        return this.webhooksService.create(createWebhookDto);
    }
    findAll() {
        return this.webhooksService.findAll();
    }
    findOne(id) {
        return this.webhooksService.findOne(id);
    }
    update(id, updateWebhookDto) {
        return this.webhooksService.update(id, updateWebhookDto);
    }
    remove(id) {
        return this.webhooksService.remove(id);
    }
    trigger(id, payload) {
        return this.webhooksService.trigger(id, payload);
    }
};
exports.WebhooksController = WebhooksController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new webhook' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Webhook created successfully', type: webhook_dto_1.WebhookDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [webhook_dto_1.CreateWebhookDto]),
    __metadata("design:returntype", void 0)
], WebhooksController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all webhooks' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of all webhooks', type: [webhook_dto_1.WebhookDto] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], WebhooksController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a webhook by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Webhook ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Webhook found', type: webhook_dto_1.WebhookDto }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Webhook not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WebhooksController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a webhook' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Webhook ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Webhook updated successfully', type: webhook_dto_1.WebhookDto }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Webhook not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, webhook_dto_1.UpdateWebhookDto]),
    __metadata("design:returntype", void 0)
], WebhooksController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a webhook' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Webhook ID' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Webhook deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Webhook not found' }),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WebhooksController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/trigger'),
    (0, swagger_1.ApiOperation)({ summary: 'Trigger a webhook manually' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Webhook ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Webhook triggered successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Webhook not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], WebhooksController.prototype, "trigger", null);
exports.WebhooksController = WebhooksController = __decorate([
    (0, swagger_1.ApiTags)('webhooks'),
    (0, common_1.Controller)('webhooks'),
    __metadata("design:paramtypes", [webhooks_service_1.WebhooksService])
], WebhooksController);
//# sourceMappingURL=webhooks.controller.js.map