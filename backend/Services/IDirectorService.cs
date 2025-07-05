using backend.DTOs;
using backend.Models;

namespace backend.Services
{
    public interface IDirectorService
    {
        Task<IEnumerable<DirectorDTO>> GetAllDirectorsAsync();
        Task<DirectorDTO?> GetDirectorByIdAsync(int id);
        Task<DirectorDTO> CreateDirectorAsync(CreateDirectorDTO directorDto);
        Task<DirectorDTO?> UpdateDirectorAsync(int id, UpdateDirectorDTO directorDto);
        Task<bool> DeleteDirectorAsync(int id);
    }
} 