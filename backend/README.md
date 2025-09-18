# Lunar Dashboard Backend

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

   Or for production:
   ```bash
   npm start
   ```

### API Endpoints

#### Health Check
- `GET /api/health` - Check if API is running

#### Users
- `GET /api/users` - Get all users (supports query filters: ?status=connected&profile=engineering)
- `GET /api/users/:id` - Get specific user by ID
- `PUT /api/users/:id` - Update user data

#### Statistics
- `GET /api/stats` - Get dashboard statistics

#### Dashboard
- `GET /api/dashboard` - Get complete dashboard data

### Environment Variables
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)

### Features
- CORS enabled for frontend integration
- Mock data for users and statistics
- Query filtering for users endpoint
- Error handling middleware
- RESTful API design

### Example Usage
```bash
# Get all users
curl http://localhost:5000/api/users

# Get connected users only
curl http://localhost:5000/api/users?status=connected

# Get dashboard stats
curl http://localhost:5000/api/stats
```

