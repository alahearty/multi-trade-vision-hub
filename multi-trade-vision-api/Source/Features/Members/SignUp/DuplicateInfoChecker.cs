using multi_trade_vision_api;
using Microsoft.EntityFrameworkCore;

namespace Members.Signup
{
    sealed class DuplicateInfoChecker : IPreProcessor<Request>
    {
        private readonly AppDbContext _db;
        public DuplicateInfoChecker(AppDbContext db)
        {
            _db = db;
        }
        public async Task PreProcessAsync(IPreProcessorContext<Request> ctx, CancellationToken c)
        {
            var eml = await _db.Members.AnyAsync(m => m.Email == ctx.Request.Email.ToLower(), c);
            var mob = await _db.Members.AnyAsync(m => m.MobileNumber == ctx.Request.Contact.MobileNumber.Trim(), c);
            if (eml)
                ctx.ValidationFailures.Add(new(nameof(Request.Email), "Email address is in use!"));
            if (mob)
                ctx.ValidationFailures.Add(new($"{nameof(Request.Contact)}.{nameof(Request.Contact.MobileNumber)}", "Mobile number is in use!"));
            if (ctx.ValidationFailures.Count > 0)
                await ctx.HttpContext.Response.SendErrorsAsync(ctx.ValidationFailures, cancellation: c);
        }
    }
}
