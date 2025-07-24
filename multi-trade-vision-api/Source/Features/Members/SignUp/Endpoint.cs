using multi_trade_vision_api;
using Microsoft.EntityFrameworkCore;

namespace Members.Signup
{
    sealed class Endpoint : Endpoint<Request, Response, Mapper>
    {
        private readonly AppDbContext _db;
        public Endpoint(AppDbContext db)
        {
            _db = db;
        }
        public override void Configure()
        {
            Post("members/signup");
            PreProcessor<DuplicateInfoChecker>();
            AllowAnonymous();
        }
        public override async Task HandleAsync(Request r, CancellationToken c)
        {
            var member = Map.ToEntity(r);
            member.MemberNumber = (ulong)(_db.Members.Count() + 1) + 100;
            member.SignupDate = DateOnly.FromDateTime(DateTime.UtcNow);
            _db.Members.Add(member);
            await _db.SaveChangesAsync(c);
            //todo: send email to member
            await new Notification
            {
                Type = NotificationType.ReviewNewMember,
                SendEmail = true,
                SendSms = false,
                ToEmail = Config["Email:Administrator"]!,
                ToName = "multi_trade_vision_api Admin"
            }.Merge("{MemberName}", $"{member.FirstName} {member.LastName}")
                 .Merge("{LoginLink}", "https://multi_trade_vision_api.com/admin/login")
                 .Merge("{TrackingId}", member.Id.ToString())
                 .AddToSendingQueueAsync();
            await SendAsync(
                new()
                {
                    MemberId = member.Id.ToString(),
                    MemberNumber = member.MemberNumber
                });
        }
    }
}