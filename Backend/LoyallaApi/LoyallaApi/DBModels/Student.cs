using System;
using System.ComponentModel.DataAnnotations;

namespace LoyallaApi.DBModels
{
    public class Student
    {
        [Key]
        public int Student_Id { get; set; }
        public string Student_Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public int Age { get; set; }
        public string Address { get; set; }
        public string Field { get; set; }
        public string Current_Status { get; set; }
        public string Current_Year_Of_Medical_School { get; set; }
        public string Current_Year_Of_Medical_Traning {get;set;}
        public int Created_By { get; set; }
        public Nullable<System.DateTime> CreationDateTime { get; set; }
        public int Updated_By { get; set; }
        public Nullable<System.DateTime> UpdateDateTime { get; set; }
    }
}
