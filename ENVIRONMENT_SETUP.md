# Environment Setup Guide

This guide explains how to configure environment variables for the Multi Trade Vision Hub project.

## Quick Start

1. **Copy the appropriate environment file:**
   ```bash
   # For development
   cp env.development .env
   
   # For production
   cp env.production .env
   ```

2. **Edit the `.env` file** with your specific values

3. **Start the application:**
   ```bash
   docker-compose up -d
   ```

## Environment Variables Reference

### Port Configuration
- `FRONTEND_PORT`: Frontend container port (default: 602 for dev, 80 for prod)
- `BACKEND_PORT`: Backend API port (default: 6001)
- `DB_PORT`: Database port (default: 6000 for dev, 5432 for prod)

### Database Configuration
- `POSTGRES_DB`: Database name (default: multi_trade_vision_api)
- `POSTGRES_USER`: Database username (default: postgres)
- `POSTGRES_PASSWORD`: Database password (**REQUIRED**)
- `DB_CONTAINER_NAME`: Database container name

### Backend API Configuration
- `ConnectionStrings__DefaultConnection`: PostgreSQL connection string
- `API_ALLOWED_ORIGINS`: CORS allowed origins (comma-separated)
- `Auth__SigningKey`: JWT signing key (**REQUIRED for production**)
- `ASPNETCORE_ENVIRONMENT`: ASP.NET Core environment (Development/Production)

### Frontend Configuration
- `REACT_APP_API_URL`: Backend API URL for frontend
- `NODE_ENV`: Node.js environment (development/production)

### Email Configuration (for VPS deployment)
- `Email__FromName`: Sender name for emails
- `Email__FromEmail`: Sender email address
- `Email__Administrator`: Admin email address
- `Email__ApiKey`: Email service API key
- `Email__ApiSecret`: Email service secret

### SSL Configuration (for production)
- `LettuceEncrypt__AcceptTermsOfService`: Accept Let's Encrypt terms
- `LettuceEncrypt__DomainNames`: Domain names for SSL certificates
- `LettuceEncrypt__EmailAddress`: Email for SSL certificate notifications

## Development vs Production

### Development Environment
- Uses localhost URLs
- Weak passwords (for development only)
- Development JWT key
- No SSL certificates
- Database exposed on port 6000

### Production Environment
- Uses HTTPS URLs
- Strong passwords required
- Secure JWT signing key
- SSL certificates via Let's Encrypt
- Database not exposed externally

## Security Considerations

1. **Never commit `.env` files** to version control
2. **Use strong passwords** in production
3. **Generate a secure JWT signing key** for production
4. **Configure proper CORS origins** for production
5. **Use HTTPS** in production
6. **Secure database access** (don't expose port 5432 externally)

## VPS Deployment Checklist

1. ✅ Set up domain names (frontend and API)
2. ✅ Configure DNS records
3. ✅ Set up SSL certificates (Let's Encrypt)
4. ✅ Configure email service (SMTP or API)
5. ✅ Set strong database password
6. ✅ Generate secure JWT signing key
7. ✅ Configure firewall rules
8. ✅ Set up database backups
9. ✅ Configure monitoring and logging

## Troubleshooting

### Common Issues

1. **Database connection failed**
   - Check `POSTGRES_PASSWORD` is set
   - Verify database container is running
   - Check connection string format

2. **CORS errors**
   - Verify `API_ALLOWED_ORIGINS` includes your frontend URL
   - Check for trailing slashes in URLs

3. **JWT authentication fails**
   - Ensure `Auth__SigningKey` is at least 32 characters
   - Check token format in requests

4. **Email sending fails**
   - Verify email service credentials
   - Check email service configuration

### Environment File Examples

See `env.development` and `env.production` for complete examples.

## Docker Compose Commands

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Rebuild and start
docker-compose up -d --build

# Access database
docker-compose exec db psql -U postgres -d multi_trade_vision_api
``` 