using Cultivation.Models;
using System.ComponentModel.DataAnnotations;

namespace Cultivation.Models
{
    public class Cult
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Name { get; set; }

        public string Description { get; set; }

        [Required]
        public DateTime Created { get; set; }

        [Required]
        public int LeaderId { get; set; }
    }
}
