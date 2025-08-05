using Microsoft.EntityFrameworkCore.Migrations;
using multi_trade_vision_api.Entities;

namespace multi_trade_vision_api.Migrations
{
    public partial class SeedNotificationTemplates : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // This migration seeds notification templates
            // The actual seeding will be done in the application startup
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Remove seeded data if needed
        }
    }
}