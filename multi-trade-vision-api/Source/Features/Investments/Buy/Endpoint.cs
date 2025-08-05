using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace Investments.Buy
{
    public class Request
    {
        public string AssetType { get; set; } // crypto, stock
        public string AssetSymbol { get; set; }
        public string AssetName { get; set; }
        public decimal Quantity { get; set; }
        public decimal Price { get; set; }
        public decimal TotalAmount { get; set; }
    }
    
    public class Response
    {
        public int InvestmentId { get; set; }
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
            Post("investments/buy");
            AllowAnonymous();
        }
        
        public override async Task HandleAsync(Request req, CancellationToken ct)
        {
            var memberId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
            
            // Check if user has sufficient balance
            var wallet = await _db.Wallets.FirstOrDefaultAsync(w => w.MemberId == memberId, ct);
            if (wallet == null || wallet.AvailableBalance < req.TotalAmount)
            {
                AddError("Insufficient balance for investment.");
                await SendErrorsAsync(400, ct);
                return;
            }
            
            // Check if user already has this investment
            var existingInvestment = await _db.Investments
                .FirstOrDefaultAsync(i => i.MemberId == memberId && i.AssetSymbol == req.AssetSymbol, ct);
                
            if (existingInvestment != null)
            {
                // Update existing investment
                var totalQuantity = existingInvestment.Quantity + req.Quantity;
                var totalInvested = existingInvestment.TotalInvested + req.TotalAmount;
                var newAveragePrice = totalInvested / totalQuantity;
                
                existingInvestment.Quantity = totalQuantity;
                existingInvestment.AveragePrice = newAveragePrice;
                existingInvestment.TotalInvested = totalInvested;
                existingInvestment.CurrentValue = totalQuantity * req.Price; // Simplified for MVP
                existingInvestment.ProfitLoss = existingInvestment.CurrentValue - totalInvested;
                existingInvestment.LastUpdated = DateTime.UtcNow;
            }
            else
            {
                // Create new investment
                var investment = new multi_trade_vision_api.Entities.Investment
                {
                    MemberId = memberId,
                    AssetType = req.AssetType,
                    AssetSymbol = req.AssetSymbol,
                    AssetName = req.AssetName,
                    Quantity = req.Quantity,
                    AveragePrice = req.Price,
                    CurrentValue = req.Quantity * req.Price,
                    TotalInvested = req.TotalAmount,
                    ProfitLoss = 0, // No profit/loss on initial purchase
                    CreatedAt = DateTime.UtcNow,
                    LastUpdated = DateTime.UtcNow
                };
                
                _db.Investments.Add(investment);
            }
            
            // Update wallet
            wallet.AvailableBalance -= req.TotalAmount;
            wallet.InvestedBalance += req.TotalAmount;
            wallet.LastUpdated = DateTime.UtcNow;
            
            // Create transaction
            var transaction = new multi_trade_vision_api.Entities.Transaction
            {
                MemberId = memberId,
                Type = "investment",
                Amount = req.TotalAmount,
                Currency = "USD",
                Status = "completed",
                Description = $"Investment in {req.AssetSymbol} - {req.Quantity} units at ${req.Price}",
                CreatedAt = DateTime.UtcNow,
                CompletedAt = DateTime.UtcNow
            };
            
            _db.Transactions.Add(transaction);
            await _db.SaveChangesAsync(ct);
            
            await SendAsync(new Response
            {
                InvestmentId = existingInvestment?.Id ?? 0,
                Status = "completed",
                Message = $"Successfully purchased {req.Quantity} {req.AssetSymbol} for ${req.TotalAmount}"
            });
        }
    }
} 
