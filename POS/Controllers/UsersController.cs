using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using POS.Models;
using POS.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace POS.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private IUserService _userService;
        private readonly POSContext _context;

        public UsersController(IUserService userService, POSContext context)
        {
            _userService = userService;
            _context = context;
        }

        //public UsersController(POSContext context)
        //{
        //    _context = context;
        //}

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody]User userParam)
        {
            var user = _userService.Authenticate(userParam.Username, userParam.Password);

            if (user == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            return Ok(user);
        }

        [HttpPost("updateuserinfo")]
        public IActionResult UpdateUserInfo([FromBody]User userParam) //data = {userId,firstName, lastName, email}
        {
            User user = new User();

            try
            {
                user = _userService.GetUserById(userParam.UserId);

                if(user == null)
                {
                    throw new Exception("User is not found.");
                }

                user.FirstName = userParam.FirstName;
                user.LastName = userParam.LastName;
                user.Username = userParam.Username;
                user.Email = userParam.Email;

                if (IsBasicInfoCorrect(user) == false)
                {
                    throw new Exception("All user information must be filled in.");
                }

                _userService.UpdateUserInfo(user);

                user = _userService.Authenticate(user.Username, user.Password);


            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }

            return Ok(user);
        }

        [HttpPost("updateuserpassword")]
        public IActionResult UpdateUserPassword([FromBody]Request_UpdateUserPassword request)
        {
            User user = new User();

            try
            {
                user = _userService.GetUserById(request.userId);

                if (!IsPasswordCorrect(request.password, request.passwordConfirm))
                {
                    throw new Exception("Password is not same.");
                }

                user.Password = request.password;
                
                _userService.UpdateUserInfo(user);
                
                user = _userService.Authenticate(user.Username, user.Password);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }

            return Ok(user);
        }


        [HttpGet("/api/[controller]/[action]")]
        public IActionResult GetAll()
        {
            try
            {
            var users = _userService.GetAll();
            return Ok(users);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }

        }


        // GET: api/Status/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // PUT: api/Purchasers/5
        [HttpPost("UpdateUser")]
        public async Task<IActionResult> UpdateUser(User newUser)
        {
            var user = _context.Users.Find(newUser.UserId);

            if (user == null)
            {
                return NotFound();
            }

            user.DisplayName = newUser.DisplayName;
            user.FirstName = newUser.FirstName;
            user.LastName = newUser.LastName;
            user.Email = newUser.Email;
            user.Password = newUser.Password;

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }

            return NoContent();
        }


        // POST: api/User
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = user.UserId }, user);
        }

        // DELETE: api/User/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<User>> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return user;
        }

        private bool IsBasicInfoCorrect(User user)
        {
            bool isCorrect = true;

            if (user == null)
                isCorrect = false;

            if (string.IsNullOrEmpty(user.Email))
                isCorrect = false;

            if (string.IsNullOrEmpty(user.FirstName))
                isCorrect = false;

            if (string.IsNullOrEmpty(user.LastName))
                isCorrect = false;

            if (string.IsNullOrEmpty(user.Username))
                isCorrect = false;

            return isCorrect;
        }

        private bool IsPasswordCorrect(string password, string passwordConfirm)
        {
            bool isCorrect = true;

            if (password != passwordConfirm || string.IsNullOrEmpty(password))
            {
                isCorrect = false;
            }

            return isCorrect;
        }

    }

    public class Request_UpdateUserPassword
    {
        public int userId { get; set; }
        public string password { get; set; }
        public string passwordConfirm { get; set; }
    }
}
