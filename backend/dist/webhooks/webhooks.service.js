"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhooksService = void 0;
const common_1 = require("@nestjs/common");
const webhook_entity_1 = require("./entities/webhook.entity");
const uuid_1 = require("uuid");
let WebhooksService = class WebhooksService {
    webhooks = [];
    create(createWebhookDto) {
        const webhook = new webhook_entity_1.Webhook({
            id: (0, uuid_1.v4)(),
            ...createWebhookDto,
        });
        this.webhooks.push(webhook);
        return webhook;
    }
    findAll() {
        return this.webhooks;
    }
    findOne(id) {
        const webhook = this.webhooks.find(w => w.id === id);
        if (!webhook) {
            throw new common_1.NotFoundException(`Webhook with ID ${id} not found`);
        }
        return webhook;
    }
    update(id, updateWebhookDto) {
        const webhookIndex = this.webhooks.findIndex(w => w.id === id);
        if (webhookIndex === -1) {
            throw new common_1.NotFoundException(`Webhook with ID ${id} not found`);
        }
        const webhook = this.webhooks[webhookIndex];
        Object.assign(webhook, updateWebhookDto);
        webhook.updatedAt = new Date();
        this.webhooks[webhookIndex] = webhook;
        return webhook;
    }
    remove(id) {
        const webhookIndex = this.webhooks.findIndex(w => w.id === id);
        if (webhookIndex === -1) {
            throw new common_1.NotFoundException(`Webhook with ID ${id} not found`);
        }
        this.webhooks.splice(webhookIndex, 1);
    }
    trigger(id, payload) {
        const webhook = this.findOne(id);
        if (!webhook.isActive) {
            return { success: false, message: 'Webhook is not active' };
        }
        console.log(`Triggered webhook ${webhook.name} with payload:`, payload);
        console.log(`Platforms to notify: ${webhook.platforms.join(', ')}`);
        return { success: true, message: 'Webhook triggered successfully' };
    }
};
exports.WebhooksService = WebhooksService;
exports.WebhooksService = WebhooksService = __decorate([
    (0, common_1.Injectable)()
], WebhooksService);
//# sourceMappingURL=webhooks.service.js.map