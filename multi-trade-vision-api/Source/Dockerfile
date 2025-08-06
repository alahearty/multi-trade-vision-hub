# Use the official .NET 8.0 runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080

# Use the official .NET 8.0 SDK image for building
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy the project file and restore dependencies
COPY ["multi-trade-vision-api.csproj", "./"]
RUN dotnet restore "multi-trade-vision-api.csproj"

# Copy the rest of the source code
COPY . .

# Build the application
RUN dotnet build "multi-trade-vision-api.csproj" -c Release -o /app/build

# Publish the application
FROM build AS publish
RUN dotnet publish "multi-trade-vision-api.csproj" -c Release -o /app/publish

# Build the runtime image
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

# Set the entry point
ENTRYPOINT ["dotnet", "multi-trade-vision-api.dll"] 