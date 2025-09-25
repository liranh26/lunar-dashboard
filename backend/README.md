# Lunar Dashboard Backend API

A clean, scalable Node.js/Express backend API for the Lunar Dashboard application.

## 🏗️ Architecture

This backend follows clean architecture principles with proper separation of concerns:

```
src/
├── config/          # Configuration management
├── controllers/     # HTTP request handlers
├── middleware/     # Express middleware
├── routes/         # Route definitions
├── services/       # Business logic layer
└── utils/          # Utility functions
```

## 🚀 Features

- **Clean Architecture**: Separated concerns with controllers, services, and utilities
- **Error Handling**: Comprehensive error handling with proper HTTP status codes
- **Validation**: Input validation for all endpoints
- **Pagination**: Built-in pagination support
- **Filtering & Sorting**: Advanced query parameter support
- **Async/Await**: Modern JavaScript with proper error handling
- **Configuration**: Environment-based configuration management
- **Logging**: Request logging and error tracking

## 📋 API Endpoints

### Health Check
- `GET /api/health` - API health status

### Users
- `GET /api/users` - Get all users (with filtering, sorting, pagination)
- `GET /api/users/:id` - Get user by ID
- `PATCH /api/users/:id` - Update user data

### Statistics
- `GET /api/stats` - Get dashboard statistics

### Dashboard
- `GET /api/dashboard` - Get complete dashboard data

## 🔧 Query Parameters

### Users Endpoint (`GET /api/users`)

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `search` | string | Search by user name | `?search=john` |
| `status` | string | Filter by status | `?status=connected` |
| `role` | string | Filter by role | `?role=admin` |
| `profile` | string | Filter by profile | `?profile=engineering` |
| `sort` | string | Sort by field:direction | `?sort=name:asc` |
| `page` | number | Page number | `?page=2` |
| `pageSize` | number | Items per page (max 100) | `?pageSize=20` |

### Example Queries

```bash
# Get first 20 users
GET /api/users?pageSize=20

# Search for users named "john"
GET /api/users?search=john

# Get connected users, sorted by name
GET /api/users?status=connected&sort=name:asc

# Get page 2 with 10 users per page
GET /api/users?page=2&pageSize=10
```

## 🛠️ Setup & Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Environment variables** (optional):
   Create a `.env` file:
   ```env
   PORT=3001
   NODE_ENV=development
   CORS_ORIGIN=http://localhost:3000
   LOG_LEVEL=info
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Start production server**:
   ```bash
   npm start
   ```

## 📊 Data Structure

### User Object
```json
{
  "id": 1,
  "name": "John Doe",
  "avatar": "/images/users/john.png",
  "profile": "Engineering",
  "status": "Connected",
  "role": "Admin",
  "servers": 5,
  "lastActivity": "SEP 10 2025"
}
```

### API Response Format
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "pageSize": 20,
    "total": 100,
    "totalPages": 5,
    "hasNext": true,
    "hasPrev": false
  },
  "filters": {
    "search": "john",
    "status": "connected"
  },
  "timestamp": "2025-09-19T10:30:00.000Z"
}
```

## 🧪 Testing

The API can be tested using:

- **curl**:
  ```bash
  curl http://localhost:3001/api/users?pageSize=5
  ```

- **Postman**: Import the API endpoints
- **Frontend**: The React frontend automatically connects to this API

## 🔒 Error Handling

All endpoints return standardized error responses:

```json
{
  "success": false,
  "error": {
    "message": "User not found",
    "statusCode": 404,
    "timestamp": "2025-09-19T10:30:00.000Z"
  }
}
```

## 📈 Performance

- **Pagination**: Prevents large data transfers
- **Filtering**: Server-side filtering reduces data processing
- **Caching**: Ready for Redis integration
- **Async Operations**: Non-blocking I/O operations

## 🔧 Development

### Adding New Endpoints

1. **Add route** in `src/routes/api.js`
2. **Add controller method** in `src/controllers/userController.js`
3. **Add service method** in `src/services/userService.js`
4. **Add validation** in `src/utils/dataUtils.js`

### Code Style

- Use async/await for asynchronous operations
- Wrap async functions with `asyncHandler` middleware
- Follow RESTful API conventions
- Use descriptive variable and function names
- Add JSDoc comments for complex functions

## 📝 License

MIT License - see LICENSE file for details.