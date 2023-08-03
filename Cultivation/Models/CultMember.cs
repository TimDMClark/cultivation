using System.ComponentModel.DataAnnotations;

namespace Cultivation.Models
{
    public class CultMember
    {
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required]
        public int CultId { get; set; }
    }
}
