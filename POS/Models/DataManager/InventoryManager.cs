using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace POS.Models.DataManager
{
    public class InventoryManager
    {
        readonly POSContext _posContext;

        public InventoryManager(POSContext context)
        {
            _posContext = context;
        }

        public IEnumerable<Inventory> GetAll()
        {
            return _posContext.Inventorys.ToList();
        }

        public Inventory Get(long id)
        {
            return _posContext.Inventorys
                  .FirstOrDefault(e => e.InventoryId == id);
        }

        public void Add(Inventory entity)
        {
            _posContext.Inventorys.Add(entity);
            _posContext.SaveChanges();
        }

        public void Update(Inventory inventory, Inventory entity)
        {
            inventory = entity;

            _posContext.SaveChanges();
        }

        public void Delete(Inventory inventory)
        {
            _posContext.Inventorys.Remove(inventory);
            _posContext.SaveChanges();
        }
    }
}
