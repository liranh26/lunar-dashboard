# Lunar Dashboard - Fullstack Application

A complete fullstack dashboard application built with React frontend and Express backend, implementing the exact Figma design specifications with Docker containerization.

## 🎯 Project Overview

This project demonstrates the translation of a Figma design into a working fullstack product with attention to detail, clean code, structured thinking, and modern deployment practices.

### Features
- ✅ **Figma Design Implementation** - Exact spacing, colors, typography, and interactions
- ✅ **React Frontend** - Modern dashboard with responsive layout and infinite scroll
- ✅ **Express Backend** - REST API with caching, pagination, and comprehensive endpoints
- ✅ **Docker Containerization** - Full stack deployment with hot reload
- ✅ **API Integration** - Frontend connects to backend for data fetching
- ✅ **Interactive Features** - Data filtering, pagination, and user interactions
- ✅ **Testing Suite** - Comprehensive unit and integration tests
- ✅ **Production Ready** - Optimized for deployment and scaling

## 📁 Project Structure

```
lunar/
├── frontend/                    # React frontend application
│   ├── src/
│   │   ├── components/         # Dashboard components
│   │   │   ├── Dashboard/      # Main dashboard
│   │   │   ├── Sidebar/        # Navigation sidebar
│   │   │   ├── Topbar/         # Top navigation
│   │   │   ├── StatsWidgets/   # Statistics cards
│   │   │   └── UsersTable/     # Users table with sub-components
│   │   ├── hooks/              # Custom React hooks
│   │   ├── services/           # API service layer
│   │   └── App.js              # Main app
│   ├── public/                 # Static assets and images
│   ├── Dockerfile              # Frontend container
│   └── package.json
├── backend/                     # Express backend API
│   ├── src/
│   │   ├── controllers/        # Request handlers
│   │   ├── services/           # Business logic
│   │   ├── routes/             # API routes
│   │   ├── middleware/         # Express middleware
│   │   ├── utils/              # Utility functions
│   │   └── config/             # Configuration
│   ├── tests/                  # Test suite
│   │   ├── unit/               # Unit tests
│   │   ├── integration/        # Integration tests
│   │   ├── fixtures/           # Test data
│   │   └── helpers/            # Test utilities
│   ├── data/                   # JSON data files
│   ├── Dockerfile              # Backend container
│   ├── jest.config.js          # Test configuration
│   └── package.json
├── docker-compose.yml          # Container orchestration
├── DOCKER.md                   # Docker documentation
├── validate-docker.*           # Docker validation scripts
└── README.md                   # This file
```

## 🚀 Quick Start

### Option 1: Docker (Recommended)

```bash
# Clone the repository
git clone <repository-url>
cd lunar

# Start all services with Docker
docker-compose up -d

# View logs
docker-compose logs -f

# Access the application
# Frontend: http://localhost:3000
# Backend: http://localhost:5000
```

### Option 2: Local Development

#### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

#### Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Start the development server
npm run dev
```
Backend will run on `http://localhost:5000`

#### Frontend Setup
```bash
# Navigate to frontend directory (in a new terminal)
cd frontend

# Install dependencies
npm install

# Start the development server
npm start
```
Frontend will run on `http://localhost:3000`

## 🔗 API Endpoints

### Health Check
- `GET /api/health` - Check if API is running

### Users
- `GET /api/users` - Get users with pagination and filtering
- `GET /api/users/:id` - Get specific user by ID
- `PATCH /api/users/:id` - Update user data (optimistic updates)

### Statistics
- `GET /api/stats` - Get dashboard statistics

### Dashboard
- `GET /api/dashboard` - Get complete dashboard data

### Cache Management
- `POST /api/cache/clear` - Clear application cache

### Query Parameters
- `page` - Page number (default: 1)
- `pageSize` - Items per page (default: 20)
- `search` - Search by name
- `status` - Filter by status (Connected, Offline)
- `role` - Filter by role (Admin, User, Power User)
- `profile` - Filter by profile
- `sort` - Sort by field

### Example Usage
```bash
# Get all users
curl http://localhost:5000/api/users

# Get users with pagination
curl http://localhost:5000/api/users?page=1&pageSize=10

# Get connected users only
curl http://localhost:5000/api/users?status=Connected

# Search users by name
curl http://localhost:5000/api/users?search=John

# Get dashboard stats
curl http://localhost:5000/api/stats

# Clear cache
curl -X POST http://localhost:5000/api/cache/clear
```

## 🎨 Design Implementation

### Frontend Components
- **Topbar** - Logo, branding, and user controls
- **Sidebar** - Navigation with AI and Management sections
- **StatsWidgets** - Three metric cards (Tools, Servers, Agents)
- **UsersTable** - Infinite scroll table with user data and status badges
  - **UserTableHeader** - Table header with filters
  - **UserTableFilters** - Search and filter controls
  - **UserTableBody** - Scrollable table body
  - **UserTableRow** - Individual user rows
  - **LoadingState** - Loading indicators
  - **ErrorState** - Error handling

