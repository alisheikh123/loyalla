using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace LoyallaApi.DBModels
{
    public class Questions
    {
        [Key]
        public int Question_Id { get; set; }
        public string Question { get; set; }
        public int Created_By { get; set; }
        public Nullable<System.DateTime> CreationDateTime { get; set; }
        public int Updated_By { get; set; }
        public Nullable<System.DateTime> UpdateDateTime { get; set; }
        public ICollection<Answers> Answer { get; set; }
    }
}
