# Notify-Webhook

A webhook management application for sending notifications to multiple platforms including Discord, LINE, and Telegram. This project consists of a NestJS backend API and an Angular frontend for managing webhooks and notifications.

## Summary

This is a complete webhook management solution featuring:
- **Backend**: NestJS API with Swagger documentation and multi-platform notification support
- **Frontend**: Angular 19 application using PrimeNG components with Tailwind CSS for custom styling
- **Architecture**: The frontend leverages PrimeNG components as the main UI library, while Tailwind CSS is used for custom styling and layout adjustments rather than as the primary component framework

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
- **API Documentation**: Comprehensive Swagger/OpenAPI documentation
- **Database Persistence**: SQLite database with TypeORM for data storage
- **Modern UI**: Angular 19 frontend with Tailwind CSS and PrimeNG components

## Backend (NestJS)

### Features
- RESTful API for webhook management
- Enhanced Swagger documentation at `/api`
- SQLite database with TypeORM for data persistence
- Support for multiple notification platforms (Discord, LINE, Telegram)
- CORS enabled for frontend communication
- Comprehensive error handling and validation

### Database
- **Technology**: SQLite with TypeORM
- **File**: `backend/database.sqlite` (created automatically)
- **Schema**: See [Database Schema Documentation](docs/database-schema.md)
- **Synchronization**: Auto-sync enabled for development

### Getting Started

```bash
cd backend
npm install
npm run start:dev
```

The API will be available at `http://localhost:3000` with Swagger docs at `http://localhost:3000/api`.

### Documentation
- **API Documentation**: [Complete API Guide](docs/api-documentation.md)
- **Database Schema**: [Database Schema & ERD](docs/database-schema.md)
- **Swagger UI**: Available at `/api` when server is running

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
- PrimeNG components for main UI elements
- Tailwind CSS for custom styling and layout adjustments
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

## Deployment

### Docker Deployment (Recommended)

The easiest way to deploy this application is using Docker:

```bash
# Production deployment
docker-compose up -d

# Development deployment (with API docs)
docker-compose -f docker-compose.dev.yml up -d
```

See the [Docker Deployment Guide](docs/docker-deployment.md) for detailed instructions.

### Manual Deployment

For manual deployment without Docker, see the individual README files in the backend and frontend directories.

## Development

### Prerequisites
- Node.js 18+ 
- npm
- Docker (optional, for containerized development)

### Code Quality

Both backend and frontend are equipped with ESLint and Prettier for code quality and formatting:

#### Running Linting
```bash
# Lint all projects
npm run lint:all

# Lint backend only
npm run lint:backend

# Lint frontend only  
npm run lint:frontend
```

#### Running Formatting
```bash
# Format all projects
npm run format:all

# Format backend only
npm run format:backend

# Format frontend only
npm run format:frontend
```

#### Development Workflow

**⚠️ IMPORTANT: Always run formatting before committing code changes!**

Follow this workflow for every code change:

1. **Make your changes**
2. **Check for linting issues:**
   ```bash
   npm run lint:all
   ```
3. **Fix any linting warnings/errors** manually or with auto-fix
4. **Format all code before committing:**
   ```bash
   npm run format:all
   ```
5. **Verify the build works:**
   ```bash
   npm run build
   ```
6. **Commit your changes**

#### Pre-Commit Checklist
- [ ] Code passes linting (`npm run lint:all`)
- [ ] Code is properly formatted (`npm run format:all`)
- [ ] Frontend and backend build successfully
- [ ] No new ESLint errors introduced (warnings are acceptable)

#### Configuration
- **Backend**: ESLint with TypeScript rules, Prettier for formatting
- **Frontend**: ESLint with Angular-specific rules, Prettier for formatting
- **Shared Config**: Consistent Prettier settings across both projects
  - Single quotes, trailing commas, 120 character line width
  - Tab width: 2 spaces, semicolons enabled
  - LF line endings for cross-platform compatibility

### Installation and Setup

Install dependencies for all projects:
```bash
npm run install:all
```

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

Alternatively, start both applications concurrently from the root:
```bash
npm run install:all
npm start
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