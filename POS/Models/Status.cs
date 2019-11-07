using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel;

namespace POS.Models
{
    public class Status
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int StatusId { get; set; }
        public string Category { get; set; }
        public string Code { get; set; }
        public string Description { get; set; }

        [DefaultValue(true)]
        public bool Active { get; set; }
        public User CreatedBy { get; set; }
        public int? CreatedBy_UserId { get; set; }
        public DateTime CreatedDate { get; set; }
        public User ModifiedBy { get; set; }
        public int? ModifiedBy_UserId { get; set; }
        public DateTime ModifiedDate { get; set; }

        public Status()
        {
            Active = true;
        }
    }
}
