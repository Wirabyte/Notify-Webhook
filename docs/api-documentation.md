# API Documentation

This document provides comprehensive documentation for the Notify-Webhook API.

## Base URL

- **Development**: `http://localhost:3000`
- **Swagger UI**: `http://localhost:3000/api`
- **OpenAPI JSON**: `http://localhost:3000/api-json`

## Authentication

Currently, the API does not require authentication. In production, you should implement proper authentication and authorization.

## API Endpoints

### Webhooks

#### Create Webhook
```http
POST /webhooks
Content-Type: application/json

{
  "name": "My Discord Webhook",
  "description": "Sends notifications to Discord channel",
  "platforms": ["discord", "telegram"],
  "platformConfigs": {
    "discord": {
      "webhookUrl": "https://discord.com/api/webhooks/123/abc"
    },
    "telegram": {
      "botToken": "bot123:abc",
      "chatId": "-123456789"
    }
  }
}
```

**Response**: `201 Created`
```json
{
  "id": "uuid-string",
  "name": "My Discord Webhook",
  "description": "Sends notifications to Discord channel",
  "isActive": true,
  "platforms": ["discord", "telegram"],
  "platformConfigs": {
    "discord": {
      "webhookUrl": "https://discord.com/api/webhooks/123/abc"
    },
    "telegram": {
      "botToken": "bot123:abc",
      "chatId": "-123456789"
    }
  },
  "createdAt": "2025-01-01T00:00:00.000Z",
  "updatedAt": "2025-01-01T00:00:00.000Z"
}
```

#### Get All Webhooks
```http
GET /webhooks
```

**Response**: `200 OK`
```json
[
  {
    "id": "uuid-string",
    "name": "My Discord Webhook",
    "description": "Sends notifications to Discord channel",
    "isActive": true,
    "platforms": ["discord"],
    "platformConfigs": {...},
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z"
  }
]
```

#### Get Webhook by ID
```http
GET /webhooks/{id}
```

**Response**: `200 OK` (same structure as above)
**Error**: `404 Not Found` if webhook doesn't exist

#### Update Webhook
```http
PATCH /webhooks/{id}
Content-Type: application/json

{
  "name": "Updated webhook name",
  "isActive": false
}
```

**Response**: `200 OK` (updated webhook object)

#### Delete Webhook
```http
DELETE /webhooks/{id}
```

**Response**: `204 No Content`
**Error**: `404 Not Found` if webhook doesn't exist

#### Trigger Webhook
```http
POST /webhooks/{id}/trigger
Content-Type: application/json

{
  "message": "Hello from webhook!",
  "timestamp": "2025-01-01T00:00:00.000Z",
  "data": {
    "custom": "payload"
  }
}
```

**Response**: `200 OK`
```json
{
  "success": true,
  "message": "Webhook triggered successfully"
}
```

### Notifications

#### Send Notification
```http
POST /notifications/send
Content-Type: application/json

{
  "webhookId": "uuid-string",
  "message": "Hello World!",
  "title": "Important Notification",
  "platforms": ["discord"],
  "metadata": {
    "priority": "high",
    "source": "api"
  }
}
```

**Response**: `200 OK`
```json
{
  "success": true,
  "message": "Notification sent successfully",
  "platformResults": {
    "discord": {
      "success": true,
      "platform": "discord",
      "timestamp": "2025-01-01T00:00:00.000Z"
    }
  }
}
```

## Error Responses

### 400 Bad Request
```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "error": "Bad Request"
}
```

### 404 Not Found
```json
{
  "statusCode": 404,
  "message": "Webhook with ID {id} not found",
  "error": "Not Found"
}
```

### 500 Internal Server Error
```json
{
  "statusCode": 500,
  "message": "Internal server error",
  "error": "Internal Server Error"
}
```

## Data Models

### NotificationPlatform Enum
- `discord`: Discord webhook
- `line`: LINE Notify
- `telegram`: Telegram Bot API

### CreateWebhookDto
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | string | Yes | Webhook name |
| description | string | No | Webhook description |
| platforms | NotificationPlatform[] | Yes | Supported platforms |
| platformConfigs | object | Yes | Platform configurations |

### UpdateWebhookDto
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | string | No | Webhook name |
| description | string | No | Webhook description |
| isActive | boolean | No | Active status |
| platforms | NotificationPlatform[] | No | Supported platforms |
| platformConfigs | object | No | Platform configurations |

### SendNotificationDto
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| webhookId | string | Yes | Target webhook ID |
| message | string | Yes | Notification message |
| title | string | No | Notification title |
| platforms | NotificationPlatform[] | No | Override platforms |
| metadata | object | No | Additional data |

## Rate Limiting

Currently, there are no rate limits implemented. Consider implementing rate limiting for production use.

## Examples

### Complete Workflow Example

1. **Create a webhook for Discord**:
```bash
curl -X POST http://localhost:3000/webhooks \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Discord Alerts",
    "description": "Critical system alerts",
    "platforms": ["discord"],
    "platformConfigs": {
      "discord": {
        "webhookUrl": "https://discord.com/api/webhooks/your-webhook-url"
      }
    }
  }'
```

2. **Send a notification**:
```bash
curl -X POST http://localhost:3000/notifications/send \
  -H "Content-Type: application/json" \
  -d '{
    "webhookId": "the-webhook-id-from-step-1",
    "message": "Server is down!",
    "title": "Critical Alert",
    "metadata": {
      "severity": "critical",
      "server": "web-01"
    }
  }'
```

## Platform-Specific Configurations

### Discord
```json
{
  "webhookUrl": "https://discord.com/api/webhooks/ID/TOKEN",
  "username": "Bot Name (optional)",
  "avatarUrl": "https://example.com/avatar.png (optional)"
}
```

### LINE Notify
```json
{
  "accessToken": "your-line-notify-access-token"
}
```

### Telegram
```json
{
  "botToken": "your-bot-token",
  "chatId": "chat-id-or-@username",
  "parseMode": "Markdown or HTML (optional)"
}
```