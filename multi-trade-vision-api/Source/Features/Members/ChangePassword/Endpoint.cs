using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using BCrypt.Net;

namespace Members.ChangePassword
{
    public class Request
    {
        public string CurrentPassword { get; set; }
        public string NewPassword { get; set; }
        public string ConfirmPassword { get; set; }
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
            Put("members/change-password");
            AllowAnonymous();
        }
        
        public override async Task HandleAsync(Request req, CancellationToken ct)
        {
            if (req.NewPassword != req.ConfirmPassword)
            {
                AddError("New password and confirmation password do not match.");
                await SendErrorsAsync(400, ct);
                return;
            }
            
            if (req.NewPassword.Length < 6)
            {
                AddError("New password must be at least 6 characters long.");
                await SendErrorsAsync(400, ct);
                return;
            }
            
            var memberId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
            
            var member = await _db.Members
                .FirstOrDefaultAsync(m => m.Id == memberId, ct);
                
            if (member == null)
            {
                AddError("Member not found.");
                await SendErrorsAsync(404, ct);
                return;
            }
            
            // Verify current password
            if (!BCrypt.Net.BCrypt.Verify(req.CurrentPassword, member.PasswordHash))
            {
                AddError("Current password is incorrect.");
                await SendErrorsAsync(400, ct);
                return;
            }
            
            // Hash new password
            member.PasswordHash = BCrypt.Net.BCrypt.HashPassword(req.NewPassword);
            member.UpdatedAt = DateTime.UtcNow;
            
            await _db.SaveChangesAsync(ct);
            
            await SendAsync(new Response
            {
                Success = true,
                Message = "Password changed successfully."
            });
        }
    }
} 
