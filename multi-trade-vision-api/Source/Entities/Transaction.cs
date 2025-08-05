using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace multi_trade_vision_api.Entities
{
    [Table("Transactions")]
    public sealed class Transaction
    {
        [Key]
        public int Id { get; set; }
        public int MemberId { get; set; }
        public string Type { get; set; } // deposit, withdrawal, investment, transfer
        public decimal Amount { get; set; }
        public string Currency { get; set; }
        public string Status { get; set; } // pending, completed, failed
        public string Description { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? CompletedAt { get; set; }
        public string? ReferenceId { get; set; }
        
        [ForeignKey("MemberId")]
        public Member Member { get; set; }
    }
} 