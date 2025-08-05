using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace Wallet.GetTransactions
{
    public class Request
    {
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 10;
    }
    
    public class TransactionResponse
    {
        public int Id { get; set; }
        public string Type { get; set; }
        public decimal Amount { get; set; }
        public string Currency { get; set; }
        public string Status { get; set; }
        public string Description { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? CompletedAt { get; set; }
    }
    
    public class Response
    {
        public List<TransactionResponse> Transactions { get; set; } = new();
        public int TotalCount { get; set; }
        public int Page { get; set; }
        public int PageSize { get; set; }
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
            Get("wallet/transactions");
            AllowAnonymous();
        }
        
        public override async Task HandleAsync(Request req, CancellationToken ct)
        {
            var memberId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
            
            var query = _db.Transactions
                .Where(t => t.MemberId == memberId)
                .OrderByDescending(t => t.CreatedAt);
                
            var totalCount = await query.CountAsync(ct);
            
            var transactions = await query
                .Skip((req.Page - 1) * req.PageSize)
                .Take(req.PageSize)
                .Select(t => new TransactionResponse
                {
                    Id = t.Id,
                    Type = t.Type,
                    Amount = t.Amount,
                    Currency = t.Currency,
                    Status = t.Status,
                    Description = t.Description,
                    CreatedAt = t.CreatedAt,
                    CompletedAt = t.CompletedAt
                })
                .ToListAsync(ct);
                
            await SendAsync(new Response
            {
                Transactions = transactions,
                TotalCount = totalCount,
                Page = req.Page,
                PageSize = req.PageSize
            });
        }
    }
} 
