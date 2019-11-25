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

        [HttpGet("/api/[controller]/[action]/{id}")]
        public async Task<ActionResult<IEnumerable<Order>>> GetFavouriteOrders(int id)
        {
            //List<Order> os = _context.Orders.Include("DeliverBy").Include("Status").ToList();

            List<FavouriteOrder> favouriteOrders = _context.FavouriteOrders.Where(o=>o.UserId == id).ToList();

            return await _context.Orders.Where(o=> favouriteOrders.Select(f=>f.OrderId).Contains(o.OrderId)).Include("OrderItems").Include("Purchaser").Include("DeliverBy").Include("Status").Include("CreatedBy").Include("ModifiedBy").ToListAsync();
        }


        // GET: api/Orders/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(int id)
        {
            var order = await _context.Orders.Where(o=>o.OrderId == id).Include("OrderItems").Include("Purchaser").FirstOrDefaultAsync();

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

        [HttpPost("/api/[controller]/[action]")]
        public async Task<ActionResult<Order>> Duplicate(Order order)
        {
            try
            {
                if (order.OrderId == 0)
                {
                    return NotFound();
                }

                Models.Order targetOrder = _context.Orders.Include("Purchaser").Include("DeliverBy").Include("Status").Include("OrderItems").FirstOrDefault(o => o.OrderId == order.OrderId);

                if (targetOrder == null)
                {
                    return NotFound();
                }

                Order newOrder = new Order();

                newOrder.DeliverBy = targetOrder.DeliverBy;
                newOrder.DeliverById = targetOrder.DeliverById;

                newOrder.DeliverDate = targetOrder.DeliverDate;

                newOrder.Purchaser = targetOrder.Purchaser;
                newOrder.PurchaserId = targetOrder.PurchaserId;

                newOrder.Status = targetOrder.Status;
                newOrder.StatusId = targetOrder.StatusId;
                newOrder.Remark = targetOrder.Remark;

                newOrder.Active = true;
                newOrder.OrderDate = order.OrderDate;

                User user = _context.Users.Find(order.CreatedBy_UserId);

                newOrder.CreatedBy = user;
                newOrder.CreatedBy_UserId = order.CreatedBy_UserId;
                newOrder.CreatedDate = DateTime.Now;

                newOrder.ModifiedBy = user;
                newOrder.ModifiedBy_UserId = order.CreatedBy_UserId;
                newOrder.ModifiedDate = DateTime.Now;


                _context.Orders.Add(newOrder);
                await _context.SaveChangesAsync();

                foreach(var item in targetOrder.OrderItems)
                {
                    OrderItem orderItem = new OrderItem();
                    orderItem.Active = true;
                    orderItem.CreatedBy = user;
                    orderItem.CreatedBy_UserId = user.UserId;
                    orderItem.CreatedDate = DateTime.Now;
                    orderItem.Inventory = item.Inventory;
                    orderItem.InventoryId = item.InventoryId;
                    orderItem.ModifiedBy = user;
                    orderItem.ModifiedBy_UserId = user.UserId;
                    orderItem.ModifiedDate = DateTime.Now;
                    orderItem.Order = newOrder;
                    orderItem.OrderId = newOrder.OrderId;
                    orderItem.Price = item.Price;
                    orderItem.Quatity = item.Quatity;
                    orderItem.Remark = item.Remark;

                    _context.OrderItems.Add(orderItem);
                }

                await _context.SaveChangesAsync();

                return CreatedAtAction("GetOrder", new { id = newOrder.OrderId }, newOrder);
            }
            catch(Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }

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
