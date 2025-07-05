using backend.Data;
using backend.DTOs;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class MovieService : IMovieService
    {
        private readonly CineContext _context;

        public MovieService(CineContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<MovieDTO>> GetAllMoviesAsync()
        {
            var movies = await _context.Movies
                .Include(m => m.Director)
                .Select(m => new MovieDTO
                {
                    Id = m.Id,
                    Name = m.Name,
                    ReleaseYear = m.ReleaseYear,
                    Gender = m.Gender,
                    Duration = m.Duration,
                    FKDirector = m.FKDirector,
                    Director = m.Director != null ? new DirectorDTO
                    {
                        Id = m.Director.Id,
                        Name = m.Director.Name,
                        Nationality = m.Director.Nationality,
                        Age = m.Director.Age,
                        Active = m.Director.Active
                    } : null
                })
                .ToListAsync();

            return movies;
        }

        public async Task<MovieDTO?> GetMovieByIdAsync(int id)
        {
            var movie = await _context.Movies
                .Include(m => m.Director)
                .Where(m => m.Id == id)
                .Select(m => new MovieDTO
                {
                    Id = m.Id,
                    Name = m.Name,
                    ReleaseYear = m.ReleaseYear,
                    Gender = m.Gender,
                    Duration = m.Duration,
                    FKDirector = m.FKDirector,
                    Director = m.Director != null ? new DirectorDTO
                    {
                        Id = m.Director.Id,
                        Name = m.Director.Name,
                        Nationality = m.Director.Nationality,
                        Age = m.Director.Age,
                        Active = m.Director.Active
                    } : null
                })
                .FirstOrDefaultAsync();

            return movie;
        }

        public async Task<MovieDTO> CreateMovieAsync(CreateMovieDTO movieDto)
        {
            var movie = new Movie
            {
                Name = movieDto.Name,
                ReleaseYear = movieDto.ReleaseYear,
                Gender = movieDto.Gender,
                Duration = movieDto.Duration,
                FKDirector = movieDto.FKDirector
            };

            _context.Movies.Add(movie);
            await _context.SaveChangesAsync();

            return new MovieDTO
            {
                Id = movie.Id,
                Name = movie.Name,
                ReleaseYear = movie.ReleaseYear,
                Gender = movie.Gender,
                Duration = movie.Duration,
                FKDirector = movie.FKDirector
            };
        }

        public async Task<MovieDTO?> UpdateMovieAsync(int id, UpdateMovieDTO movieDto)
        {
            var movie = await _context.Movies.FindAsync(id);
            if (movie == null)
                return null;

            if (movieDto.Name != null)
                movie.Name = movieDto.Name;
            if (movieDto.ReleaseYear.HasValue)
                movie.ReleaseYear = movieDto.ReleaseYear;
            if (movieDto.Gender != null)
                movie.Gender = movieDto.Gender;
            if (movieDto.Duration.HasValue)
                movie.Duration = movieDto.Duration;
            if (movieDto.FKDirector.HasValue)
                movie.FKDirector = movieDto.FKDirector;

            await _context.SaveChangesAsync();

            return new MovieDTO
            {
                Id = movie.Id,
                Name = movie.Name,
                ReleaseYear = movie.ReleaseYear,
                Gender = movie.Gender,
                Duration = movie.Duration,
                FKDirector = movie.FKDirector
            };
        }

        public async Task<bool> DeleteMovieAsync(int id)
        {
            var movie = await _context.Movies.FindAsync(id);
            if (movie == null)
                return false;

            _context.Movies.Remove(movie);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<IEnumerable<MovieDTO>> GetMoviesByDirectorAsync(int directorId)
        {
            var movies = await _context.Movies
                .Include(m => m.Director)
                .Where(m => m.FKDirector == directorId)
                .Select(m => new MovieDTO
                {
                    Id = m.Id,
                    Name = m.Name,
                    ReleaseYear = m.ReleaseYear,
                    Gender = m.Gender,
                    Duration = m.Duration,
                    FKDirector = m.FKDirector,
                    Director = m.Director != null ? new DirectorDTO
                    {
                        Id = m.Director.Id,
                        Name = m.Director.Name,
                        Nationality = m.Director.Nationality,
                        Age = m.Director.Age,
                        Active = m.Director.Active
                    } : null
                })
                .ToListAsync();

            return movies;
        }
    }
} 