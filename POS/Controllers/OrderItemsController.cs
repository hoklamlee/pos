﻿using System;
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
    public class OrderItemsController : ControllerBase
    {
        private readonly POSContext _context;

        public OrderItemsController(POSContext context)
        {
            _context = context;
        }

        // GET: api/OrderItems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderItem>>> GetOrderItems()
        {
            return await _context.OrderItems.ToListAsync();
        }

        // GET: api/OrderItems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<OrderItem>> GetOrderItem(int id)
        {
            var orderItem = await _context.OrderItems.FindAsync(id);

            if (orderItem == null)
            {
                return NotFound();
            }

            return orderItem;
        }

        [HttpGet("/api/[controller]/[action]/{id}")]
        public async Task<ActionResult<IEnumerable<OrderItem>>> GetOrderItemsByOrderId(int id)
        {
           return await _context.OrderItems.Where(o=>o.OrderId.Value == id).Include("Inventory").ToListAsync();

        }


        // PUT: api/OrderItems/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrderItem(int id, OrderItem orderItem)
        {
            if (id != orderItem.OrderItemId)
            {
                return BadRequest();
            }

            _context.Entry(orderItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderItemExists(id))
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


        [HttpPost("UpdateOrderItem")]
        public async Task<IActionResult> UpdateOrderItem(OrderItem newOrderItem)
        {
            var orderItem = _context.OrderItems.Find(newOrderItem.OrderItemId);

            if (orderItem == null)
            {
                return NotFound();
            }

            if (newOrderItem.OrderId != null)
            {
                Order order = _context.Orders.Find(newOrderItem.OrderId);
                orderItem.Order = order;
            }

            if (newOrderItem.InventoryId != null)
            {
                Inventory inventory = _context.Inventorys.Find(newOrderItem.InventoryId);
                orderItem.Inventory = inventory;
                orderItem.Price = inventory.Price;

            }

            orderItem.Quatity = newOrderItem.Quatity;
            orderItem.Remark = newOrderItem.Remark;


            User user = _context.Users.Find(orderItem.CreatedBy_UserId);

            orderItem.ModifiedBy = user;
            orderItem.ModifiedBy_UserId = orderItem.CreatedBy_UserId;
            orderItem.ModifiedDate = DateTime.Now;


            _context.Entry(orderItem).State = EntityState.Modified;

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

        // POST: api/OrderItems
        [HttpPost]
        public async Task<ActionResult<OrderItem>> PostOrderItem(OrderItem orderItem)
        {


            if (orderItem.OrderId != null)
            {
                Order order = _context.Orders.Find(orderItem.OrderId);
                orderItem.Order = order;
            }

            if (orderItem.InventoryId != null)
            {
                Inventory inventory = _context.Inventorys.Find(orderItem.InventoryId);
                orderItem.Inventory = inventory;
                orderItem.Price = inventory.Price;

            }

            User user = _context.Users.Find(orderItem.CreatedBy_UserId);

            orderItem.CreatedBy = user;
            orderItem.CreatedBy_UserId = orderItem.CreatedBy_UserId;
            orderItem.CreatedDate = DateTime.Now;


            orderItem.ModifiedBy = user;
            orderItem.ModifiedBy_UserId = orderItem.CreatedBy_UserId;
            orderItem.ModifiedDate = DateTime.Now;

            _context.OrderItems.Add(orderItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOrderItem", new { id = orderItem.OrderItemId }, orderItem);
        }

        // DELETE: api/OrderItems/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<OrderItem>> DeleteOrderItem(int id)
        {
            var orderItem = await _context.OrderItems.FindAsync(id);
            if (orderItem == null)
            {
                return NotFound();
            }

            _context.OrderItems.Remove(orderItem);
            await _context.SaveChangesAsync();

            return orderItem;
        }

        private bool OrderItemExists(int id)
        {
            return _context.OrderItems.Any(e => e.OrderItemId == id);
        }
    }
}
