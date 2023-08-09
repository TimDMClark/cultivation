using Cultivation.Models;
using Cultivation.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace Cultivation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;

        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpGet]
        public IActionResult GetUsers()
        {
            List<User> users = _userRepository.GetAllUsers();
            return Ok(users);
        }

        [HttpGet("GetByEmail")]
        public IActionResult GetByEmail(string email)
        {
            var user = _userRepository.GetByEmail(email);

            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }


        [HttpGet("{id}")]
        public IActionResult GetUser(int id)
        {
            var user = _userRepository.GetUserById(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpPost]
        public IActionResult CreateUser(User user)
        {
            // Handle any necessary data processing, validation, or hashing here

            _userRepository.AddUser(user);
            return CreatedAtAction("GetUser", new { id = user.Id }, user);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateUser(int id, User user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            // Handle any necessary data processing, validation, or hashing here

            _userRepository.UpdateUser(user);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteUser(int id)
        {
            _userRepository.DeleteUser(id);
            return NoContent();
        }

        [HttpGet("{id}/profile-picture")]
        public IActionResult GetProfilePicture(int id)
        {
            byte[] profilePicture = _userRepository.GetProfilePicture(id);

            if (profilePicture == null)
            {
                return NotFound();
            }

            return File(profilePicture, "image/jpeg"); // Assuming the image type is JPEG. Adjust the MIME type if necessary.
        }

    }
}
