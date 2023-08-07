using Cultivation.Models;
using Cultivation.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace Cultivation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CultMemberController : ControllerBase
    {
        private readonly ICultMemberRepository _cultMemberRepository;

        public CultMemberController(ICultMemberRepository cultMemberRepository)
        {
            _cultMemberRepository = cultMemberRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_cultMemberRepository.GetAll());
        }

        [HttpGet("byuser/{userId}")]
        public IActionResult GetCultMembersByUserId(int userId)
        {
            List<CultMember> cultMembers = _cultMemberRepository.GetCultMembersByUserId(userId);
            return Ok(cultMembers);
        }

        [HttpGet("bycult/{cultId}")]
        public IActionResult GetCultMembersByCultId(int cultId)
        {
            List<CultMember> cultMembers = _cultMemberRepository.GetCultMembersByCultId(cultId);
            return Ok(cultMembers);
        }

        [HttpPost]
        public IActionResult PostCultMember(CultMember cultMember)
        {
            _cultMemberRepository.AddCultMember(cultMember);
            return CreatedAtAction("GetCultMember", new { id = cultMember.Id }, cultMember);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteCultMember(int id)
        {
            _cultMemberRepository.RemoveCultMember(id);
            return NoContent();
        }
    }
}
