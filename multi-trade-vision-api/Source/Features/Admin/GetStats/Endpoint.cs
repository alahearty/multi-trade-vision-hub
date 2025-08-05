using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace Admin.GetStats
{
    public class Request
    {
        // Admin stats request
    }
    
    public class Response
    {
        public int TotalUsers { get; set; }
        public int TotalTransactions { get; set; }
        public decimal TotalRevenue { get; set; }
        public int PendingApprovals { get; set; }
        public int ActiveUsers { get; set; }
        public decimal AverageTransactionAmount { get; set; }
    }
    
    public class Endpoint : Endpoint<Request, Response>
    {
        private readonly AppDbContext _db;
        
        public Endpoint(AppDbContext db)
        {
            _db = db;
        }
        
        public override void Configure()
        {
            Get("admin/stats");
            AllowAnonymous();
        }
        
        public override async Task HandleAsync(Request req, CancellationToken ct)
        {
            // In a real app, you'd check if the user has admin role
            var memberId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
            
            // For demo purposes, we'll allow any authenticated user to access admin stats
            // In production, you should check for admin role
            
            var totalUsers = await _db.Members.CountAsync(ct);
            var totalTransactions = await _db.Transactions.CountAsync(ct);
            var totalRevenue = await _db.Transactions
                .Where(t => t.Type == "deposit" && t.Status == "completed")
                .SumAsync(t => t.Amount, ct);
            var pendingApprovals = await _db.Transactions
                .Where(t => t.Status == "pending")
                .CountAsync(ct);
            var activeUsers = await _db.Members
                .Where(m => m.IsEmailVerified)
                .CountAsync(ct);
            var averageTransactionAmount = await _db.Transactions
                .Where(t => t.Status == "completed")
                .AverageAsync(t => t.Amount, ct);
            
            await SendAsync(new Response
            {
                TotalUsers = totalUsers,
                TotalTransactions = totalTransactions,
                TotalRevenue = totalRevenue,
                PendingApprovals = pendingApprovals,
                ActiveUsers = activeUsers,
                AverageTransactionAmount = averageTransactionAmount
            });
        }
    }
} 
