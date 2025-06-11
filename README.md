# Notify-Webhook

A webhook management application for sending notifications to multiple platforms including Discord, LINE, and Telegram. This project consists of a NestJS backend API and an Angular frontend for managing webhooks and notifications.

## Project Structure

```
├── frontend/          # Angular 19 frontend application
├── backend/           # NestJS backend API
└── README.md         # This file
```

## Features

- **Webhook Management**: Create, update, delete, and manage webhooks
- **Multi-Platform Support**: Send notifications to Discord, LINE, and Telegram
- **Permission Management**: Configure which platforms each webhook can notify
- **API Documentation**: Swagger/OpenAPI documentation for the backend API
- **Modern UI**: Angular 19 frontend with Tailwind CSS and PrimeNG components

## Backend (NestJS)

### Features
- RESTful API for webhook management
- Swagger documentation at `/api`
- Support for multiple notification platforms
- CORS enabled for frontend communication

### Getting Started

```bash
cd backend
npm install
npm run start:dev
```

The API will be available at `http://localhost:3000` with Swagger docs at `http://localhost:3000/api`.

### API Endpoints

- `GET /webhooks` - List all webhooks
- `POST /webhooks` - Create a new webhook
- `GET /webhooks/:id` - Get a specific webhook
- `PATCH /webhooks/:id` - Update a webhook
- `DELETE /webhooks/:id` - Delete a webhook
- `POST /webhooks/:id/trigger` - Manually trigger a webhook
- `POST /notifications/send` - Send a notification through a webhook

## Frontend (Angular)

### Features
- Angular 19 (standalone components)
- Tailwind CSS for styling
- PrimeNG for UI components
- No SSR (single-page application)

### Getting Started

```bash
cd frontend
npm install
npm run start
```

The frontend will be available at `http://localhost:4200`.

### Build for Production

```bash
npm run build
```

## Development

### Prerequisites
- Node.js 18+ 
- npm

### Running Both Applications

1. Start the backend:
```bash
cd backend
npm install
npm run start:dev
```

2. Start the frontend (in a new terminal):
```bash
cd frontend
npm install
npm run start
```

## Platform Configuration

Each webhook can be configured to send notifications to one or more platforms:

### Discord
Configure with webhook URL in the platform configuration.

### LINE
Configure with LINE Notify token in the platform configuration.

### Telegram
Configure with bot token and chat ID in the platform configuration.

## License

This project is open source and available under the [MIT License](LICENSE).