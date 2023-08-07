using Cultivation.Models;
using Cultivation.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace Cultivation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RelationshipStatusController : ControllerBase
    {
        private readonly IRelationshipStatusRepository _relationshipStatusRepository;

        public RelationshipStatusController(IRelationshipStatusRepository relationshipStatusRepository)
        {
            _relationshipStatusRepository = relationshipStatusRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            List<RelationshipStatus> statuses = _relationshipStatusRepository.GetAll();
            return Ok(statuses);
        }
    }
}
