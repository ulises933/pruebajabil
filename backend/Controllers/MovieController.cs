using Microsoft.AspNetCore.Mvc;
using backend.DTOs;
using backend.Services;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MovieController : ControllerBase
    {
        private readonly IMovieService _movieService;

        public MovieController(IMovieService movieService)
        {
            _movieService = movieService;
        }

        /// <summary>
        /// Obtiene todas las películas
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MovieDTO>>> GetMovies()
        {
            var movies = await _movieService.GetAllMoviesAsync();
            return Ok(movies);
        }

        /// <summary>
        /// Obtiene una película por su ID
        /// </summary>
        [HttpGet("{id}")]
        public async Task<ActionResult<MovieDTO>> GetMovie(int id)
        {
            var movie = await _movieService.GetMovieByIdAsync(id);
            if (movie == null)
                return NotFound($"Película con ID {id} no encontrada");

            return Ok(movie);
        }

        /// <summary>
        /// Obtiene todas las películas de un director específico
        /// </summary>
        [HttpGet("director/{directorId}")]
        public async Task<ActionResult<IEnumerable<MovieDTO>>> GetMoviesByDirector(int directorId)
        {
            var movies = await _movieService.GetMoviesByDirectorAsync(directorId);
            return Ok(movies);
        }

        /// <summary>
        /// Crea una nueva película
        /// </summary>
        [HttpPost]
        public async Task<ActionResult<MovieDTO>> CreateMovie(CreateMovieDTO movieDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var movie = await _movieService.CreateMovieAsync(movieDto);
            return CreatedAtAction(nameof(GetMovie), new { id = movie.Id }, movie);
        }

        /// <summary>
        /// Actualiza una película existente
        /// </summary>
        [HttpPut("{id}")]
        public async Task<ActionResult<MovieDTO>> UpdateMovie(int id, UpdateMovieDTO movieDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var movie = await _movieService.UpdateMovieAsync(id, movieDto);
            if (movie == null)
                return NotFound($"Película con ID {id} no encontrada");

            return Ok(movie);
        }

        /// <summary>
        /// Elimina una película
        /// </summary>
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteMovie(int id)
        {
            var result = await _movieService.DeleteMovieAsync(id);
            if (!result)
                return NotFound($"Película con ID {id} no encontrada");

            return NoContent();
        }
    }
} 