# Lunar Dashboard - Docker Setup

This project is fully containerized with Docker and Docker Compose for easy deployment and development.

## 🐳 Quick Start

### Production Deployment

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Development Mode

```bash
# Start development services with hot reload
docker-compose --profile dev up -d

# View development logs
docker-compose logs -f backend-dev frontend-dev

# Stop development services
docker-compose --profile dev down
```

## 🏗️ Architecture

### Services

- **Backend** (`lunar-backend`): Node.js API server on port 5000
- **Frontend** (`lunar-frontend`): Nginx-served React app on port 80
- **Backend Dev** (`lunar-backend-dev`): Development server with hot reload on port 5001
- **Frontend Dev** (`lunar-frontend-dev`): Development server with hot reload on port 3000

### Network

All services communicate through the `lunar-network` bridge network.

## 🚀 Production Commands

### Full Stack
```bash
# Build and start production services
docker-compose up -d

# Rebuild and restart
docker-compose up -d --build

# Scale services (if needed)
docker-compose up -d --scale backend=2
```

### Individual Services
```bash
# Backend only
docker-compose up -d backend

# Frontend only
docker-compose up -d frontend
```

## 🛠️ Development Commands

### Development Environment
```bash
# Start development services
docker-compose --profile dev up -d

# Rebuild development services
docker-compose --profile dev up -d --build

# Run tests in backend container
docker-compose exec backend-dev npm test

# Run tests with coverage
docker-compose exec backend-dev npm run test:coverage
```

### Hot Reload Development
```bash
# Start development with volume mounting
docker-compose --profile dev up -d

# Make changes to source code - they will be reflected immediately
# Backend: Changes in ./backend/src will trigger nodemon restart
# Frontend: Changes in ./frontend/src will trigger React hot reload
```

## 🔧 Docker Commands

### Build Images
```bash
# Build all images
docker-compose build

# Build specific service
docker-compose build backend
docker-compose build frontend

# Build without cache
docker-compose build --no-cache
```

### Container Management
```bash
# View running containers
docker-compose ps

# View container logs
docker-compose logs backend
docker-compose logs frontend

# Execute commands in containers
docker-compose exec backend npm test
docker-compose exec frontend ls -la

# Restart specific service
docker-compose restart backend
```

### Cleanup
```bash
# Stop and remove containers
docker-compose down

# Remove containers and volumes
docker-compose down -v

# Remove containers, volumes, and images
docker-compose down -v --rmi all

# Clean up unused Docker resources
docker system prune -a
```

## 📊 Health Checks

All services include health checks:

- **Backend**: `GET /api/health`
- **Frontend**: `GET /health`

Check service health:
```bash
# View health status
docker-compose ps

# Check specific service health
docker inspect lunar-backend --format='{{.State.Health.Status}}'
```

## 🌐 Access Points

### Production
- **Frontend**: http://localhost
- **Backend API**: http://localhost:5000
- **API Health**: http://localhost:5000/api/health

### Development
- **Frontend Dev**: http://localhost:3000
- **Backend Dev**: http://localhost:5001
- **API Health**: http://localhost:5001/api/health

## 🔒 Security Features

### Production Images
- Non-root user execution
- Minimal Alpine Linux base images
- Security headers in Nginx
- Gzip compression
- Static asset caching

### Development Images
- Volume mounting for hot reload
- Development dependencies included
- Source code changes reflected immediately

## 📁 File Structure

```
lunar/
├── docker-compose.yml          # Main orchestration file
├── backend/
│   ├── Dockerfile             # Production backend image
│   ├── Dockerfile.dev         # Development backend image
│   ├── .dockerignore          # Backend build exclusions
│   └── ...
├── frontend/
│   ├── Dockerfile             # Production frontend image
│   ├── Dockerfile.dev         # Development frontend image
│   ├── nginx.conf             # Nginx configuration
│   ├── .dockerignore          # Frontend build exclusions
│   └── ...
```

## 🐛 Troubleshooting

### Common Issues

1. **Port conflicts**: Ensure ports 80, 3000, 5000, 5001 are available
2. **Permission issues**: Check file permissions in mounted volumes
3. **Build failures**: Clear Docker cache with `docker-compose build --no-cache`

### Debug Commands
```bash
# Check container logs
docker-compose logs -f [service-name]

# Inspect container
docker inspect [container-name]

# Execute shell in container
docker-compose exec [service-name] sh

# Check network connectivity
docker-compose exec backend ping frontend
```

## 🚀 Deployment

### Production Deployment
1. Ensure Docker and Docker Compose are installed
2. Clone the repository
3. Run `docker-compose up -d`
4. Access the application at http://localhost

### Environment Variables
Set environment variables in `.env` file or docker-compose.yml:
```yaml
environment:
  - NODE_ENV=production
  - PORT=5000
```

## 📈 Monitoring

### Resource Usage
```bash
# View resource usage
docker stats

# View specific service stats
docker stats lunar-backend lunar-frontend
```

### Logs
```bash
# Follow all logs
docker-compose logs -f

# Follow specific service logs
docker-compose logs -f backend
docker-compose logs -f frontend
```

This Docker setup provides a production-ready, scalable, and maintainable deployment solution for the Lunar Dashboard! 🚀
