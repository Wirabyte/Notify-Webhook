# Docker Build Test Instructions

This document provides test instructions for validating the Docker setup.

## Prerequisites

Ensure Docker and Docker Compose are installed on your system.

## Validation Steps

### 1. Configuration Validation

Test that the Docker Compose configurations are valid:

```bash
# Test production configuration
docker compose config

# Test development configuration  
docker compose -f docker-compose.dev.yml config
```

Both commands should complete without errors or warnings.

### 2. Build Test

Test building the Docker images:

```bash
# Build backend image
cd backend
docker build -t notify-webhook-backend-test .

# Build frontend image
cd ../frontend
docker build -t notify-webhook-frontend-test .
```

Note: Initial builds may take 10-15 minutes due to dependency installation.

### 3. Quick Start Test

Test the complete deployment:

```bash
# Production deployment
docker compose up -d

# Wait for services to start (may take a few minutes)
docker compose ps

# Test endpoints
curl http://localhost:3000      # Backend health
curl http://localhost/health    # Frontend health

# View logs
docker compose logs

# Cleanup
docker compose down
```

### 4. Development Mode Test

```bash
# Development deployment
docker compose -f docker-compose.dev.yml up -d

# Test API documentation (development only)
curl http://localhost:3000/api

# Cleanup
docker compose -f docker-compose.dev.yml down
```

## Expected Results

- ✅ Configuration validation passes without warnings
- ✅ Images build successfully (may take time)
- ✅ Services start and show as healthy in `docker compose ps`
- ✅ Backend responds at http://localhost:3000
- ✅ Frontend responds at http://localhost
- ✅ API documentation available at http://localhost:3000/api (development mode only)

## Troubleshooting

### Build Issues
- Builds may take 10+ minutes on first run
- Use `docker compose build --no-cache` to force clean builds
- Check `docker logs <container-name>` for detailed error messages

### Network Issues
- Ensure ports 80 and 3000 are not in use by other services
- Use `docker compose down` to stop all services before retesting

### Database Issues
- SQLite database is automatically created on first run
- Database persists in Docker volume `notify-webhook_backend_data`
- Use `docker compose down -v` to reset all data (WARNING: destructive)