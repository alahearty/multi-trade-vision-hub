using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace Admin.GetUsers
{
    public class Request
    {
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 20;
        public string? Search { get; set; }
        public string? Status { get; set; }
    }
    
    public class UserResponse
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Status { get; set; }
        public DateTime SignupDate { get; set; }
        public bool IsEmailVerified { get; set; }
        public int TotalTransactions { get; set; }
        public decimal TotalBalance { get; set; }
    }
    
    public class Response
    {
        public List<UserResponse> Users { get; set; } = new();
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
            Get("admin/users");
            AllowAnonymous();
        }
        
        public override async Task HandleAsync(Request req, CancellationToken ct)
        {
            var query = _db.Members.AsQueryable();
            
            // Apply search filter
            if (!string.IsNullOrEmpty(req.Search))
            {
                query = query.Where(m => 
                    m.Email.Contains(req.Search) || 
                    m.FirstName.Contains(req.Search) || 
                    m.LastName.Contains(req.Search)
                );
            }
            
            // Apply status filter
            if (!string.IsNullOrEmpty(req.Status))
            {
                if (req.Status == "verified")
                    query = query.Where(m => m.IsEmailVerified);
                else if (req.Status == "unverified")
                    query = query.Where(m => !m.IsEmailVerified);
            }
            
            var totalCount = await query.CountAsync(ct);
            
            var users = await query
                .Skip((req.Page - 1) * req.PageSize)
                .Take(req.PageSize)
                .Select(m => new UserResponse
                {
                    Id = m.Id,
                    Email = m.Email,
                    FirstName = m.FirstName,
                    LastName = m.LastName,
                    Status = m.IsEmailVerified ? "verified" : "unverified",
                    SignupDate = m.SignupDate.ToDateTime(TimeOnly.MinValue),
                    IsEmailVerified = m.IsEmailVerified,
                    TotalTransactions = m.Transactions.Count,
                    TotalBalance = m.Wallet != null ? m.Wallet.TotalBalance : 0
                })
                .ToListAsync(ct);
            
            await SendAsync(new Response
            {
                Users = users,
                TotalCount = totalCount,
                Page = req.Page,
                PageSize = req.PageSize
            });
        }
    }
} 
