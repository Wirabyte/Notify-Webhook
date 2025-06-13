# Notify-Webhook Docker Management
.PHONY: help build up down logs clean dev-up dev-down status

# Default target
help:
	@echo "Available commands:"
	@echo "  build      - Build Docker images"
	@echo "  up         - Start production services"
	@echo "  down       - Stop production services"
	@echo "  dev-up     - Start development services"
	@echo "  dev-down   - Stop development services"
	@echo "  logs       - Show logs from all services"
	@echo "  status     - Show status of services"
	@echo "  clean      - Remove containers, volumes, and images"
	@echo "  rebuild    - Clean build and start production services"
	@echo "  dev-rebuild - Clean build and start development services"

# Production commands
build:
	docker-compose build

up:
	docker-compose up -d

down:
	docker-compose down

# Development commands  
dev-up:
	docker-compose -f docker-compose.dev.yml up -d

dev-down:
	docker-compose -f docker-compose.dev.yml down

# Utility commands
logs:
	docker-compose logs -f

status:
	docker-compose ps

clean:
	docker-compose down -v
	docker-compose -f docker-compose.dev.yml down -v
	docker system prune -f
	docker volume prune -f

rebuild: clean build up

dev-rebuild: clean build dev-up

# Individual service logs
logs-backend:
	docker-compose logs -f backend

logs-frontend:
	docker-compose logs -f frontend

# Health checks
health:
	@echo "Checking backend health..."
	@curl -s http://localhost:3000 || echo "Backend not responding"
	@echo "Checking frontend health..."
	@curl -s http://localhost/health || echo "Frontend not responding"

# Database backup
backup:
	@echo "Creating database backup..."
	@mkdir -p backups
	docker-compose exec backend cp /app/data/database.sqlite /app/data/backup-$(shell date +%Y%m%d_%H%M%S).sqlite
	docker cp notify-webhook-backend:/app/data/backup-$(shell date +%Y%m%d_%H%M%S).sqlite ./backups/