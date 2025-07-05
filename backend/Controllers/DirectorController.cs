using Microsoft.AspNetCore.Mvc;
using backend.DTOs;
using backend.Services;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DirectorController : ControllerBase
    {
        private readonly IDirectorService _directorService;

        public DirectorController(IDirectorService directorService)
        {
            _directorService = directorService;
        }

        /// <summary>
        /// Obtiene todos los directores activos
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DirectorDTO>>> GetDirectors()
        {
            var directors = await _directorService.GetAllDirectorsAsync();
            return Ok(directors);
        }

        /// <summary>
        /// Obtiene un director por su ID
        /// </summary>
        [HttpGet("{id}")]
        public async Task<ActionResult<DirectorDTO>> GetDirector(int id)
        {
            var director = await _directorService.GetDirectorByIdAsync(id);
            if (director == null)
                return NotFound($"Director con ID {id} no encontrado");

            return Ok(director);
        }

        /// <summary>
        /// Crea un nuevo director
        /// </summary>
        [HttpPost]
        public async Task<ActionResult<DirectorDTO>> CreateDirector(CreateDirectorDTO directorDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var director = await _directorService.CreateDirectorAsync(directorDto);
            return CreatedAtAction(nameof(GetDirector), new { id = director.Id }, director);
        }

        /// <summary>
        /// Actualiza un director existente
        /// </summary>
        [HttpPut("{id}")]
        public async Task<ActionResult<DirectorDTO>> UpdateDirector(int id, UpdateDirectorDTO directorDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var director = await _directorService.UpdateDirectorAsync(id, directorDto);
            if (director == null)
                return NotFound($"Director con ID {id} no encontrado");

            return Ok(director);
        }

        /// <summary>
        /// Elimina un director (soft delete)
        /// </summary>
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteDirector(int id)
        {
            var result = await _directorService.DeleteDirectorAsync(id);
            if (!result)
                return NotFound($"Director con ID {id} no encontrado");

            return NoContent();
        }
    }
} 