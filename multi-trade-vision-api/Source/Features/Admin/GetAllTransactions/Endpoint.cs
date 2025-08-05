using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace Admin.GetAllTransactions
{
    public class Request
    {
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 20;
        public string? Type { get; set; }
        public string? Status { get; set; }
        public string? Search { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
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
        public string? ReferenceId { get; set; }
    }
    
    public class Response
    {
        public List<TransactionResponse> Transactions { get; set; } = new();
        public int TotalCount { get; set; }
        public int Page { get; set; }
        public int PageSize { get; set; }
        public decimal TotalAmount { get; set; }
        public Dictionary<string, int> StatusBreakdown { get; set; } = new();
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
            Get("admin/transactions");
            AllowAnonymous();
        }
        
        public override async Task HandleAsync(Request req, CancellationToken ct)
        {
            var query = _db.Transactions
                .Include(t => t.Member)
                .AsQueryable();
                
            // Apply filters
            if (!string.IsNullOrEmpty(req.Type))
            {
                query = query.Where(t => t.Type == req.Type);
            }
            
            if (!string.IsNullOrEmpty(req.Status))
            {
                query = query.Where(t => t.Status == req.Status);
            }
            
            if (!string.IsNullOrEmpty(req.Search))
            {
                query = query.Where(t => 
                    t.Member.FirstName.Contains(req.Search) ||
                    t.Member.LastName.Contains(req.Search) ||
                    t.Member.Email.Contains(req.Search) ||
                    t.Description.Contains(req.Search)
                );
            }
            
            if (req.StartDate.HasValue)
            {
                query = query.Where(t => t.CreatedAt >= req.StartDate.Value);
            }
            
            if (req.EndDate.HasValue)
            {
                query = query.Where(t => t.CreatedAt <= req.EndDate.Value);
            }
            
            var totalCount = await query.CountAsync(ct);
            var totalAmount = await query.SumAsync(t => t.Amount, ct);
            
            // Get status breakdown
            var statusBreakdown = await query
                .GroupBy(t => t.Status)
                .Select(g => new { Status = g.Key, Count = g.Count() })
                .ToDictionaryAsync(x => x.Status, x => x.Count, ct);
            
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
                    CompletedAt = t.CompletedAt,
                    ReferenceId = t.ReferenceId
                })
                .ToListAsync(ct);
            
            await SendAsync(new Response
            {
                Transactions = transactions,
                TotalCount = totalCount,
                Page = req.Page,
                PageSize = req.PageSize,
                TotalAmount = totalAmount,
                StatusBreakdown = statusBreakdown
            });
        }
    }
} 
