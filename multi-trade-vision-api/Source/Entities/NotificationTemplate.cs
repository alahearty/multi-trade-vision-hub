using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Dom
{
    [Table("NotificationTemplates")]
    public class NotificationTemplate
    {
        [Key]
        public string ID { get; set; } //set the template name as id
        public string SmsBody { get; set; }
        public string EmailSubject { get; set; }
        public string EmailBody { get; set; }
    }
}