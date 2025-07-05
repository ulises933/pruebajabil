using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Data
{
    public class CineContext : DbContext
    {
        public CineContext(DbContextOptions<CineContext> options) : base(options)
        {
        }

        public DbSet<Director> Directors { get; set; }
        public DbSet<Movie> Movies { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Director>(entity =>
            {
                entity.ToTable("Director", "dbo");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name).IsRequired().HasMaxLength(200);
                entity.Property(e => e.Nationality).HasMaxLength(100);
                entity.Property(e => e.Age);
                entity.Property(e => e.Active).HasDefaultValue(true);
            });

            modelBuilder.Entity<Movie>(entity =>
            {
                entity.ToTable("Movies", "dbo");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Gender).HasMaxLength(50);
                entity.Property(e => e.ReleaseYear).HasColumnType("date");
                entity.Property(e => e.Duration).HasColumnType("time");

                entity.HasOne(e => e.Director)
                      .WithMany(d => d.Movies)
                      .HasForeignKey(e => e.FKDirector)
                      .OnDelete(DeleteBehavior.SetNull);
            });
        }
    }
} 