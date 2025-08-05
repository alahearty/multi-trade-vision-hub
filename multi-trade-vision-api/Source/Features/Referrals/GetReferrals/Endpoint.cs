using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace Referrals.GetReferrals
{
    public class Request
    {
        public int MemberId { get; set; }
    }
    
    public class ReferralResponse
    {
        public int Id { get; set; }
        public string ReferredName { get; set; }
        public string Status { get; set; }
        public decimal BonusAmount { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? CompletedAt { get; set; }
    }
    
    public class Response
    {
        public List<ReferralResponse> Referrals { get; set; } = new();
        public int TotalReferrals { get; set; }
        public decimal TotalBonus { get; set; }
        public string ReferralCode { get; set; }
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
            Get("referrals");
            AllowAnonymous();
        }
        
        public override async Task HandleAsync(Request req, CancellationToken ct)
        {
            var memberId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
            
            var referrals = await _db.Referrals
                .Where(r => r.ReferrerId == memberId)
                .Include(r => r.Referred)
                .Select(r => new ReferralResponse
                {
                    Id = r.Id,
                    ReferredName = $"{r.Referred.FirstName} {r.Referred.LastName}",
                    Status = r.Status,
                    BonusAmount = r.BonusAmount,
                    CreatedAt = r.CreatedAt,
                    CompletedAt = r.CompletedAt
                })
                .ToListAsync(ct);
                
            var totalReferrals = referrals.Count;
            var totalBonus = referrals.Sum(r => r.BonusAmount);
            var referralCode = $"REF{memberId:D6}"; // Simple referral code generation
            
            await SendAsync(new Response
            {
                Referrals = referrals,
                TotalReferrals = totalReferrals,
                TotalBonus = totalBonus,
                ReferralCode = referralCode
            });
        }
    }
} 
