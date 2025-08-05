using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace Admin.GetPendingTransactions
{
    public class Request
    {
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 20;
        public string? Type { get; set; }
    }
    
    public class TransactionResponse
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string UserEmail { get; set; }
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
            Get("admin/transactions/pending");
            AllowAnonymous();
        }
        
        public override async Task HandleAsync(Request req, CancellationToken ct)
        {
            var query = _db.Transactions
                .Include(t => t.Member)
                .Where(t => t.Status == "pending");
                
            if (!string.IsNullOrEmpty(req.Type))
            {
                query = query.Where(t => t.Type == req.Type);
            }
            
            var totalCount = await query.CountAsync(ct);
            
            var transactions = await query
                .OrderByDescending(t => t.CreatedAt)
                .Skip((req.Page - 1) * req.PageSize)
                .Take(req.PageSize)
                .Select(t => new TransactionResponse
                {
                    Id = t.Id,
                    UserName = $"{t.Member.FirstName} {t.Member.LastName}",
                    UserEmail = t.Member.Email,
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
