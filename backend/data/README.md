# Mock Data Files

This directory contains the JSON data files used by the Lunar Dashboard API server.

## Files

### `users.json`
Contains an array of user objects with the following structure:
```json
{
  "id": number,
  "name": string,
  "avatar": string,
  "profile": string,
  "status": "Connected" | "Offline",
  "role": string,
  "servers": number,
  "lastActivity": string,
  "selected": boolean
}
```

**Sample Data:**
- 18 users total
- Mix of Engineering and Marketing profiles
- Various roles: Admin, User, Power User
- Status indicators: Connected/Offline
- User avatars from `/images/users/` folder

### `stats.json`
Contains dashboard statistics:
```json
{
  "connectedTools": number,
  "connectedServers": number,
  "activeAgents": number
}
```

**Current Values:**
- Connected Tools: 39
- Connected Servers: 11
- Active Agents: 2

## Usage

These files are imported in `server.js`:
```javascript
const mockUsers = require('./data/users.json');
const mockStats = require('./data/stats.json');
```

## API Endpoints

The data is served through these endpoints:
- `GET /api/users` - Returns all users (with optional filtering)
- `GET /api/users/:id` - Returns specific user
- `PUT /api/users/:id` - Updates user data
- `GET /api/stats` - Returns dashboard statistics
- `GET /api/dashboard` - Returns combined data

## Data Management

- **Adding Users**: Edit `users.json` and add new user objects
- **Updating Stats**: Modify values in `stats.json`
- **Data Validation**: Ensure JSON syntax is valid
- **Backup**: Consider versioning these files for data changes

## Notes

- User avatars reference `/images/users/` folder in the frontend
- The `selected` field is used for UI state management
- Status values are case-sensitive ("Connected", "Offline")
- Profile values: "Engineering", "Marketing"
- Role values: "Admin", "User", "Power User"
