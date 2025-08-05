using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace Wallet.GetBalance
{
    public class Request
    {
        public int MemberId { get; set; }
    }
    
    public class Response
    {
        public decimal TotalBalance { get; set; }
        public decimal AvailableBalance { get; set; }
        public decimal PendingBalance { get; set; }
        public decimal InvestedBalance { get; set; }
        public DateTime LastUpdated { get; set; }
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
            Get("wallet/balance");
            AllowAnonymous();
        }
        
        public override async Task HandleAsync(Request req, CancellationToken ct)
        {
            var memberId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
            
            var wallet = await _db.Wallets
                .FirstOrDefaultAsync(w => w.MemberId == memberId, ct);
                
            if (wallet == null)
            {
                // Create default wallet if it doesn't exist
                wallet = new multi_trade_vision_api.Entities.Wallet
                {
                    MemberId = memberId,
                    TotalBalance = 0,
                    AvailableBalance = 0,
                    PendingBalance = 0,
                    InvestedBalance = 0,
                    LastUpdated = DateTime.UtcNow
                };
                _db.Wallets.Add(wallet);
                await _db.SaveChangesAsync(ct);
            }
            
            await SendAsync(new Response
            {
                TotalBalance = wallet.TotalBalance,
                AvailableBalance = wallet.AvailableBalance,
                PendingBalance = wallet.PendingBalance,
                InvestedBalance = wallet.InvestedBalance,
                LastUpdated = wallet.LastUpdated
            });
        }
    }
} 
