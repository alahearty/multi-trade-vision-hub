using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace multi_trade_vision_api.Entities
{
    public class Member
    {
        public int Id { get; set; }
        public ulong MemberNumber { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public string Designation { get; set; }
        public DateOnly BirthDay { get; set; }
        public string Gender { get; set; }
        public string MobileNumber { get; set; }
        public Address Address { get; set; }
        public DateOnly SignupDate { get; set; }
        public bool IsEmailVerified { get; set; }
        public string? EmailVerificationToken { get; set; }
        public string Role { get; set; } = "user"; // "user", "admin", "moderator"
        public bool IsActive { get; set; } = true;
        public DateTime? LastLoginAt { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        // Navigation properties
        public virtual ICollection<Transaction> Transactions { get; set; } = new List<Transaction>();
        public virtual ICollection<Investment> Investments { get; set; } = new List<Investment>();
        public virtual Wallet? Wallet { get; set; }
        public virtual ICollection<Referral> ReferralsAsReferrer { get; set; } = new List<Referral>();
        public virtual ICollection<Referral> ReferralsAsReferred { get; set; } = new List<Referral>();
    }
}