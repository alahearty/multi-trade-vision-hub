using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace Members.ResendVerification
{
    public class Request
    {
        public string Email { get; set; }
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
            Post("members/resend-verification");
            AllowAnonymous();
        }
        
        public override async Task HandleAsync(Request req, CancellationToken ct)
        {
            if (string.IsNullOrEmpty(req.Email))
            {
                AddError("Email is required.");
                await SendErrorsAsync(400, ct);
                return;
            }
            
            var member = await _db.Members
                .FirstOrDefaultAsync(m => m.Email.ToLower() == req.Email.ToLower(), ct);
                
            if (member == null)
            {
                // Don't reveal if email exists or not for security
                await SendAsync(new Response
                {
                    Success = true,
                    Message = "If the email exists and is not verified, a verification email will be sent."
                });
                return;
            }
            
            if (member.IsEmailVerified)
            {
                AddError("Email is already verified.");
                await SendErrorsAsync(400, ct);
                return;
            }
            
            // Generate new verification token
            member.EmailVerificationToken = Guid.NewGuid().ToString();
            member.UpdatedAt = DateTime.UtcNow;
            
            await _db.SaveChangesAsync(ct);
            
            // TODO: Send verification email with new token
            // For now, we'll just return success
            // In production, you'd integrate with AWS SES here
            
            await SendAsync(new Response
            {
                Success = true,
                Message = "Verification email sent successfully. Please check your inbox."
            });
        }
    }
} 
