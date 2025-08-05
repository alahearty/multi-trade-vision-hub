using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace multi_trade_vision_api.Entities
{
    [Table("Referrals")]
    public sealed class Referral
    {
        [Key]
        public int Id { get; set; }
        public int ReferrerId { get; set; }
        public int ReferredId { get; set; }
        public string ReferralCode { get; set; }
        public string Status { get; set; } // pending, completed
        public decimal BonusAmount { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? CompletedAt { get; set; }
        
        [ForeignKey("ReferrerId")]
        public Member Referrer { get; set; }
        
        [ForeignKey("ReferredId")]
        public Member Referred { get; set; }
    }
} 