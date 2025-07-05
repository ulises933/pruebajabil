using backend.Data;
using backend.DTOs;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class DirectorService : IDirectorService
    {
        private readonly CineContext _context;

        public DirectorService(CineContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<DirectorDTO>> GetAllDirectorsAsync()
        {
            var directors = await _context.Directors
                .Where(d => d.Active)
                .Select(d => new DirectorDTO
                {
                    Id = d.Id,
                    Name = d.Name,
                    Nationality = d.Nationality,
                    Age = d.Age,
                    Active = d.Active
                })
                .ToListAsync();

            return directors;
        }

        public async Task<DirectorDTO?> GetDirectorByIdAsync(int id)
        {
            var director = await _context.Directors
                .Where(d => d.Id == id && d.Active)
                .Select(d => new DirectorDTO
                {
                    Id = d.Id,
                    Name = d.Name,
                    Nationality = d.Nationality,
                    Age = d.Age,
                    Active = d.Active
                })
                .FirstOrDefaultAsync();

            return director;
        }

        public async Task<DirectorDTO> CreateDirectorAsync(CreateDirectorDTO directorDto)
        {
            var director = new Director
            {
                Name = directorDto.Name,
                Nationality = directorDto.Nationality,
                Age = directorDto.Age,
                Active = directorDto.Active
            };

            _context.Directors.Add(director);
            await _context.SaveChangesAsync();

            return new DirectorDTO
            {
                Id = director.Id,
                Name = director.Name,
                Nationality = director.Nationality,
                Age = director.Age,
                Active = director.Active
            };
        }

        public async Task<DirectorDTO?> UpdateDirectorAsync(int id, UpdateDirectorDTO directorDto)
        {
            var director = await _context.Directors.FindAsync(id);
            if (director == null || !director.Active)
                return null;

            if (directorDto.Name != null)
                director.Name = directorDto.Name;
            if (directorDto.Nationality != null)
                director.Nationality = directorDto.Nationality;
            if (directorDto.Age.HasValue)
                director.Age = directorDto.Age;
            if (directorDto.Active.HasValue)
                director.Active = directorDto.Active.Value;

            await _context.SaveChangesAsync();

            return new DirectorDTO
            {
                Id = director.Id,
                Name = director.Name,
                Nationality = director.Nationality,
                Age = director.Age,
                Active = director.Active
            };
        }

        public async Task<bool> DeleteDirectorAsync(int id)
        {
            var director = await _context.Directors.FindAsync(id);
            if (director == null || !director.Active)
                return false;

            director.Active = false;
            await _context.SaveChangesAsync();

            return true;
        }
    }
} 