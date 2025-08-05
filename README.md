# MultiTrade Vision Hub

A comprehensive trading platform with backend API and frontend dashboard for cryptocurrency and stock investments.

## Features

### Backend (C# .NET 8)
- **User Authentication**: JWT-based authentication with email verification
- **Wallet Management**: Deposit, withdrawal, and balance tracking
- **Investment Portfolio**: Buy/sell cryptocurrencies and stocks
- **Transaction History**: Complete transaction logging
- **Referral System**: User referral tracking and bonuses
- **Database**: PostgreSQL with Entity Framework Core
- **Email**: AWS SES integration for notifications

### Frontend (React + TypeScript)
- **Modern UI**: Built with Tailwind CSS and shadcn/ui components
- **Responsive Design**: Mobile-first approach
- **Real-time Data**: Live wallet balance and transaction updates
- **Investment Dashboard**: Portfolio management and trading interface
- **User Management**: Profile settings and security features

## Prerequisites

- .NET 8 SDK
- Node.js 18+ and npm
- PostgreSQL 15+
- Docker (optional, for containerized deployment)

## Quick Start

### 1. Backend Setup

```bash
cd multi-trade-vision-api/Source

# Install dependencies
dotnet restore

# Update database connection string in appsettings.json
# Default: "Host=localhost;Port=5432;Database=multi_trade_vision_api;Username=postgres;Password=yourpassword"

# Run database migrations
dotnet ef database update

# Start the API
dotnet run
```

The API will be available at `http://localhost:6001`

### 2. Frontend Setup

```bash
cd multi-trade-vision-reactjs

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will be available at `http://localhost:8080`

### 3. Database Setup

Create a PostgreSQL database:

```sql
CREATE DATABASE multi_trade_vision_api;
```

Update the connection string in `multi-trade-vision-api/Source/appsettings.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Port=5432;Database=multi_trade_vision_api;Username=postgres;Password=yourpassword"
  }
}
```

## API Endpoints

### Authentication
- `POST /members/login` - User login
- `POST /members/signup` - User registration
- `POST /members/verify-email` - Email verification
- `GET /members/profile` - Get user profile

### Wallet
- `GET /wallet/balance` - Get wallet balance
- `GET /wallet/transactions` - Get transaction history
- `POST /wallet/deposit` - Deposit funds
- `POST /wallet/withdraw` - Withdraw funds

### Investments
- `GET /investments/portfolio` - Get investment portfolio
- `POST /investments/buy` - Buy investment

### Referrals
- `GET /referrals` - Get referral information

## Environment Configuration

### Backend Environment Variables

Create a `.env` file in the backend directory:

```env
# Database
ConnectionStrings__DefaultConnection=Host=localhost;Port=5432;Database=multi_trade_vision_api;Username=postgres;Password=yourpassword

# JWT
Auth__SigningKey=your-super-secret-jwt-key-here

# Email (AWS SES)
Email__ApiKey=your-aws-ses-api-key
Email__ApiSecret=your-aws-ses-api-secret

# CORS
API_ALLOWED_ORIGINS=http://localhost:8080,http://localhost:3000
```

### Frontend Environment Variables

Create a `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:6001
```

## Docker Deployment

### Using Docker Compose

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Individual Services

```bash
# Backend only
cd multi-trade-vision-api
docker build -t multi-trade-vision-api .
docker run -p 6001:8080 multi-trade-vision-api

# Frontend only
cd multi-trade-vision-reactjs
docker build -t multi-trade-vision-frontend .
docker run -p 8080:8080 multi-trade-vision-frontend
```

## Development

### Backend Development

```bash
cd multi-trade-vision-api/Source

# Run tests
dotnet test

# Add new migration
dotnet ef migrations add MigrationName

# Update database
dotnet ef database update

# Generate API documentation
dotnet run --urls "http://localhost:6001"
# Visit http://localhost:6001/swagger
```

### Frontend Development

```bash
cd multi-trade-vision-reactjs

# Run linting
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
multi-trade-vision-hub/
├── multi-trade-vision-api/          # Backend API
│   ├── Source/
│   │   ├── Features/                # API endpoints
│   │   ├── Entities/                # Database models
│   │   ├── Services/                # Business logic
│   │   └── Migrations/              # Database migrations
│   └── Docker/                      # Docker configuration
├── multi-trade-vision-reactjs/      # Frontend application
│   ├── src/
│   │   ├── components/              # React components
│   │   ├── pages/                   # Page components
│   │   ├── lib/                     # Utilities and API client
│   │   └── hooks/                   # Custom React hooks
│   └── public/                      # Static assets
└── docker-compose.yml               # Docker orchestration
```

## Testing

### Backend Tests

```bash
cd multi-trade-vision-api/Source
dotnet test
```

### Frontend Tests

```bash
cd multi-trade-vision-reactjs
npm test
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue on GitHub.