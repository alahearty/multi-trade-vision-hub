using multi_trade_vision_api.Entities;
using Microsoft.EntityFrameworkCore;

namespace multi_trade_vision_api
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<Member> Members { get; set; }
        public DbSet<JobRecord> JobRecords { get; set; }
        public DbSet<NotificationTemplate> NotificationTemplates { get; set; }
        public DbSet<multi_trade_vision_api.Entities.Wallet> Wallets { get; set; }
        public DbSet<Transaction> Transactions { get; set; }
        public DbSet<Investment> Investments { get; set; }
        public DbSet<Referral> Referrals { get; set; }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Member>().OwnsOne(m => m.Address);
        }
    }
}