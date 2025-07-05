using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    [Table("Movies")]
    public class Movie
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;

        [Column(TypeName = "date")]
        public DateTime? ReleaseYear { get; set; }

        [StringLength(50)]
        public string? Gender { get; set; }

        [Column(TypeName = "time")]
        public TimeSpan? Duration { get; set; }

        [ForeignKey("Director")]
        public int? FKDirector { get; set; }

        public virtual Director? Director { get; set; }
    }
} 