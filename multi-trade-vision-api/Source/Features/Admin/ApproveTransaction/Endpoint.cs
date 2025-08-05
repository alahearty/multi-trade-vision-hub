using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace Admin.ApproveTransaction
{
    public class Request
    {
        public int TransactionId { get; set; }
        public string Action { get; set; } // "approve" or "reject"
        public string? Reason { get; set; }
    }
    
    public class Response
    {
        public bool Success { get; set; }
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
            Post("admin/transactions/{TransactionId}/approve");
            AllowAnonymous();
        }
        
        public override async Task HandleAsync(Request req, CancellationToken ct)
        {
            // Check if user is admin (in production, use proper authorization)
            var memberId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
            
            var transaction = await _db.Transactions
                .Include(t => t.Member)
                .FirstOrDefaultAsync(t => t.Id == req.TransactionId, ct);
                
            if (transaction == null)
            {
                AddError("Transaction not found.");
                await SendErrorsAsync(404, ct);
                return;
            }
            
            if (transaction.Status != "pending")
            {
                AddError("Transaction is not pending approval.");
                await SendErrorsAsync(400, ct);
                return;
            }
            
            if (req.Action == "approve")
            {
                // Approve the transaction
                transaction.Status = "completed";
                transaction.CompletedAt = DateTime.UtcNow;
                
                // Update wallet balance for deposits
                if (transaction.Type == "deposit")
                {
                    var wallet = await _db.Wallets.FirstOrDefaultAsync(w => w.MemberId == transaction.MemberId, ct);
                    if (wallet == null)
                    {
                        wallet = new multi_trade_vision_api.Entities.Wallet
                        {
                            MemberId = transaction.MemberId,
                            TotalBalance = 0,
                            AvailableBalance = 0,
                            PendingBalance = 0,
                            InvestedBalance = 0,
                            LastUpdated = DateTime.UtcNow
                        };
                        _db.Wallets.Add(wallet);
                    }
                    
                    wallet.AvailableBalance += transaction.Amount;
                    wallet.TotalBalance += transaction.Amount;
                    wallet.LastUpdated = DateTime.UtcNow;
                }
                
                await _db.SaveChangesAsync(ct);
                
                await SendAsync(new Response
                {
                    Success = true,
                    Message = "Transaction approved successfully."
                });
            }
            else if (req.Action == "reject")
            {
                // Reject the transaction
                transaction.Status = "rejected";
                transaction.CompletedAt = DateTime.UtcNow;
                
                await _db.SaveChangesAsync(ct);
                
                await SendAsync(new Response
                {
                    Success = true,
                    Message = "Transaction rejected successfully."
                });
            }
            else
            {
                AddError("Invalid action. Use 'approve' or 'reject'.");
                await SendErrorsAsync(400, ct);
                return;
            }
        }
    }
} 
