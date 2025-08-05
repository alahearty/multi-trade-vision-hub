using System.Security.Claims;
using FastEndpoints;

namespace multi_trade_vision_api.Features.Admin
{
    public class AdminAuthorizationAttribute : Attribute
    {
        public static async Task<bool> IsAdminAsync(HttpContext httpContext)
        {
            var user = httpContext.User;
            if (!user.Identity?.IsAuthenticated ?? true)
                return false;

            var memberIdClaim = user.FindFirst(ClaimTypes.NameIdentifier);
            if (memberIdClaim == null || !int.TryParse(memberIdClaim.Value, out var memberId))
                return false;

            // Get the database context
            var dbContext = httpContext.RequestServices.GetRequiredService<AppDbContext>();
            
            // Check if user has admin role
            var member = await dbContext.Members
                .Where(m => m.Id == memberId && m.IsActive)
                .Select(m => new { m.Role, m.IsActive })
                .FirstOrDefaultAsync();

            return member?.Role == "admin" && member.IsActive;
        }
    }
} 
