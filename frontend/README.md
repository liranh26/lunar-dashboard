# Lunar Dashboard Frontend

React-based frontend for the Lunar Dashboard application.

## Features

- Modern dashboard interface with exact Figma specifications
- Topbar with logo and user controls
- Sidebar navigation with AI and Management sections
- Statistics widgets showing key metrics
- Users table with detailed information and scrolling
- Responsive design with proper spacing and typography

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

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
│   │   ├── StatsWidgets/ # Statistics cards
│   │   └── UsersTable/  # Users data table
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
- Statistics widgets
- Users table

### StatsWidgets
- Connected Tools: 39
- Connected MCP servers: 11
- Active Agents: 2

### UsersTable
- Scrollable table with 18 users
- Status badges (Connected/Offline)
- User avatars and profile information
- Selected row highlighting

## Design Specifications

- **Typography**: Inter and Lato fonts
- **Colors**: Custom color palette matching Figma design
- **Spacing**: Exact pixel measurements from design
- **Icons**: Custom SVG icons
- **Layout**: Fixed dimensions with proper responsive behavior

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation)

