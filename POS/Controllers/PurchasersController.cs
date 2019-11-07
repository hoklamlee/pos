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
    public class PurchasersController : ControllerBase
    {
        private readonly POSContext _context;

        public PurchasersController(POSContext context)
        {
            _context = context;
        }

        // GET: api/Purchasers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Purchaser>>> GetPurchasers()
        {
            return await _context.Purchasers.ToListAsync();
        }

        // GET: api/Purchasers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Purchaser>> GetPurchaser(int id)
        {
            var purchaser = await _context.Purchasers.FindAsync(id);

            if (purchaser == null)
            {
                return NotFound();
            }

            return purchaser;
        }

        // PUT: api/Purchasers/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPurchaser(int id, Purchaser purchaser)
        {
            if (id != purchaser.PurchaserId)
            {
                return BadRequest();
            }

            _context.Entry(purchaser).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PurchaserExists(id))
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
        [HttpPost("UpdatePurchaser")]
        public async Task<IActionResult> UpdatePurchaser(Purchaser newPurchaser)
        {
            var purchaser = _context.Purchasers.Find(newPurchaser.PurchaserId);

            if (purchaser == null)
            {
                return NotFound();
            }
            User user = _context.Users.Find(purchaser.ModifiedBy_UserId);

            purchaser.ModifiedDate = DateTime.Now;
            purchaser.ModifiedBy_UserId = newPurchaser.ModifiedBy_UserId;
            purchaser.ModifiedBy = user;

            purchaser.Name = newPurchaser.Name;
            purchaser.ContactPerson = newPurchaser.ContactPerson;
            purchaser.Latitude = newPurchaser.Latitude;
            purchaser.Location = newPurchaser.Location;
            purchaser.Longitude = newPurchaser.Longitude;
            purchaser.PhoneNo = newPurchaser.PhoneNo;

            _context.Entry(purchaser).State = EntityState.Modified;

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

        // POST: api/Purchasers
        [HttpPost]
        public async Task<ActionResult<Purchaser>> PostPurchaser(Purchaser purchaser)
        {
            try
            {
                User user = _context.Users.Find(purchaser.CreatedBy_UserId);

                purchaser.CreatedBy = user;
                purchaser.ModifiedBy = user;
                purchaser.ModifiedBy_UserId = user.UserId;

                purchaser.CreatedDate = DateTime.Now;
                purchaser.ModifiedDate = DateTime.Now;

                _context.Purchasers.Add(purchaser);

                await _context.SaveChangesAsync();

                return CreatedAtAction("GetPurchaser", new { id = purchaser.PurchaserId }, purchaser);
            }
            catch(Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        // DELETE: api/Purchasers/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Purchaser>> DeletePurchaser(int id)
        {
            var purchaser = await _context.Purchasers.FindAsync(id);
            if (purchaser == null)
            {
                return NotFound();
            }

            _context.Purchasers.Remove(purchaser);
            await _context.SaveChangesAsync();

            return purchaser;
        }

        private bool PurchaserExists(int id)
        {
            return _context.Purchasers.Any(e => e.PurchaserId == id);
        }
    }
}
