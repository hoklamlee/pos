using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel;

namespace POS.Models
{
    public class OrderItem
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int OrderItemId { get; set; }

        public int? OrderId { get; set; }
        public Order Order{ get; set; }

        public int? InventoryId { get; set; }
        public Inventory Inventory { get; set; }

        public long Price { get; set; }
        public long Quatity { get; set; }
        public string Remark { get; set; }


        [DefaultValue(true)]
        public bool Active { get; set; }
        public User CreatedBy { get; set; }
        public int? CreatedBy_UserId { get; set; }
        public DateTime CreatedDate { get; set; }
        public User ModifiedBy { get; set; }
        public int? ModifiedBy_UserId { get; set; }
        public DateTime ModifiedDate { get; set; }


    }
}
