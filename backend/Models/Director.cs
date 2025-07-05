using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    [Table("Director")]
    public class Director
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [StringLength(200)]
        public string Name { get; set; } = string.Empty;

        [StringLength(100)]
        public string? Nationality { get; set; }

        public int? Age { get; set; }

        public bool Active { get; set; } = true;

        // Navigation property
        public virtual ICollection<Movie> Movies { get; set; } = new List<Movie>();
    }
} 