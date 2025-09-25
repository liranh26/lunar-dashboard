# Lunar Dashboard Frontend

React-based frontend for the Lunar Dashboard application with full API integration.

## Features

- Modern dashboard interface with exact Figma specifications
- **API Integration** - Fetches real data from backend
- Topbar with logo and user controls
- Sidebar navigation with AI and Management sections
- Statistics widgets showing live data from backend
- Users table with real-time data and interactive selection
- Responsive design with proper spacing and typography
- Loading states and error handling

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Backend server running on port 3001

### Installation
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. **Start the backend server first** (in a separate terminal):
   ```bash
   cd ../backend
   npm install
   npm run dev
   ```

4. Start the frontend development server:
   ```bash
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## API Integration

The frontend connects to the backend API running on `http://localhost:3001` by default.

### API Service
- **Location**: `src/services/apiService.js`
- **Features**: 
  - Centralized API communication
  - Error handling
  - Request/response management
  - Environment-based configuration

### Data Flow
1. **Users Table**: Fetches user data from `/api/users`
2. **Stats Widgets**: Fetches statistics from `/api/stats`
3. **Real-time Updates**: Data refreshes on component mount
4. **Interactive Features**: User selection and filtering

### Environment Configuration
Create a `.env.local` file in the frontend directory:
```bash
REACT_APP_API_URL=http://localhost:3001
```

## Project Structure

```
frontend/
├── public/
│   ├── images/          # SVG icons and user avatars
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Topbar/      # Top navigation bar
│   │   ├── Sidebar/     # Left navigation menu
│   │   ├── Dashboard/   # Main dashboard container
│   │   ├── StatsWidgets/ # Statistics cards (API integrated)
│   │   └── UsersTable/  # Users data table (API integrated)
│   ├── services/
│   │   └── apiService.js # API communication service
│   ├── App.js          # Main app component
│   ├── App.css         # App styles
│   ├── index.js        # Entry point
│   └── index.css       # Global styles
└── package.json
```

## Components

### Topbar
- MCPX logo and branding
- Chevron dropdown indicator
- User avatar

### Sidebar
- AI section (Users, Profiles) - Active
- Management section (Dashboard, Requests, etc.) - Coming Soon
- Custom SVG icons for each menu item

### Dashboard
- Main content area
- Statistics widgets (live data from API)
- Users table (live data from API)

### StatsWidgets
- **Connected Tools**: Fetched from API
- **Connected MCP servers**: Fetched from API
- **Active Agents**: Fetched from API
- Loading states and error handling

### UsersTable
- **Live Data**: Fetches users from `/api/users`
- **Interactive Selection**: Click to select users
- **Status Badges**: Connected/Offline indicators
- **User Avatars**: Real user images
- **Loading States**: Spinner while fetching data
- **Error Handling**: Retry functionality

## API Endpoints Used

- `GET /api/users` - Fetch all users
- `GET /api/stats` - Fetch dashboard statistics
- `GET /api/health` - Health check (for debugging)

## Design Specifications

- **Typography**: Inter and Lato fonts
- **Colors**: Custom color palette matching Figma design
- **Spacing**: Exact pixel measurements from design
- **Icons**: Custom SVG icons
- **Layout**: Fixed dimensions with proper responsive behavior

## Development Features

### State Management
- React hooks (useState, useEffect)
- Local component state
- API data caching

### Error Handling
- Network error detection
- User-friendly error messages
- Retry mechanisms
- Fallback data

### Loading States
- Spinner animations
- Skeleton loading
- Progressive data loading

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation)

## Troubleshooting

### Backend Connection Issues
1. Ensure backend is running on port 3001
2. Check CORS configuration in backend
3. Verify API endpoints are accessible
4. Check browser console for errors

### Data Loading Issues
1. Check network tab in browser dev tools
2. Verify API responses
3. Check for CORS errors
4. Ensure backend data files exist

