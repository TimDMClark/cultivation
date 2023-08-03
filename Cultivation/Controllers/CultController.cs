using Cultivation.Models;
using Cultivation.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Cultivation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CultController : ControllerBase
    {
        private readonly ICultRepository _cultRepository;
        public CultController(ICultRepository cultRepository)
        {
            _cultRepository = cultRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_cultRepository.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var cult = _cultRepository.GetById(id);
            if (cult == null)
            {
                return NotFound();
            }
            return Ok(cult);
        }

        [HttpPost]
        public IActionResult Cult(Cult cult)
        {
            _cultRepository.Add(cult);
            return CreatedAtAction("Get", new { id = cult.Id }, cult);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Cult cult)
        {
            if (id != cult.Id)
            {
                return BadRequest();
            }

            _cultRepository.Update(cult);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _cultRepository.Delete(id);
            return NoContent();
        }
    }
}
