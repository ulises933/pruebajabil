namespace backend.DTOs
{
    public class MovieDTO
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public DateTime? ReleaseYear { get; set; }
        public string? Gender { get; set; }
        public TimeSpan? Duration { get; set; }
        public int? FKDirector { get; set; }
        public DirectorDTO? Director { get; set; }
    }

    public class CreateMovieDTO
    {
        public string Name { get; set; } = string.Empty;
        public DateTime? ReleaseYear { get; set; }
        public string? Gender { get; set; }
        public TimeSpan? Duration { get; set; }
        public int? FKDirector { get; set; }
    }

    public class UpdateMovieDTO
    {
        public string? Name { get; set; }
        public DateTime? ReleaseYear { get; set; }
        public string? Gender { get; set; }
        public TimeSpan? Duration { get; set; }
        public int? FKDirector { get; set; }
    }
} 