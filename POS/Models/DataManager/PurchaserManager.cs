using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace POS.Models.DataManager
{
    public class PurchaserManager
    {
        readonly POSContext _posContext;

        public PurchaserManager(POSContext context)
        {
            _posContext = context;
        }

        public IEnumerable<Purchaser> GetAll()
        {
            return _posContext.Purchasers.ToList();
        }

        public Purchaser Get(long id)
        {
            return _posContext.Purchasers
                  .FirstOrDefault(e => e.PurchaserId == id);
        }

        public void Add(Purchaser entity)
        {
            _posContext.Purchasers.Add(entity);
            _posContext.SaveChanges();
        }

        public void Update(Purchaser purchaser, Purchaser entity)
        {
            purchaser = entity;

            _posContext.SaveChanges();
        }

        public void Delete(Purchaser purchaser)
        {
            _posContext.Purchasers.Remove(purchaser);
            _posContext.SaveChanges();
        }
    }
}