### Design Specifications
- **Typography**: Inter and Lato fonts
- **Colors**: Custom palette matching Figma design
- **Spacing**: Exact pixel measurements
- **Icons**: Custom SVG icons
- **Layout**: Fixed dimensions with proper responsive behavior
- **Interactions**: Hover effects, status toggles, infinite scroll

## 🛠️ Technical Details

### Frontend Stack
- React 18 with hooks
- CSS3 with custom properties
- Responsive design
- Component-based architecture
- Custom hooks for state management
- Infinite scroll pagination
- Optimistic UI updates

### Backend Stack
- Node.js with Express
- CORS enabled for frontend integration
- RESTful API design
- Dynamic data loading with caching
- Comprehensive error handling
- Request logging and middleware

### Docker Stack
- Multi-container setup
- Hot reload for development
- Volume mounting for live updates
- Network communication between services
- Health checks and monitoring

### Testing Stack
- Jest testing framework
- Supertest for API testing
- Unit tests for services and controllers
- Integration tests for API endpoints
- Mock data and test utilities

### Key Features
- **Exact Design Match** - Pixel-perfect implementation
- **Infinite Scroll** - Smooth pagination with loading states
- **Real-time Updates** - Optimistic UI with rollback
- **Caching System** - In-memory cache with TTL
- **Error Handling** - Comprehensive error management
- **Hot Reload** - Instant development feedback
- **Containerized** - Production-ready deployment

## 🧪 Testing

### Run Tests
```bash
# Backend tests
cd backend
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage

# CI mode
npm run test:ci
```

### Test Structure
- **Unit Tests** - Service and controller logic
- **Integration Tests** - API endpoint testing
- **Mock Data** - Test fixtures and utilities
- **Coverage** - Comprehensive test coverage

## 🐳 Docker Features

### Development
- **Hot Reload** - Changes reflect immediately
- **Volume Mounting** - Source code synchronization
- **Container Communication** - Service-to-service API calls
- **Health Checks** - Automatic service monitoring

### Production Ready
- **Optimized Images** - Minimal Alpine Linux base
- **Security** - Non-root user execution
- **Networking** - Isolated container network
- **Scaling** - Easy horizontal scaling

## 📋 Assignment Requirements Status

- ✅ **Figma Design** - Followed closely with exact specifications
- ✅ **Frontend** - React implementation with responsive layout
- ✅ **Backend** - Express REST API with comprehensive features
- ✅ **Integration** - Frontend connects to backend API
- ✅ **Code Structure** - Clean, logical organization
- ✅ **Testing** - Comprehensive test suite
- ✅ **Docker** - Full containerization
- ✅ **Documentation** - Comprehensive setup instructions

## 🔧 Development

### Docker Development
```bash
# Start with hot reload
docker-compose up -d

# View logs
docker-compose logs -f

# Restart services
docker-compose restart

# Stop services
docker-compose down
```

### Local Development
```bash
# Start backend
cd backend && npm run dev

# Start frontend (new terminal)
cd frontend && npm start

# Run tests
cd backend && npm test
```

### API Testing
- Health check: `http://localhost:5000/api/health`
- Users API: `http://localhost:5000/api/users`
- Stats API: `http://localhost:5000/api/stats`
- Dashboard API: `http://localhost:5000/api/dashboard`

## 📝 Notes

- All images and assets are included in the `frontend/public/images` folder
- Backend serves dynamic data with caching and pagination
- CORS is configured for seamless frontend-backend communication
- Docker provides consistent development and production environments
- The application demonstrates both UI/UX attention to detail and fullstack development capabilities
- Infinite scroll provides smooth user experience
- Optimistic updates ensure responsive interface

## 🎉 Demo

Once services are running:

### Docker Setup
1. Run `docker-compose up -d`
2. Visit `http://localhost:3000` to see the dashboard
3. The interface matches the Figma design exactly
4. Data is fetched from the backend API with pagination
5. Interactive elements work as designed
6. Scrolling and filtering demonstrate the integration

### Local Setup
1. Start backend: `cd backend && npm run dev`
2. Start frontend: `cd frontend && npm start`
3. Visit `http://localhost:3000` to see the dashboard
4. Test API endpoints at `http://localhost:5000`

## 🚀 Production Deployment

The application is production-ready with:
- Docker containerization
- Health checks and monitoring
- Error handling and logging
- Caching and performance optimization
- Comprehensive testing
- Scalable architecture

For production deployment, see `DOCKER.md` for detailed instructions.