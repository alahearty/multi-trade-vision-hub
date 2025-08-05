using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace Wallet.Deposit
{
    public class Request
    {
        public decimal Amount { get; set; }
        public string Currency { get; set; }
        public string? Description { get; set; }
    }
    
    public class Response
    {
        public int TransactionId { get; set; }
        public string Status { get; set; }
        public string Message { get; set; }
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
            Post("wallet/deposit");
            AllowAnonymous();
        }
        
        public override async Task HandleAsync(Request req, CancellationToken ct)
        {
            var memberId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
            
            // Create transaction
            var transaction = new multi_trade_vision_api.Entities.Transaction
            {
                MemberId = memberId,
                Type = "deposit",
                Amount = req.Amount,
                Currency = req.Currency,
                Status = "pending",
                Description = req.Description ?? $"Deposit of {req.Amount} {req.Currency}",
                CreatedAt = DateTime.UtcNow
            };
            
            _db.Transactions.Add(transaction);
            await _db.SaveChangesAsync(ct);
            
            // Update wallet (for MVP, we'll auto-complete deposits)
            var wallet = await _db.Wallets.FirstOrDefaultAsync(w => w.MemberId == memberId, ct);
            if (wallet == null)
            {
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
            }
            
            wallet.AvailableBalance += req.Amount;
            wallet.TotalBalance += req.Amount;
            wallet.LastUpdated = DateTime.UtcNow;
            
            // Auto-complete the transaction for MVP
            transaction.Status = "completed";
            transaction.CompletedAt = DateTime.UtcNow;
            
            await _db.SaveChangesAsync(ct);
            
            await SendAsync(new Response
            {
                TransactionId = transaction.Id,
                Status = "completed",
                Message = $"Successfully deposited {req.Amount} {req.Currency}"
            });
        }
    }
} 
