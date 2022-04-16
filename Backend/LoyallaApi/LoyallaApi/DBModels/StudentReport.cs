using System;

namespace LoyallaApi.DBModels
{
    public class StudentReport
    {
        public int StudentReport_Id { get; set; }
        public int Student_Id { get; set; }
        public int Case_Id { get; set; }
        public int Question_Id { get; set; }
        public int Answer_Id { get; set; }
        public int Created_By { get; set; }
        public Nullable<System.DateTime> CreationDateTime { get; set; }
        public int Updated_By { get; set; }
        public Nullable<System.DateTime> UpdateDateTime { get; set; }

    }
}
