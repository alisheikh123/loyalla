using System;
using System.ComponentModel.DataAnnotations;

namespace LoyallaApi.DBModels
{
    public class Feedback
    {
        [Key]
        public int Feedback_Id { get; set; }
        public int Case_Id { get; set; }
        public int Student_Id { get; set; }
        public string Feedbacks { get; set; }
        public int Created_By { get; set; }
        public Nullable<System.DateTime> CreationDateTime { get; set; }
        public int Updated_By { get; set; }
        public Nullable<System.DateTime> UpdateDateTime { get; set; }
    }
}
