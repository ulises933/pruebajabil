using backend.DTOs;
using backend.Models;

namespace backend.Services
{
    public interface IMovieService
    {
        Task<IEnumerable<MovieDTO>> GetAllMoviesAsync();
        Task<MovieDTO?> GetMovieByIdAsync(int id);
        Task<MovieDTO> CreateMovieAsync(CreateMovieDTO movieDto);
        Task<MovieDTO?> UpdateMovieAsync(int id, UpdateMovieDTO movieDto);
        Task<bool> DeleteMovieAsync(int id);
        Task<IEnumerable<MovieDTO>> GetMoviesByDirectorAsync(int directorId);
    }
} 