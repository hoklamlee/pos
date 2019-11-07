using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel;

namespace POS.Models
{
    public class Inventory
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int InventoryId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public long Quatity { get; set; }
        public string Unit { get; set; }
        public long Price { get; set; }

        public string Category { get; set; }

        [DefaultValue(true)]
        public bool Active { get; set; }
        public User CreatedBy { get; set; }
        public int? CreatedBy_UserId { get; set; }
        public DateTime CreatedDate { get; set; }
        public User ModifiedBy { get; set; }
        public int? ModifiedBy_UserId { get; set; }
        public DateTime ModifiedDate { get; set; }

        public Inventory()
        {
            Active = true;
        }
    }
}
