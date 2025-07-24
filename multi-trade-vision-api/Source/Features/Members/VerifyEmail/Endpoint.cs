using Microsoft.EntityFrameworkCore;

namespace Members.VerifyEmail
{
    public class Request
    {
        public string Email { get; set; }
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
            var member = await _db.Members.FirstOrDefaultAsync(m => m.Email == req.Email.ToLower(), ct);
            if (member == null || member.EmailVerificationToken != req.Token)
            {
                await SendAsync(new Response { Success = false, Message = "Invalid verification link." });
                return;
            }
            member.IsEmailVerified = true;
            member.EmailVerificationToken = null;
            _db.Members.Update(member);
            await _db.SaveChangesAsync(ct);
            await SendAsync(new Response { Success = true, Message = "Email verified successfully." });
        }
    }
}