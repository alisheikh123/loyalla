using System;
using System.ComponentModel.DataAnnotations;

namespace LoyallaApi.DBModels
{
    public class StudentCaseAttemptStatus
    {
        [Key]
        public int StudentCaseAttemptStatus_Id { get; set; }
        public int Case_Id { get; set; }
        public int Student_Id {get;set; }
        public string Status { get; set; }
        public int Created_By { get; set; }
        public Nullable<System.DateTime> CreationDateTime { get; set; }
        public int Updated_By { get; set; }
        public Nullable<System.DateTime> UpdateDateTime { get; set; }
    }
}
