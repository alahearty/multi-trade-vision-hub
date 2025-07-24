using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Dom
{
    [Table("Members")]
    public sealed class Member
    {
        [Key]
        public int Id { get; set; }
        public ulong MemberNumber { get; set; }
        public DateOnly SignupDate { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Designation { get; set; }
        public string Email { get; set; }
        public DateOnly BirthDay { get; set; }
        public string Gender { get; set; }
        public string MobileNumber { get; set; }
        public Address Address { get; set; }
        public string PasswordHash { get; set; }
        public bool IsEmailVerified { get; set; }
        public string EmailVerificationToken { get; set; }
    }
}