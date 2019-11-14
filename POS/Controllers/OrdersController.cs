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
    public class OrdersController : ControllerBase
    {
        private readonly POSContext _context;

        public OrdersController(POSContext context)
        {
            _context = context;
        }

        // GET: api/Orders
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
        {
            //List<Order> os = _context.Orders.Include("DeliverBy").Include("Status").ToList();
            var t = _context.Orders.Include("OrderItems").Include("Purchaser").Include("DeliverBy").Include("Status").Include("CreatedBy").Include("ModifiedBy").ToList();
            return await _context.Orders.Include("OrderItems").Include("Purchaser").Include("DeliverBy").Include("Status").Include("CreatedBy").Include("ModifiedBy").ToListAsync();
        }

        // GET: api/Orders/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(int id)
        {
            var order = await _context.Orders.FindAsync(id);

            if (order == null)
            {
                return NotFound();
            }

            return order;
        }

        // PUT: api/Orders/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrder(int id, Order order)
        {
            if (id != order.OrderId)
            {
                return BadRequest();
            }

            _context.Entry(order).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderExists(id))
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

        [HttpPost("UpdateOrder")]
        public async Task<IActionResult> UpdateOrder(Order newOrder)
        {
            var order = _context.Orders.Find(newOrder.OrderId);

            if (order == null)
            {
                return NotFound();
            }

            if (newOrder.DeliverById != null)
            {
                User deliverBy = _context.Users.Find(order.DeliverById);
                order.DeliverBy = deliverBy;
            }

            if (newOrder.PurchaserId != null)
            {
                Purchaser purchaser = _context.Purchasers.Find(newOrder.PurchaserId);
                order.Purchaser = purchaser;
            }

            order.Remark = newOrder.Remark;
            order.DeliverDate = newOrder.DeliverDate;

            Status status = _context.Statuses.Where(o => o.Category == "order" && o.Code == "Pending" && o.Active == true).FirstOrDefault();

            order.Status = status;

            User user = _context.Users.Find(order.CreatedBy_UserId);

            order.ModifiedBy = user;
            order.ModifiedBy_UserId = order.CreatedBy_UserId;
            order.ModifiedDate = DateTime.Now;


            _context.Entry(order).State = EntityState.Modified;

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

        // POST: api/Orders
        [HttpPost]
        public async Task<ActionResult<Order>> PostOrder(Order order)
        {
            if (order.DeliverById != null)
            {
                User deliverBy = _context.Users.Find(order.DeliverById);
                order.DeliverBy = deliverBy;
            }

            if (order.PurchaserId != null)
            {
                Purchaser purchaser = _context.Purchasers.Find(order.PurchaserId);
                order.Purchaser = purchaser;
            }

            Status status = _context.Statuses.Where(o => o.Category == "order" && o.Code == "Pending" && o.Active == true).FirstOrDefault();

            order.Status = status;

            User user = _context.Users.Find(order.CreatedBy_UserId);

            order.Active = true;
            order.OrderDate = DateTime.Now;

            order.CreatedBy = user;
            order.CreatedBy_UserId = order.CreatedBy_UserId;
            order.CreatedDate = DateTime.Now;

            order.ModifiedBy = user;
            order.ModifiedBy_UserId = order.CreatedBy_UserId;
            order.ModifiedDate = DateTime.Now;

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOrder", new { id = order.OrderId }, order);
        }

        // DELETE: api/Orders/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Order>> DeleteOrder(int id)
        {
            var order = await _context.Orders.Include("OrderItems").FirstOrDefaultAsync(o=>o.OrderId == id);
            if (order == null)
            {
                return NotFound();
            }

            if (order.OrderItems != null)
            {
                _context.OrderItems.RemoveRange(order.OrderItems);
            }

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();

            return order;
        }

        private bool OrderExists(int id)
        {
            return _context.Orders.Any(e => e.OrderId == id);
        }
    }
}
