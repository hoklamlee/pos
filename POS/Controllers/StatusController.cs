using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using POS.Models;

namespace POS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatusController : ControllerBase
    {
        private readonly POSContext _context;

        public StatusController(POSContext context)
        {
            _context = context;
        }

        // GET: api/Status
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Status>>> GetStatuses()
        {
            return await _context.Statuses.ToListAsync();
        }

        // GET: api/Status/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Status>> GetStatus(int id)
        {
            var status = await _context.Statuses.FindAsync(id);

            if (status == null)
            {
                return NotFound();
            }

            return status;
        }

        // PUT: api/Status/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStatus(int id, Status status)
        {
            if (id != status.StatusId)
            {
                return BadRequest();
            }

            _context.Entry(status).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StatusExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // PUT: api/Purchasers/5
        [HttpPost("UpdateStatus")]
        public async Task<IActionResult> UpdateStatus(Status newStatus)
        {
            var status = _context.Statuses.Find(newStatus.StatusId);

            if (status == null)
            {
                return NotFound();
            }
            User user = _context.Users.Find(status.ModifiedBy_UserId);

            status.ModifiedDate = DateTime.Now;
            status.ModifiedBy_UserId = newStatus.ModifiedBy_UserId;
            status.ModifiedBy = user;

            status.Code = newStatus.Code;
            status.Description = newStatus.Description;
            status.Category = newStatus.Category;
   
            _context.Entry(status).State = EntityState.Modified;

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


        // POST: api/Status
        [HttpPost]
        public async Task<ActionResult<Status>> PostStatus(Status status)
        {
            _context.Statuses.Add(status);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetStatus", new { id = status.StatusId }, status);
        }

        // DELETE: api/Status/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Status>> DeleteStatus(int id)
        {
            var status = await _context.Statuses.FindAsync(id);
            if (status == null)
            {
                return NotFound();
            }

            _context.Statuses.Remove(status);
            await _context.SaveChangesAsync();

            return status;
        }

        private bool StatusExists(int id)
        {
            return _context.Statuses.Any(e => e.StatusId == id);
        }
    }
}
