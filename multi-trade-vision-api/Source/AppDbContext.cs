using Dom;
using Microsoft.EntityFrameworkCore;

namespace multi_trade_vision_api
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<Member> Members { get; set; }
        public DbSet<JobRecord> JobRecords { get; set; }
        public DbSet<NotificationTemplate> NotificationTemplates { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Member>().OwnsOne(m => m.Address);
        }
    }
}