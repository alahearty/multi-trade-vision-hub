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

// Add AWS SES (commented out for VPS deployment)
// builder.Services.AddAWSService<IAmazonSimpleEmailService>();

// Add LettuceEncrypt for SSL certificates
if (builder.Environment.IsProduction())
{
    builder.Services.AddLettuceEncrypt();
}

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins(
                "http://localhost:6001",
                "http://localhost:3000",
                "http://localhost:8080"
            )
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwaggerGen();
}

app.UseHttpsRedirection();
app.UseCors();

// Add SignalR hub
app.MapHub<PriceUpdateHub>("/priceHub");

app.UseFastEndpoints(c =>
{
    c.Endpoints.RoutePrefix = string.Empty;
});

app.Run();