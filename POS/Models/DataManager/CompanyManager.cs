using POS.Models.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace POS.Models.DataManager
{
    public class CompanyManager : IDataRepository<Company>
    {
        readonly POSContext _posContext;

        public CompanyManager(POSContext context)
        {
            _posContext = context;
        }

        public IEnumerable<Company> GetAll()
        {
            return _posContext.Companys.ToList();
        }

        public Company Get(long id)
        {
            return _posContext.Companys.FirstOrDefault(e => e.CompanyId == id);
        }

        public void Add(Company entity)
        {
            _posContext.Companys.Add(entity);
            _posContext.SaveChanges();
        }

        public void Update(Company company, Company entity)
        {
            company = entity;

            _posContext.SaveChanges();
        }

        public void Delete(Company company)
        {
            _posContext.Companys.Remove(company);
            _posContext.SaveChanges();
        }
    }
}
