using System.ComponentModel.DataAnnotations;

namespace Cultivation.Models
{
    public class RelationshipStatus
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Status { get; set; }
    }
}
