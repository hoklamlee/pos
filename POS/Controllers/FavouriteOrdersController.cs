using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using POS.Models;

namespace POS.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class FavouriteOrdersController : ControllerBase
    {
        private readonly POSContext _context;

        public FavouriteOrdersController(POSContext context)
        {
            _context = context;
        }

        // GET: api/FavouriteOrders
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FavouriteOrder>>> GetFavouriteOrders()
        {
            return await _context.FavouriteOrders.ToListAsync();
        }

        [HttpGet("/api/[controller]/[action]/{id}")]
        public async Task<ActionResult<IEnumerable<FavouriteOrder>>> GetFavouriteOrdersByUserId(int id)
        {
            return await _context.FavouriteOrders.Where(o=>o.UserId == id).Include("Order").ToListAsync();
        }

        [HttpPost("/api/[controller]/[action]")]
        public async Task<ActionResult<FavouriteOrder>> getFavouriteOrderByOrderIdAndUserId(FavouriteOrder favouriteOrder)
        {
            return await _context.FavouriteOrders.Where(o => o.OrderId == favouriteOrder.OrderId && o.UserId == favouriteOrder.UserId).Include("Order").FirstOrDefaultAsync();
        }


        // GET: api/FavouriteOrders/5
        [HttpGet("{id}")]
        public async Task<ActionResult<FavouriteOrder>> GetFavouriteOrder(int id)
        {
            var favouriteOrder = await _context.FavouriteOrders.FindAsync(id);

            if (favouriteOrder == null)
            {
                return NotFound();
            }

            return favouriteOrder;
        }

        // PUT: api/FavouriteOrders/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFavouriteOrder(int id, FavouriteOrder favouriteOrder)
        {
            if (id != favouriteOrder.FavouriteOrderId)
            {
                return BadRequest();
            }

            _context.Entry(favouriteOrder).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FavouriteOrderExists(id))
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

        // POST: api/FavouriteOrders
        [HttpPost]
        public async Task<ActionResult<FavouriteOrder>> PostFavouriteOrder(FavouriteOrder favouriteOrder)
        {
            _context.FavouriteOrders.Add(favouriteOrder);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFavouriteOrder", new { id = favouriteOrder.FavouriteOrderId }, favouriteOrder);
        }

        // DELETE: api/FavouriteOrders/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<FavouriteOrder>> DeleteFavouriteOrder(int id)
        {
            var favouriteOrder = await _context.FavouriteOrders.FindAsync(id);
            if (favouriteOrder == null)
            {
                return NotFound();
            }

            _context.FavouriteOrders.Remove(favouriteOrder);
            await _context.SaveChangesAsync();

            return favouriteOrder;
        }

        private bool FavouriteOrderExists(int id)
        {
            return _context.FavouriteOrders.Any(e => e.FavouriteOrderId == id);
        }
    }
}
