using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace multi_trade_vision_api.Entities
{
    [Table("Investments")]
    public sealed class Investment
    {
        [Key]
        public int Id { get; set; }
        public int MemberId { get; set; }
        public string AssetType { get; set; } // crypto, stock
        public string AssetSymbol { get; set; }
        public string AssetName { get; set; }
        public decimal Quantity { get; set; }
        public decimal AveragePrice { get; set; }
        public decimal CurrentValue { get; set; }
        public decimal TotalInvested { get; set; }
        public decimal ProfitLoss { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime LastUpdated { get; set; }
        
        [ForeignKey("MemberId")]
        public Member Member { get; set; }
    }
} 