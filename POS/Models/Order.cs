using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel;

namespace POS.Models
{
    public class Order
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int OrderId { get; set; }
        public DateTime? OrderDate { get; set; }
        public string Remark { get; set; }
        public int? DeliverById { get; set; }
        public User DeliverBy { get; set; }
        public DateTime? DeliverDate { get; set; }
        public int? StatusId { get; set; }
        public Status Status { get; set; }

        //public ICollection<OrderItem> OrderItems { get; set; }

        public int? PurchaserId { get; set; }
        public Purchaser Purchaser { get; set; }



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
