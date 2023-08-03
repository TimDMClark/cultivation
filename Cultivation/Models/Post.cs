using System.ComponentModel.DataAnnotations;

namespace Cultivation.Models
{
    public class Post
    {
        public int Id { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [Required]
        public int CultId { get; set; }

        [Required]
        public int UserId { get; set; }
    }
}
