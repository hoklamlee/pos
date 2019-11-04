using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using POS.Models;
using POS.Services;

namespace POS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InventoriesController : ControllerBase
    {
        private readonly POSContext _context;

        public InventoriesController(POSContext context)
        {
            _context = context;
        }

        // GET: api/Inventories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Inventory>>> GetInventorys()
        {
            return await _context.Inventorys.ToListAsync();
        }

        // GET: api/Inventories/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Inventory>> GetInventory(int id)
        {
            var inventory = await _context.Inventorys.FindAsync(id);

            if (inventory == null)
            {
                return NotFound();
            }

            return inventory;
        }



        [HttpGet("GetInventoriesByCategory/{category}")]
        public async Task<ActionResult<List<Inventory>>> GetInventoriesByCategory(string category)
        {
            try
            {
                var inventories = await _context.Inventorys.Where(o => category.ToUpper() == "ALL" ? true : o.Category == category && o.Active == true).ToListAsync();

                //if (inventories == null)
                //{
                //    return NotFound();
                //}

                return inventories;
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }


        // PUT: api/Inventories/5
        [HttpPost("UpdateInventory")]
        public async Task<IActionResult> UpdateInventory(Inventory newInventory)
        {
            var inventory = _context.Inventorys.Find(newInventory.InventoryId);

            if(inventory == null)
            {
                return NotFound();
            }

            inventory.ModifiedDate = DateTime.Now;
            inventory.ModifiedBy_UserId = newInventory.ModifiedBy_UserId;

            inventory.Name = newInventory.Name;
            inventory.Description = newInventory.Description;
            inventory.Quatity = newInventory.Quatity;
            inventory.Unit = newInventory.Unit;
            inventory.Price = newInventory.Price;
            inventory.Category = newInventory.Category;

            _context.Entry(inventory).State = EntityState.Modified;

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


        // POST: api/Inventories
        [HttpPost]
        public async Task<ActionResult<Inventory>> PostInventory(Inventory inventory)
        {
            try
            {
                User user = _context.Users.Find(inventory.CreatedBy_UserId);

                inventory.CreatedBy = user;
                inventory.ModifiedBy = user;
                inventory.ModifiedBy_UserId = user.UserId;

                inventory.CreatedDate = DateTime.Now;
                inventory.ModifiedDate = DateTime.Now;

                _context.Inventorys.Add(inventory);
                await _context.SaveChangesAsync();


                return CreatedAtAction("GetInventory", new { id = inventory.InventoryId }, inventory);
                //return Ok(/*inventory*/);
            }
            catch(Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }



        }



        // DELETE: api/Inventories/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Inventory>> DeleteInventory(int id)
        {
            var inventory = await _context.Inventorys.FindAsync(id);
            if (inventory == null)
            {
                return NotFound();
            }

            _context.Inventorys.Remove(inventory);
            await _context.SaveChangesAsync();

            return inventory;
        }

        private bool InventoryExists(int id)
        {
            return _context.Inventorys.Any(e => e.InventoryId == id);
        }
    }
}
