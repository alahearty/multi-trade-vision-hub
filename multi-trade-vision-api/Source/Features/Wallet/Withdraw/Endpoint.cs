using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace Wallet.Withdraw
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
            Post("wallet/withdraw");
            AllowAnonymous();
        }
        
        public override async Task HandleAsync(Request req, CancellationToken ct)
        {
            var memberId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
            
            // Check if user has sufficient balance
            var wallet = await _db.Wallets.FirstOrDefaultAsync(w => w.MemberId == memberId, ct);
            if (wallet == null || wallet.AvailableBalance < req.Amount)
            {
                AddError("Insufficient balance for withdrawal.");
                await SendErrorsAsync(400, ct);
                return;
            }
            
            // Create transaction
            var transaction = new multi_trade_vision_api.Entities.Transaction
            {
                MemberId = memberId,
                Type = "withdrawal",
                Amount = req.Amount,
                Currency = req.Currency,
                Status = "pending",
                Description = req.Description ?? $"Withdrawal of {req.Amount} {req.Currency}",
                CreatedAt = DateTime.UtcNow
            };
            
            _db.Transactions.Add(transaction);
            await _db.SaveChangesAsync(ct);
            
            // Update wallet
            wallet.AvailableBalance -= req.Amount;
            wallet.TotalBalance -= req.Amount;
            wallet.LastUpdated = DateTime.UtcNow;
            
            // Auto-complete the transaction for MVP
            transaction.Status = "completed";
            transaction.CompletedAt = DateTime.UtcNow;
            
            await _db.SaveChangesAsync(ct);
            
            await SendAsync(new Response
            {
                TransactionId = transaction.Id,
                Status = "completed",
                Message = $"Successfully withdrew {req.Amount} {req.Currency}"
            });
        }
    }
} 
