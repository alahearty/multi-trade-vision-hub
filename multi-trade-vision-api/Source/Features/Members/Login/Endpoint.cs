using FastEndpoints.Security;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace Members.Login
{
    public class Endpoint : Endpoint<Request, Response>
    {
        private readonly AppDbContext _db;
        private readonly IConfiguration _config;
        public Endpoint(AppDbContext db, IConfiguration config)
        {
            _db = db;
            _config = config;
        }
        public override void Configure()
        {
            Post("members/login");
            AllowAnonymous();
        }
        public override async Task HandleAsync(Request req, CancellationToken ct)
        {
            var member = await _db.Members.FirstOrDefaultAsync(m => m.Email == req.Email.ToLower(), ct);
            if (member == null || !req.Password.IsValidPasswordForHash(member.PasswordHash))
            {
                AddError("Invalid email or password.");
                await SendErrorsAsync(400, ct);
                return;
            }
            if (!member.IsEmailVerified)
            {
                AddError("Email not verified.");
                await SendErrorsAsync(403, ct);
                return;
            }
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, member.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Email, member.Email),
                new Claim("firstName", member.FirstName),
                new Claim("lastName", member.LastName)
            };
            var token = JwtBearer.CreateToken(
                signingKey: _config["Auth:SigningKey"],
                expireAt: DateTime.UtcNow.AddHours(12),
                claims: claims.ToArray()
            );
            await SendAsync(new Response
            {
                Token = token,
                MemberId = member.Id.ToString(),
                Email = member.Email,
                FirstName = member.FirstName,
                LastName = member.LastName
            });
        }
    }
}