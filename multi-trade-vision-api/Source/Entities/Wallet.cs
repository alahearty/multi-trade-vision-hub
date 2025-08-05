using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace multi_trade_vision_api.Entities
{
    [Table("Wallets")]
    public sealed class Wallet
    {
        [Key]
        public int Id { get; set; }
        public int MemberId { get; set; }
        public decimal TotalBalance { get; set; }
        public decimal AvailableBalance { get; set; }
        public decimal PendingBalance { get; set; }
        public decimal InvestedBalance { get; set; }
        public DateTime LastUpdated { get; set; }
        
        [ForeignKey("MemberId")]
        public Member Member { get; set; }
    }
} 