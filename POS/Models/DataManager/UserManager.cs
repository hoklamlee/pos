using POS.Models.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace POS.Models.DataManager
{
    public class UserManager : IDataRepository<User>
    {
        readonly POSContext _posContext;

        public UserManager(POSContext context)
        {
            _posContext = context;
        }

        public IEnumerable<User> GetAll()
        {
            return _posContext.Users.ToList();
        }

        public User Get(long id)
        {
            return _posContext.Users
                  .FirstOrDefault(e => e.UserId == id);
        }

        public void Add(User entity)
        {
            _posContext.Users.Add(entity);
            _posContext.SaveChanges();
        }

        public void Update(User user, User entity)
        {
            user = entity;

            _posContext.SaveChanges();
        }

        public void Delete(User user)
        {
            _posContext.Users.Remove(user);
            _posContext.SaveChanges();
        }
    }
}
