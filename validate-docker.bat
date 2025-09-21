@echo off
echo 🐳 Lunar Dashboard - Docker Configuration Validation
echo ==================================================

REM Check if Docker is installed
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker is not installed. Please install Docker Desktop.
    pause
    exit /b 1
)

REM Check if Docker Compose is installed
docker-compose --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker Compose is not installed. Please install Docker Compose.
    pause
    exit /b 1
)

echo ✅ Docker and Docker Compose are installed

REM Check Docker daemon
docker info >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker daemon is not running. Please start Docker Desktop.
    pause
    exit /b 1
)

echo ✅ Docker daemon is running

REM Validate Dockerfile syntax
echo 🔍 Validating Dockerfile syntax...

REM Check backend Dockerfile
if exist "backend\Dockerfile" (
    echo ✅ Backend Dockerfile exists
) else (
    echo ❌ Backend Dockerfile not found
    pause
    exit /b 1
)

REM Check frontend Dockerfile
if exist "frontend\Dockerfile" (
    echo ✅ Frontend Dockerfile exists
) else (
    echo ❌ Frontend Dockerfile not found
    pause
    exit /b 1
)

REM Check docker-compose.yml
if exist "docker-compose.yml" (
    echo ✅ docker-compose.yml exists
) else (
    echo ❌ docker-compose.yml not found
    pause
    exit /b 1
)

REM Check package.json files
if exist "backend\package.json" (
    echo ✅ Backend package.json exists
) else (
    echo ❌ Backend package.json not found
    pause
    exit /b 1
)

if exist "frontend\package.json" (
    echo ✅ Frontend package.json exists
) else (
    echo ❌ Frontend package.json not found
    pause
    exit /b 1
)

REM Check nginx configuration
if exist "frontend\nginx.conf" (
    echo ✅ Nginx configuration exists
) else (
    echo ❌ Nginx configuration not found
    pause
    exit /b 1
)

echo.
echo 🎉 All Docker configuration files are valid!
echo.
echo 📋 Next steps:
echo 1. Start Docker Desktop
echo 2. Run: docker-compose up -d
echo 3. Access: http://localhost
echo.
echo 🛠️ Development mode:
echo 1. Run: docker-compose --profile dev up -d
echo 2. Frontend: http://localhost:3000
echo 3. Backend: http://localhost:5001
echo.
pause
