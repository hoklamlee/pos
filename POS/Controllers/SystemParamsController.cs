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
    public class SystemParamsController : ControllerBase
    {
        private readonly POSContext _context;

        public SystemParamsController(POSContext context)
        {
            _context = context;
        }

        // GET: api/SystemParams
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SystemParam>>> GetSystemParam()
        {
            return await _context.SystemParam.ToListAsync();
        }

        // GET: api/SystemParams/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SystemParam>> GetSystemParam(int id)
        {
            var systemParam = await _context.SystemParam.FindAsync(id);

            if (systemParam == null)
            {
                return NotFound();
            }

            return systemParam;
        }

        // PUT: api/SystemParams/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSystemParam(int id, SystemParam systemParam)
        {
            if (id != systemParam.SystemParamId)
            {
                return BadRequest();
            }

            User modifiedBy = _context.Users.Find(systemParam.ModifiedBy_UserId);
            systemParam.ModifiedBy = modifiedBy;
            systemParam.ModifiedBy_UserId = modifiedBy.UserId;
            systemParam.ModifiedDate = DateTime.Now;

            _context.Entry(systemParam).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SystemParamExists(id))
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

        // POST: api/SystemParams
        [HttpPost]
        public async Task<ActionResult<SystemParam>> PostSystemParam(SystemParam systemParam)
        {
            _context.SystemParam.Add(systemParam);

            User createdBy = _context.Users.Find(systemParam.CreatedBy_UserId);
            systemParam.CreatedBy = createdBy;
            systemParam.CreatedDate = DateTime.Now;

            systemParam.ModifiedBy = createdBy;
            systemParam.ModifiedBy_UserId = createdBy.UserId;
            systemParam.ModifiedDate = DateTime.Now;

            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSystemParam", new { id = systemParam.SystemParamId }, systemParam);
        }

        // DELETE: api/SystemParams/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<SystemParam>> DeleteSystemParam(int id)
        {
            var systemParam = await _context.SystemParam.FindAsync(id);
            if (systemParam == null)
            {
                return NotFound();
            }

            _context.SystemParam.Remove(systemParam);
            await _context.SaveChangesAsync();

            return systemParam;
        }

        private bool SystemParamExists(int id)
        {
            return _context.SystemParam.Any(e => e.SystemParamId == id);
        }
    }
}
