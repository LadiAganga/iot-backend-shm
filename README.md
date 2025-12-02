# IoT Backend

A production-ready Node.js backend for managing IoT sensor data with Supabase integration.

## Overview

This backend powers an IoT structural health monitoring system that collects real-time data 
from an ESP32 device (temperature, humidity, acceleration, and strain) and stores it securely 
in a Supabase PostgreSQL database. The API supports live dashboards, data analysis tools, 
and integration with modern analytics platforms.

## Architecture Diagram

Device (ESP32 + Sensors)
        │   JSON via HTTP POST
        ▼
  Express API Server  ───►  Supabase (PostgreSQL)
        ▲                     │
        │      REST API       │
        └────── Dashboard (Next.js / Vercel)

## Features

- ✅ RESTful API for sensor data management
- ✅ Input validation and error handling
- ✅ Security middleware (Helmet, CORS, Rate Limiting)
- ✅ Structured logging
- ✅ Health check endpoint
- ✅ Graceful shutdown handling
- ✅ Environment-based configuration
- ✅ Clean, modular architecture

## Project Structure

```
iot-backend/
├── src/
│   ├── config/
│   │   ├── config.js          # Application configuration
│   │   └── database.js         # Supabase client setup
│   ├── controllers/
│   │   └── sensorController.js # Request handlers
│   ├── middleware/
│   │   ├── errorHandler.js     # Global error handler
│   │   ├── notFound.js         # 404 handler
│   │   └── validation.js       # Input validation
│   ├── routes/
│   │   ├── healthRoutes.js     # Health check routes
│   │   └── sensorRoutes.js     # Sensor data routes
│   ├── services/
│   │   └── sensorService.js    # Business logic
│   ├── utils/
│   │   └── logger.js           # Logging utility
│   └── app.js                  # Express app setup
├── server.js                   # Server entry point
├── package.json
├── .env.example
└── README.md
```

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Fill in your environment variables in `.env`:
   - `SUPABASE_URL`: Your Supabase project URL
   - `SUPABASE_ANON_KEY`: Your Supabase anonymous key

## Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `3000` |
| `NODE_ENV` | Environment (development/production) | `development` |
| `SUPABASE_URL` | Supabase project URL | Required |
| `SUPABASE_ANON_KEY` | Supabase anonymous key | Required |
| `CORS_ORIGIN` | Allowed CORS origin | `*` |
| `RATE_LIMIT_WINDOW_MS` | Rate limit window in milliseconds | `900000` (15 min) |
| `RATE_LIMIT_MAX` | Max requests per window | `100` |
| `LOG_LEVEL` | Logging level (ERROR/WARN/INFO/DEBUG) | `DEBUG` |

## API Endpoints

### Health Check
- **GET** `/health` - Check server and database health

### Sensor Data
- **POST** `/api/sensor/upload` - Upload sensor data
  ```json
  {
    "temperature": 25.5,
    "humidity": 60.0,
    "accel_x": 0.1,
    "accel_y": 0.2,
    "accel_z": 0.3,
    "strain": 100.0,
    "label": "optional_label"
  }
  ```

- **GET** `/api/sensor/data?limit=100&offset=0` - Retrieve sensor data
  - Query parameters:
    - `limit`: Number of records to return (default: 100)
    - `offset`: Number of records to skip (default: 0)

## Running the Server

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

The server will start on `http://localhost:3000` (or the port specified in your `.env` file).

## Database Schema

The backend expects a Supabase table named `sensor_data` with the following structure:

```sql
CREATE TABLE sensor_data (
  id BIGSERIAL PRIMARY KEY,
  temperature DECIMAL,
  humidity DECIMAL,
  accel_x DECIMAL,
  accel_y DECIMAL,
  accel_z DECIMAL,
  strain DECIMAL,
  label TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Security Features

- **Helmet**: Sets various HTTP headers for security
- **CORS**: Configurable cross-origin resource sharing
- **Rate Limiting**: Prevents abuse with configurable limits
- **Input Validation**: Validates all incoming data
- **Error Handling**: Secure error messages (no stack traces in production)

## Error Handling

The API returns errors in a consistent format:

```json
{
  "success": false,
  "error": {
    "message": "Error message",
    "details": ["Additional error details"]
  }
}
```

## Logging

The application uses structured JSON logging with configurable log levels:
- `ERROR`: Critical errors
- `WARN`: Warning messages
- `INFO`: Informational messages
- `DEBUG`: Debug information (development only)

## Tech Stack

**Backend**
- Node.js + Express
- Supabase (PostgreSQL)
- RESTful API architecture

**Security**
- Helmet
- CORS
- Rate Limiting
- Environment variables

**Utilities**
- Winston-style JSON logging
- Validation middleware

## Future Enhancements

- Add WebSockets for real-time streaming
- Add authentication for sensor devices
- Deploy API to Vercel or Railway
- Add analytics endpoints for batch summaries
- Add ML-based failure prediction (TinyML or Python backend)

## Graceful Shutdown

The server handles graceful shutdown on `SIGTERM` and `SIGINT` signals, ensuring:
- Active connections are closed properly
- Database connections are terminated cleanly
- No data loss during shutdown

## License

ISC


