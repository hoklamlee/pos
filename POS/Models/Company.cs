using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace POS.Models
{
    public class Company
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CompanyId { get; set; }
        public string DisplayName_Chi { get; set; }
        public string DisplayName_Eng { get; set; }
        public string PhoneNo { get; set; }
        public long Longitude { get; set; }
        public string Location { get; set; }
        public string ContactPerson { get; set; }
        public ICollection<User> Users { get; set; }


    }

}
