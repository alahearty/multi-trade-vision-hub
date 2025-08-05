using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace Members.UpdateProfile
{
    public class Request
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string MobileNumber { get; set; }
        public string Gender { get; set; }
        public DateOnly BirthDay { get; set; }
        public string Designation { get; set; }
        public AddressRequest Address { get; set; }
    }
    
    public class AddressRequest
    {
        public string Street { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string ZipCode { get; set; }
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
            Put("members/profile");
            AllowAnonymous();
        }
        
        public override async Task HandleAsync(Request req, CancellationToken ct)
        {
            var memberId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
            
            var member = await _db.Members
                .Include(m => m.Address)
                .FirstOrDefaultAsync(m => m.Id == memberId, ct);
                
            if (member == null)
            {
                AddError("Member not found.");
                await SendErrorsAsync(404, ct);
                return;
            }
            
            // Update member details
            member.FirstName = req.FirstName;
            member.LastName = req.LastName;
            member.MobileNumber = req.MobileNumber;
            member.Gender = req.Gender;
            member.BirthDay = req.BirthDay;
            member.Designation = req.Designation;
            member.UpdatedAt = DateTime.UtcNow;
            
            // Update or create address
            if (member.Address == null)
            {
                member.Address = new multi_trade_vision_api.Entities.Address();
            }
            
            member.Address.Street = req.Address.Street;
            member.Address.City = req.Address.City;
            member.Address.State = req.Address.State;
            member.Address.ZipCode = req.Address.ZipCode;
            
            await _db.SaveChangesAsync(ct);
            
            await SendAsync(new Response
            {
                Success = true,
                Message = "Profile updated successfully."
            });
        }
    }
} 
