# Docker Deployment Guide

This guide explains how to deploy the Notify-Webhook application using Docker and Docker Compose.

## Prerequisites

- Docker (version 20.10 or later)
- Docker Compose (version 2.0 or later)

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/Wirabyte/Notify-Webhook.git
cd Notify-Webhook
```

### 2. Production Deployment

For production deployment (API docs disabled, optimized for performance):

```bash
# Build and start the services
docker-compose up -d

# Check the status
docker-compose ps

# View logs
docker-compose logs -f
```

The application will be available at:
- Frontend: http://localhost
- Backend API: http://localhost:3000

### 3. Development Deployment

For development deployment (API docs enabled, development-friendly settings):

```bash
# Build and start the services in development mode
docker-compose -f docker-compose.dev.yml up -d

# Check the status
docker-compose -f docker-compose.dev.yml ps

# View logs
docker-compose -f docker-compose.dev.yml logs -f
```

The application will be available at:
- Frontend: http://localhost:4200
- Backend API: http://localhost:3000
- API Documentation: http://localhost:3000/api

## Architecture

The Docker setup consists of two main services:

### Backend Service (NestJS)
- **Container**: `notify-webhook-backend`
- **Port**: 3000
- **Technology**: Node.js 18 Alpine
- **Database**: SQLite (persisted via Docker volume)
- **Features**:
  - Multi-stage build for optimization
  - Non-root user for security
  - Health check endpoint
  - Environment-based configuration

### Frontend Service (Angular + Nginx)
- **Container**: `notify-webhook-frontend`
- **Port**: 80 (production) / 4200 (development)
- **Technology**: Nginx Alpine serving static files
- **Features**:
  - Multi-stage build (Angular build + Nginx serve)
  - Optimized nginx configuration
  - Security headers
  - Health check endpoint
  - Gzip compression

## Environment Configuration

### Production Environment (.env.docker)

The backend uses environment-specific configuration:

```env
NODE_ENV=production
PORT=3000
DB_TYPE=sqlite
DB_DATABASE=/app/data/database.sqlite
DB_SYNCHRONIZE=false
DB_LOGGING=false
API_DOCS_ENABLED=false
CORS_ORIGINS=http://localhost,http://localhost:80,http://frontend
# ... other configuration
```

### Development Environment

Development mode enables:
- ✅ API Documentation at `/api`
- ✅ Database synchronization
- ✅ Query logging
- ✅ Development-friendly CORS settings

## Data Persistence

The SQLite database is persisted using Docker volumes:

```yaml
volumes:
  backend_data:/app/data
```

To backup the database:

```bash
# Create a backup
docker-compose exec backend cp /app/data/database.sqlite /app/data/backup-$(date +%Y%m%d).sqlite

# Copy backup to host
docker cp notify-webhook-backend:/app/data/backup-20240101.sqlite ./backup.sqlite
```

## Customization

### Custom Environment Variables

You can override environment variables by creating a `.env` file in the root directory:

```env
# Custom port for backend
BACKEND_PORT=3001

# Custom port for frontend
FRONTEND_PORT=8080
```

### Custom Docker Compose

Create a `docker-compose.override.yml` file for local customizations:

```yaml
version: '3.8'
services:
  backend:
    ports:
      - "3001:3000"  # Custom port mapping
    environment:
      - DEBUG=true   # Additional environment variables
  
  frontend:
    ports:
      - "8080:80"    # Custom port mapping
```

## Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   # Check what's using the port
   sudo netstat -tlnp | grep :3000
   
   # Stop existing containers
   docker-compose down
   ```

2. **Build Failures**
   ```bash
   # Clean build (no cache)
   docker-compose build --no-cache
   
   # Clean everything and rebuild
   docker-compose down -v
   docker system prune -f
   docker-compose up -d --build
   ```

3. **Database Issues**
   ```bash
   # Reset database (WARNING: This will delete all data)
   docker-compose down -v
   docker volume rm notify-webhook_backend_data
   docker-compose up -d
   ```

### Logs and Debugging

```bash
# View all logs
docker-compose logs

# View specific service logs
docker-compose logs backend
docker-compose logs frontend

# Follow logs in real-time
docker-compose logs -f

# Enter container shell for debugging
docker-compose exec backend sh
docker-compose exec frontend sh
```

### Health Checks

Both services include health checks:

```bash
# Check health status
docker-compose ps

# Manual health check
curl http://localhost:3000      # Backend health
curl http://localhost/health    # Frontend health
```

## Security Considerations

- ✅ Services run as non-root users
- ✅ Security headers enabled in nginx
- ✅ Database files are properly isolated
- ✅ CORS is properly configured
- ✅ API documentation disabled in production

## Performance Optimization

- ✅ Multi-stage builds reduce image size
- ✅ Nginx compression enabled
- ✅ Static assets cached appropriately
- ✅ Production builds optimized
- ✅ Health checks for container orchestration

## Production Deployment Checklist

- [ ] Update CORS origins for your domain
- [ ] Configure proper SSL/TLS termination
- [ ] Set up log rotation
- [ ] Configure backup strategy for database
- [ ] Monitor health check endpoints
- [ ] Update contact information in environment variables
- [ ] Review and update security headers
- [ ] Set up container monitoring