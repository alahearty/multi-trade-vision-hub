using FastEndpoints;
using FastEndpoints.Swagger;
using Microsoft.EntityFrameworkCore;
using multi_trade_vision_api.Entities;
using multi_trade_vision_api.Services;
using LettuceEncrypt;
using Amazon.SimpleEmail;
using Amazon.SimpleEmail.Model;
using Microsoft.AspNetCore.SignalR;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddFastEndpoints()
    .SwaggerDocument(o =>
    {
        o.DocumentSettings = s =>
        {
            s.Title = "MultiTrade Vision API";
            s.Version = "v1";
        };
    });

// Add SignalR
builder.Services.AddSignalR();

// Add Price Update Service
builder.Services.AddSingleton<PriceUpdateService>();
builder.Services.AddHostedService<PriceUpdateService>();

// Add Entity Framework
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Register preprocessors as scoped services
builder.Services.AddScoped<Members.Signup.DuplicateInfoChecker>();

// Add AWS SES (commented out for VPS deployment)
// builder.Services.AddAWSService<IAmazonSimpleEmailService>();

// Add LettuceEncrypt for SSL certificates (disabled for development)
// if (builder.Environment.IsProduction())
// {
//     builder.Services.AddLettuceEncrypt();
// }

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins(
                "http://localhost:6001",
                "http://localhost:3000",
                "http://localhost:8080",
                "http://localhost:602",
                "http://frontend:8080"
            )
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

var app = builder.Build();

// Ensure database is created and migrations are applied
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    dbContext.Database.Migrate();
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    // Disable Swagger in development for now to avoid configuration issues
    // app.UseSwaggerGen();
}

// Configure for Docker (listen on all interfaces)
app.Urls.Clear();
app.Urls.Add("http://0.0.0.0:8080");

app.UseHttpsRedirection();
app.UseCors();

// Add SignalR hub
app.MapHub<PriceUpdateHub>("/priceHub");

app.UseFastEndpoints();

app.Run();