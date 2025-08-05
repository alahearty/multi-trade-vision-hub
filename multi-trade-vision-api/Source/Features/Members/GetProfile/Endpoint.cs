using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using multi_trade_vision_api.Entities;

namespace Members.GetProfile
{
    public class Request
    {
        public int MemberId { get; set; }
    }
    
    public class Response
    {
        public string MemberId { get; set; }
        public ulong MemberNumber { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Designation { get; set; }
        public DateOnly BirthDay { get; set; }
        public string Gender { get; set; }
        public string MobileNumber { get; set; }
        public Address Address { get; set; }
        public DateOnly SignupDate { get; set; }
        public bool IsEmailVerified { get; set; }
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
            Get("members/profile");
            AllowAnonymous();
        }
        
        public override async Task HandleAsync(Request req, CancellationToken ct)
        {
            var memberId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
            
            var member = await _db.Members
                .FirstOrDefaultAsync(m => m.Id == memberId, ct);
                
            if (member == null)
            {
                AddError("Member not found.");
                await SendErrorsAsync(404, ct);
                return;
            }
            
            await SendAsync(new Response
            {
                MemberId = member.Id.ToString(),
                MemberNumber = member.MemberNumber,
                FirstName = member.FirstName,
                LastName = member.LastName,
                Email = member.Email,
                Designation = member.Designation,
                BirthDay = member.BirthDay,
                Gender = member.Gender,
                MobileNumber = member.MobileNumber,
                Address = member.Address,
                SignupDate = member.SignupDate,
                IsEmailVerified = member.IsEmailVerified
            });
        }
    }
} 
