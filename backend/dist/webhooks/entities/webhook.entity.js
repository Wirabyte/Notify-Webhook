"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Webhook = void 0;
class Webhook {
    id;
    name;
    description;
    isActive;
    platforms;
    platformConfigs;
    createdAt;
    updatedAt;
    constructor(partial) {
        Object.assign(this, partial);
        this.createdAt = this.createdAt || new Date();
        this.updatedAt = new Date();
        this.isActive = this.isActive ?? true;
    }
}
exports.Webhook = Webhook;
//# sourceMappingURL=webhook.entity.js.map