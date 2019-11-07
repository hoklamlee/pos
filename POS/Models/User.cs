using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel;

namespace POS.Models
{
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string DisplayName { get; set; }
        public string Token { get; set; }

        [DefaultValue(true)]
        public bool Active { get; set; }
        public DateTime? TokenCreatedDate { get; set; }

        //public ICollection<Order> DeliverOrders { get; set; }

        //public ICollection<Order> FavouriteOrder { get; set; }

        //public ICollection<Inventory> CreatedInventories { get; set; }
        //public ICollection<Inventory> ModifiedInventories { get; set; }




    }
}
