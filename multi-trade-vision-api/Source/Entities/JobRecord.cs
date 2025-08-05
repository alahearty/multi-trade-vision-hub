using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using MessagePack;
using FastEndpoints;

namespace multi_trade_vision_api.Entities
{
    [Table("JobRecords")]
    public class JobRecord : IJobStorageRecord
    {
        [System.ComponentModel.DataAnnotations.Key]
        public int Id { get; set; }
        public string QueueID { get; set; }
        public Guid TrackingID { get; set; }
        public DateTime ExecuteAfter { get; set; }
        public DateTime ExpireOn { get; set; }
        public bool IsComplete { get; set; }
        public int FailureCount { get; set; }
        public string? FailureReason { get; set; }
        public bool? IsCancelled { get; set; }
        public DateTime? CancelledOn { get; set; }
        public byte[] CommandMsgPack { get; set; }
        [NotMapped]
        public object Command { get; set; }
    }
}