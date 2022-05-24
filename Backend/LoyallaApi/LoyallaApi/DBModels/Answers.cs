using System;
using System.ComponentModel.DataAnnotations;

namespace LoyallaApi.DBModels
{
    public class Answers
    {
        [Key]
        public int Answer_Id { get; set; }
        public int Question_Id { get; set; }
        public string Answer { get; set; }
        public int Created_By { get; set; }
        public Nullable<System.DateTime> CreationDateTime { get; set; }
        public int Updated_By { get; set; }
        public Nullable<System.DateTime> UpdateDateTime { get; set; }
        //public virtual Questions Questions { get; set; }    
    }
}
