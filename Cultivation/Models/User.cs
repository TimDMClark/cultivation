using System.ComponentModel.DataAnnotations;

namespace Cultivation.Models
{
    public class User
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Name { get; set; }

        [Required]
        [MaxLength(100)]
        public string Email { get; set; }

        [Required]
        [MaxLength(100)]
        public string Password { get; set; }

        public string Bio { get; set; }

        public string ProfilePicture { get; set; }

        [Required]
        public int RelationshipStatusId { get; set; }
    }
}
