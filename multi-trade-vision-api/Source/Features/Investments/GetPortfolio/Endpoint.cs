using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace Investments.GetPortfolio
{
    public class Request
    {
        public int MemberId { get; set; }
    }
    
    public class InvestmentResponse
    {
        public int Id { get; set; }
        public string AssetType { get; set; }
        public string AssetSymbol { get; set; }
        public string AssetName { get; set; }
        public decimal Quantity { get; set; }
        public decimal AveragePrice { get; set; }
        public decimal CurrentValue { get; set; }
        public decimal TotalInvested { get; set; }
        public decimal ProfitLoss { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime LastUpdated { get; set; }
    }
    
    public class Response
    {
        public List<InvestmentResponse> Investments { get; set; } = new();
        public decimal TotalPortfolioValue { get; set; }
        public decimal TotalInvested { get; set; }
        public decimal TotalProfitLoss { get; set; }
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
            Get("investments/portfolio");
            AllowAnonymous();
        }
        
        public override async Task HandleAsync(Request req, CancellationToken ct)
        {
            var memberId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
            
            var investments = await _db.Investments
                .Where(i => i.MemberId == memberId)
                .Select(i => new InvestmentResponse
                {
                    Id = i.Id,
                    AssetType = i.AssetType,
                    AssetSymbol = i.AssetSymbol,
                    AssetName = i.AssetName,
                    Quantity = i.Quantity,
                    AveragePrice = i.AveragePrice,
                    CurrentValue = i.CurrentValue,
                    TotalInvested = i.TotalInvested,
                    ProfitLoss = i.ProfitLoss,
                    CreatedAt = i.CreatedAt,
                    LastUpdated = i.LastUpdated
                })
                .ToListAsync(ct);
                
            var totalPortfolioValue = investments.Sum(i => i.CurrentValue);
            var totalInvested = investments.Sum(i => i.TotalInvested);
            var totalProfitLoss = investments.Sum(i => i.ProfitLoss);
            
            await SendAsync(new Response
            {
                Investments = investments,
                TotalPortfolioValue = totalPortfolioValue,
                TotalInvested = totalInvested,
                TotalProfitLoss = totalProfitLoss
            });
        }
    }
} 
