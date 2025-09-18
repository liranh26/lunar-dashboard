# Lunar Dashboard - Fullstack Application

A complete fullstack dashboard application built with React frontend and Express backend, implementing the exact Figma design specifications.

## 🎯 Project Overview

This project demonstrates the translation of a Figma design into a working fullstack product with attention to detail, clean code, and structured thinking.

### Features
- ✅ **Figma Design Implementation** - Exact spacing, colors, typography, and interactions
- ✅ **React Frontend** - Modern dashboard with responsive layout
- ✅ **Express Backend** - Mock REST API with comprehensive endpoints
- ✅ **API Integration** - Frontend connects to backend for data fetching
- ✅ **Interactive Features** - Data filtering and user interactions

## 📁 Project Structure

```
lunar/
├── frontend/           # React frontend application
│   ├── src/
│   │   ├── components/ # Dashboard components
│   │   ├── App.js      # Main app
│   │   └── ...
│   ├── public/         # Static assets and images
│   └── package.json
├── backend/            # Express backend API
│   ├── server.js       # Main server file
│   ├── package.json
│   └── README.md
└── README.md           # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### 1. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Start the development server
npm run dev
```
Backend will run on `http://localhost:5000`

### 2. Frontend Setup
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
- `GET /api/users` - Get all users (supports query filters)
- `GET /api/users/:id` - Get specific user by ID
- `PUT /api/users/:id` - Update user data

### Statistics
- `GET /api/stats` - Get dashboard statistics

### Dashboard
- `GET /api/dashboard` - Get complete dashboard data

### Example Usage
```bash
# Get all users
curl http://localhost:5000/api/users

# Get connected users only
curl http://localhost:5000/api/users?status=connected

# Get dashboard stats
curl http://localhost:5000/api/stats
```

## 🎨 Design Implementation

### Frontend Components
- **Topbar** - Logo, branding, and user controls
- **Sidebar** - Navigation with AI and Management sections
- **StatsWidgets** - Three metric cards (Tools, Servers, Agents)
- **UsersTable** - Scrollable table with user data and status badges

### Design Specifications
- **Typography**: Inter and Lato fonts
- **Colors**: Custom palette matching Figma design
- **Spacing**: Exact pixel measurements
- **Icons**: Custom SVG icons
- **Layout**: Fixed dimensions with proper responsive behavior

## 🛠️ Technical Details

### Frontend Stack
- React 18
- CSS3 with custom properties
- Responsive design
- Component-based architecture

### Backend Stack
- Node.js with Express
- CORS enabled for frontend integration
- RESTful API design
- Mock data with filtering capabilities

### Key Features
- **Exact Design Match** - Pixel-perfect implementation
- **Responsive Layout** - Adapts to different screen sizes
- **Interactive Elements** - Hover effects, status badges, scrolling
- **API Integration** - Real data fetching from backend
- **Clean Architecture** - Well-organized component structure

## 📋 Assignment Requirements Status

- ✅ **Figma Design** - Followed closely with exact specifications
- ✅ **Frontend** - React implementation with responsive layout
- ✅ **Backend** - Express REST API with mock data
- ✅ **Integration** - Frontend connects to backend API
- ✅ **Code Structure** - Clean, logical organization
- ✅ **README** - Comprehensive setup instructions

## 🔧 Development

### Running Both Services
1. Start backend: `cd backend && npm run dev`
2. Start frontend: `cd frontend && npm start`
3. Access dashboard at `http://localhost:3000`

### API Testing
- Health check: `http://localhost:5000/api/health`
- Users API: `http://localhost:5000/api/users`
- Stats API: `http://localhost:5000/api/stats`

## 📝 Notes

- All images and assets are included in the `frontend/public/images` folder
- Backend serves mock data that matches the frontend requirements
- CORS is configured for seamless frontend-backend communication
- The application demonstrates both UI/UX attention to detail and fullstack development capabilities

## 🎉 Demo

Once both services are running:
1. Visit `http://localhost:3000` to see the dashboard
2. The interface matches the Figma design exactly
3. Data is fetched from the backend API
4. Interactive elements work as designed
5. Scrolling and filtering demonstrate the integration