namespace backend.DTOs
{
    public class DirectorDTO
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Nationality { get; set; }
        public int? Age { get; set; }
        public bool Active { get; set; }
    }

    public class CreateDirectorDTO
    {
        public string Name { get; set; } = string.Empty;
        public string? Nationality { get; set; }
        public int? Age { get; set; }
        public bool Active { get; set; } = true;
    }

    public class UpdateDirectorDTO
    {
        public string? Name { get; set; }
        public string? Nationality { get; set; }
        public int? Age { get; set; }
        public bool? Active { get; set; }
    }
} 