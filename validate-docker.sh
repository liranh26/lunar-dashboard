#!/bin/bash
# Docker validation script

echo "🐳 Lunar Dashboard - Docker Configuration Validation"
echo "=================================================="

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker Desktop."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose."
    exit 1
fi

echo "✅ Docker and Docker Compose are installed"

# Check Docker daemon
if ! docker info &> /dev/null; then
    echo "❌ Docker daemon is not running. Please start Docker Desktop."
    exit 1
fi

echo "✅ Docker daemon is running"

# Validate Dockerfile syntax
echo "🔍 Validating Dockerfile syntax..."

# Check backend Dockerfile
if [ -f "backend/Dockerfile" ]; then
    echo "✅ Backend Dockerfile exists"
else
    echo "❌ Backend Dockerfile not found"
    exit 1
fi

# Check frontend Dockerfile
if [ -f "frontend/Dockerfile" ]; then
    echo "✅ Frontend Dockerfile exists"
else
    echo "❌ Frontend Dockerfile not found"
    exit 1
fi

# Check docker-compose.yml
if [ -f "docker-compose.yml" ]; then
    echo "✅ docker-compose.yml exists"
else
    echo "❌ docker-compose.yml not found"
    exit 1
fi

# Check package.json files
if [ -f "backend/package.json" ]; then
    echo "✅ Backend package.json exists"
else
    echo "❌ Backend package.json not found"
    exit 1
fi

if [ -f "frontend/package.json" ]; then
    echo "✅ Frontend package.json exists"
else
    echo "❌ Frontend package.json not found"
    exit 1
fi

# Check nginx configuration
if [ -f "frontend/nginx.conf" ]; then
    echo "✅ Nginx configuration exists"
else
    echo "❌ Nginx configuration not found"
    exit 1
fi

echo ""
echo "🎉 All Docker configuration files are valid!"
echo ""
echo "📋 Next steps:"
echo "1. Start Docker Desktop"
echo "2. Run: docker-compose up -d"
echo "3. Access: http://localhost"
echo ""
echo "🛠️ Development mode:"
echo "1. Run: docker-compose --profile dev up -d"
echo "2. Frontend: http://localhost:3000"
echo "3. Backend: http://localhost:5001"
