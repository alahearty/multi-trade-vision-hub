using Microsoft.EntityFrameworkCore.Migrations;

namespace multi_trade_vision_api.Migrations
{
    public partial class AddRoleBasedAccess : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Add Role column to Members table
            migrationBuilder.AddColumn<string>(
                name: "Role",
                table: "Members",
                type: "text",
                nullable: false,
                defaultValue: "user");

            // Add IsActive column to Members table
            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "Members",
                type: "boolean",
                nullable: false,
                defaultValue: true);

            // Add LastLoginAt column to Members table
            migrationBuilder.AddColumn<DateTime>(
                name: "LastLoginAt",
                table: "Members",
                type: "timestamp with time zone",
                nullable: true);

            // Add CreatedAt column to Members table
            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "Members",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: DateTime.UtcNow);

            // Add UpdatedAt column to Members table
            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedAt",
                table: "Members",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: DateTime.UtcNow);

            // Create index on Role for faster queries
            migrationBuilder.CreateIndex(
                name: "IX_Members_Role",
                table: "Members",
                column: "Role");

            // Create index on IsActive for filtering
            migrationBuilder.CreateIndex(
                name: "IX_Members_IsActive",
                table: "Members",
                column: "IsActive");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Members_IsActive",
                table: "Members");

            migrationBuilder.DropIndex(
                name: "IX_Members_Role",
                table: "Members");

            migrationBuilder.DropColumn(
                name: "UpdatedAt",
                table: "Members");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "Members");

            migrationBuilder.DropColumn(
                name: "LastLoginAt",
                table: "Members");

            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "Members");

            migrationBuilder.DropColumn(
                name: "Role",
                table: "Members");
        }
    }
} 