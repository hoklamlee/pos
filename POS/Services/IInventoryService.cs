using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using POS.Helpers;
using POS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace POS.Services
{
    public interface IInventoryService
    {
    }

    public class InventoryService : IInventoryService
    {
        DbContextOptionsBuilder optionsBuilder = new DbContextOptionsBuilder<POSContext>();
        private readonly POSContext _context;
        private readonly Settings _settings;


        public InventoryService(IOptions<Settings> settings)
        {
            optionsBuilder.UseSqlServer(settings.Value.ConnectionString.DefaultConnection);

            _context = new POSContext(optionsBuilder.Options);

            _settings = settings.Value;
        }

        public async Task<List<Inventory>> GetInventoriesByCategory(string category)
        {
            List<Inventory> inventories = await _context.Inventorys.Where(o => o.Category == category && o.Active == true).ToListAsync();

            return inventories;
        }



    }
}
