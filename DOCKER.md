# Lunar Dashboard - Docker Setup

This project is fully containerized with Docker and Docker Compose for easy deployment and development.

## 🐳 Quick Start

### Start All Services

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## 🏗️ Architecture

### Services

- **Backend** (`lunar-backend`): Node.js API server on port 3001
- **Frontend** (`lunar-frontend`): React development server on port 3000

### Network

All services communicate through the `lunar-network` bridge network.

## 🚀 Commands

### Full Stack
```bash
# Build and start all services
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

### Development Features
```bash
# Start with hot reload (volume mounting)
docker-compose up -d

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

Services include health checks:

- **Backend**: `GET /api/health`

Check service health:
```bash
# View health status
docker-compose ps

# Check specific service health
docker inspect lunar-backend --format='{{.State.Health.Status}}'
```

## 🌐 Access Points

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **API Health**: http://localhost:3001/api/health

## 🔒 Security Features

### Images
- Non-root user execution
- Minimal Alpine Linux base images
- Volume mounting for hot reload
- Development dependencies included
- Source code changes reflected immediately

## 📁 File Structure

```
lunar/
├── docker-compose.yml          # Main orchestration file
├── backend/
│   ├── Dockerfile             # Backend image
│   ├── .dockerignore          # Backend build exclusions
│   └── ...
├── frontend/
│   ├── Dockerfile             # Frontend image
│   ├── .dockerignore          # Frontend build exclusions
│   └── ...
```

## 🐛 Troubleshooting

### Common Issues

1. **Port conflicts**: Ensure ports 3000, 3001 are available
2. **Permission issues**: Check file permissions in mounted volumes
3. **Build failures**: Clear Docker cache with `docker-compose build --no-cache`
4. **Data not loading**: Check backend logs for data loading messages

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

# Test API from frontend container
docker exec lunar-frontend node -e "const http = require('http'); const req = http.get('http://backend:3001/api/health', (res) => { let data = ''; res.on('data', chunk => data += chunk); res.on('end', () => console.log('Backend connection:', JSON.parse(data).message)); }); req.on('error', e => console.error('Error:', e.message));"
```

## 🚀 Deployment

### Production Deployment
1. Ensure Docker and Docker Compose are installed
2. Clone the repository
3. Run `docker-compose up -d`
4. Access the application at http://localhost:3000

### Environment Variables
Set environment variables in docker-compose.yml:
```yaml
environment:
  - NODE_ENV=development
  - HOST=0.0.0.0
  - REACT_APP_API_URL=http://backend:3001
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

## 🔧 Current Configuration

### Backend Configuration
- **Port**: 3001
- **Host**: 0.0.0.0 (accessible from other containers)
- **Data**: Mounted from `./backend/data`
- **Source**: Hot reload from `./backend/src`

### Frontend Configuration
- **Port**: 3000
- **API URL**: http://backend:3001
- **Source**: Hot reload from `./frontend/src`
- **Public**: Static files from `./frontend/public`

This Docker setup provides a development-ready, maintainable deployment solution for the Lunar Dashboard! 🚀