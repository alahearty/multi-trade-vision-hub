using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace Members.VerifyEmail
{
    public class Request
    {
        public string Token { get; set; }
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
            Post("members/verify-email");
            AllowAnonymous();
        }
        
        public override async Task HandleAsync(Request req, CancellationToken ct)
        {
            if (string.IsNullOrEmpty(req.Token))
            {
                AddError("Verification token is required.");
                await SendErrorsAsync(400, ct);
                return;
            }
            
            var member = await _db.Members
                .FirstOrDefaultAsync(m => m.EmailVerificationToken == req.Token, ct);
                
            if (member == null)
            {
                AddError("Invalid verification token.");
                await SendErrorsAsync(400, ct);
                return;
            }
            
            if (member.IsEmailVerified)
            {
                AddError("Email is already verified.");
                await SendErrorsAsync(400, ct);
                return;
            }
            
            // Verify the email
            member.IsEmailVerified = true;
            member.EmailVerificationToken = null;
            member.UpdatedAt = DateTime.UtcNow;
            
            await _db.SaveChangesAsync(ct);
            
            await SendAsync(new Response
            {
                Success = true,
                Message = "Email verified successfully. You can now log in to your account."
            });
        }
    }
}
